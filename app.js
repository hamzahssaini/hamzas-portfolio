// app.js — DORA Metrics server (GitHub-backed)
const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch'); // npm i node-fetch@2
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// --- GitHub config ---
const OWNER = process.env.OWNER || 'hamzahssaini';
const REPO = process.env.REPO || 'dora-metrics';
const BRANCH = process.env.BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DEPLOY_WORKFLOW_ID = process.env.DEPLOY_WORKFLOW_ID || ''; // optional
const WINDOW_DAYS = Number(process.env.WINDOW_DAYS || 60);

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory "database" for users and deployments
const users = [];
const deployments = [];

// Home: redirect to dashboard
app.get('/', (req, res) => {
  res.redirect('/dashboard.html');
});

// Register route (stores users in memory)
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  users.push({ id: users.length + 1, name, email });
  res.redirect('/');
});

// API route to get users (from memory)
app.get('/api/users', (req, res) => res.json(users));

// Health check
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// Deployments endpoints (in-memory)
app.post('/api/deployments', (req, res) => {
  const { repo, commit, deployedAt } = req.body;
  if (!repo || !commit || !deployedAt) {
    return res.status(400).json({ error: 'repo, commit and deployedAt are required' });
  }
  const deployment = { id: deployments.length + 1, repo, commit, deployedAt: new Date(deployedAt) };
  deployments.push(deployment);
  res.status(201).json(deployment);
});
app.get('/api/deployments', (req, res) => {
  const sorted = [...deployments].sort((a, b) => b.deployedAt - a.deployedAt);
  res.json(sorted);
});
app.get('/api/metrics', (req, res) => {
  if (deployments.length === 0) return res.json({ totalDeployments: 0, deploymentFrequencyPerDay: 0 });
  const sorted = [...deployments].sort((a, b) => a.deployedAt - b.deployedAt);
  const totalDeployments = sorted.length;
  const first = sorted[0].deployedAt;
  const last = sorted[sorted.length - 1].deployedAt;
  const msDiff = last.getTime() - first.getTime() || 1;
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);
  const deploymentFrequencyPerDay = daysDiff === 0 ? totalDeployments : totalDeployments / daysDiff;
  res.json({ totalDeployments, firstDeploymentAt: first, lastDeploymentAt: last, deploymentFrequencyPerDay: Number(deploymentFrequencyPerDay.toFixed(2)) });
});

// ----------------------
// GitHub API helpers
// ----------------------
async function gh(path, params = {}) {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required for GitHub-backed metrics');
  const url = new URL(`https://api.github.com${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'User-Agent': 'dora-metrics-app',
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return res.json();
}

// Get a single page of completed workflow runs (per_page up to 100)
async function getWorkflowRunsPage(per_page = 100) {
  return gh(`/repos/${OWNER}/${REPO}/actions/runs`, {
    status: 'completed',
    per_page,
    branch: BRANCH,
    ...(DEPLOY_WORKFLOW_ID ? { workflow_id: DEPLOY_WORKFLOW_ID } : {}),
  });
}

async function getCommits(sinceIso, untilIso) {
  return gh(`/repos/${OWNER}/${REPO}/commits`, {
    sha: BRANCH,
    per_page: 100,
    since: sinceIso,
    until: untilIso,
  });
}

function groupByDay(items, getDate) {
  return items.reduce((m, item) => {
    const day = getDate(item).slice(0, 10);
    if (!m[day]) m[day] = [];
    m[day].push(item);
    return m;
  }, {});
}

function percentile(arr, p) {
  if (!arr || !arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (s.length - 1);
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  if (lo === hi) return s[lo];
  return s[lo] + (s[hi] - s[lo]) * (idx - lo);
}

// ----------------------
// computeGithubMetrics
// ----------------------
async function computeGithubMetrics({ days = WINDOW_DAYS } = {}) {
  const now = Date.now();
  const since = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
  const until = new Date(now).toISOString();

  const [runsResp, commits] = await Promise.all([getWorkflowRunsPage(100), getCommits(since, until)]);
  const runsAll = (runsResp.workflow_runs || []);
  const sinceDate = new Date(since);
  const allRuns = runsAll.filter(r => {
    const d = new Date(r.updated_at || r.run_started_at || r.created_at);
    return d >= sinceDate;
  });

  const successes = allRuns.filter(r => r.conclusion === 'success');
  const failures = allRuns.filter(r => r.conclusion === 'failure');

  const deploymentEvents = successes.map(r => ({
    time: new Date(r.updated_at || r.run_started_at || r.created_at),
    sha: r.head_sha,
    id: r.id,
  })).sort((a, b) => a.time - b.time);

  // Lead times (ms)
  const leadTimes = [];
  for (const c of commits) {
    const cTime = new Date(c.commit.committer.date);
    const deploy = deploymentEvents.find(d => d.time >= cTime);
    if (deploy) leadTimes.push(deploy.time - cTime);
  }

  // MTTRs (ms)
  const mttrs = [];
  for (const f of failures) {
    const fTime = new Date(f.updated_at || f.run_started_at || f.created_at);
    const next = deploymentEvents.find(d => d.time > fTime);
    if (next) mttrs.push(next.time - fTime);
  }

  const successByDay = groupByDay(successes, r => r.updated_at || r.run_started_at || r.created_at);
  const failureByDay = groupByDay(failures, r => r.updated_at || r.run_started_at || r.created_at);

  const daysSet = new Set([...Object.keys(successByDay), ...Object.keys(failureByDay)]);
  const daily = {};
  for (const day of daysSet) {
    const s = successByDay[day]?.length || 0;
    const f = failureByDay[day]?.length || 0;
    daily[day] = {
      deployment_frequency: s,
      change_failure_rate: s + f === 0 ? null : f / (s + f),
      lead_time_ms_mean: null,
      mttr_ms_mean: null,
    };
  }

  // Attach per-day arrays and compute means
  for (const c of commits) {
    const cTime = new Date(c.commit.committer.date);
    const deploy = deploymentEvents.find(d => d.time >= cTime);
    if (deploy) {
      const day = deploy.time.toISOString().slice(0, 10);
      daily[day] ??= {};
      daily[day].lead_time_ms_mean ??= [];
      daily[day].lead_time_ms_mean.push(deploy.time - cTime);
    }
  }

  for (const f of failures) {
    const fTime = new Date(f.updated_at || f.run_started_at || f.created_at);
    const next = deploymentEvents.find(d => d.time > fTime);
    if (next) {
      const day = (f.updated_at || f.run_started_at || f.created_at).slice(0, 10);
      daily[day] ??= {};
      daily[day].mttr_ms_mean ??= [];
      daily[day].mttr_ms_mean.push(next.time - fTime);
    }
  }

  for (const day of Object.keys(daily)) {
    const ltArr = Array.isArray(daily[day].lead_time_ms_mean) ? daily[day].lead_time_ms_mean : null;
    const mttrArr = Array.isArray(daily[day].mttr_ms_mean) ? daily[day].mttr_ms_mean : null;
    daily[day].lead_time_ms_mean = ltArr && ltArr.length ? Math.round(ltArr.reduce((a, b) => a + b, 0) / ltArr.length) : null;
    daily[day].mttr_ms_mean = mttrArr && mttrArr.length ? Math.round(mttrArr.reduce((a, b) => a + b, 0) / mttrArr.length) : null;
  }

  return {
    daily,
    meta: {
      successes: successes.length,
      failures: failures.length,
      commits: commits.length,
      window_days: days,
      total_deployments: successes.length + failures.length,
      lead_times_ms_all: leadTimes,
      mttr_ms_all: mttrs,
    },
  };
}

// ----------------------
// Pro endpoints
// ----------------------
app.get('/api/runs', async (req, res) => {
  try {
    const per_page = Number(req.query.per_page || 50);
    const resp = await getWorkflowRunsPage(per_page);
    const runs = (resp.workflow_runs || []).map(r => ({
      id: r.id,
      name: r.name,
      conclusion: r.conclusion,
      updated_at: r.updated_at,
      run_number: r.run_number,
      html_url: r.html_url,
      head_sha: r.head_sha,
    }));
    res.json({ runs });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/summary', async (req, res) => {
  try {
    const days = Number(req.query.days || WINDOW_DAYS);
    const data = await computeGithubMetrics({ days });
    const meta = data.meta || {};
    const leadAll = meta.lead_times_ms_all || [];
    const mttrAll = meta.mttr_ms_all || [];

    const medianLead = leadAll.length ? percentile(leadAll, 50) / 3600000 : null;
    const p95Lead = leadAll.length ? percentile(leadAll, 95) / 3600000 : null;
    const medianMttr = mttrAll.length ? percentile(mttrAll, 50) / 3600000 : null;
    const p95Mttr = mttrAll.length ? percentile(mttrAll, 95) / 3600000 : null;

    // contributors
    let contributors_count = 0;
    try {
      const contributorsResp = await gh(`/repos/${OWNER}/${REPO}/contributors`, { per_page: 100 });
      contributors_count = Array.isArray(contributorsResp) ? contributorsResp.length : (contributorsResp.length || 0);
    } catch (err) {
      contributors_count = 0;
    }

    res.json({
      window_days: meta.window_days,
      total_deployments: meta.total_deployments,
      successes: meta.successes,
      failures: meta.failures,
      commits: meta.commits,
      median_lead_hours: medianLead !== null ? Number(medianLead.toFixed(2)) : null,
      p95_lead_hours: p95Lead !== null ? Number(p95Lead.toFixed(2)) : null,
      median_mttr_hours: medianMttr !== null ? Number(medianMttr.toFixed(2)) : null,
      p95_mttr_hours: p95Mttr !== null ? Number(p95Mttr.toFixed(2)) : null,
      contributors_count,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Existing metrics endpoint (daily + meta)
app.get('/api/metrics/github', async (req, res) => {
  try {
    const days = Number(req.query.days || WINDOW_DAYS);
    const data = await computeGithubMetrics({ days });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Start
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});