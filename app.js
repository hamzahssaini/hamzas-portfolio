// app.js — DORA Metrics server (GitHub-backed)
// - Serves a static dashboard from /public
// - Secure POST /api/deployments (Bearer DORA_API_KEY)
// - GitHub-backed metrics endpoints used by the dashboard
//
// Required env vars (recommended):
//   PORT (default 3000), GITHUB_TOKEN (optional for GitHub metrics), DORA_API_KEY
//
// Install deps:
//   npm install express morgan node-fetch@2 dotenv

const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch'); // npm i node-fetch@2
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Config (env)
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const BRANCH = process.env.BRANCH;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DEPLOY_WORKFLOW_ID = process.env.DEPLOY_WORKFLOW_ID;
const WINDOW_DAYS = Number(process.env.WINDOW_DAYS || 365);
const DORA_API_KEY = process.env.DORA_API_KEY;

// Middleware (body + logging)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for API (helps when opening dashboard.html from file:// or another origin)
app.use('/api', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '600');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// In-memory stores (simple demo)
const users = [];
const deployments = [];

// --- Email Config (Nodemailer)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ----- Routes (API) -----
// Health & users
app.get('/healthz', (req, res) => res.status(200).send('OK'));
app.get('/api/users', (req, res) => res.json(users));

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'hamzahssaini0@gmail.com',
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New message from your portfolio</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials not configured. Email not sent.');
      return res.status(200).json({ success: true, message: 'Message received (Development Mode: No SMTP configured).' });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Secure POST /api/deployments — requires Authorization: Bearer <DORA_API_KEY>
app.post('/api/deployments', (req, res) => {
  if (!DORA_API_KEY) {
    console.warn('DORA_API_KEY not configured — rejecting external POST /api/deployments');
    return res.status(500).json({ error: 'Server not configured to accept external deployment records' });
  }
  const auth = (req.get('authorization') || '');
  if (!auth.startsWith('Bearer ') || auth.slice(7) !== DORA_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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

// Basic aggregated metrics from in-memory deployments
app.get('/api/metrics', (req, res) => {
  if (deployments.length === 0) return res.json({ totalDeployments: 0, deploymentFrequencyPerDay: 0 });
  const sorted = [...deployments].sort((a, b) => a.deployedAt - b.deployedAt);
  const totalDeployments = sorted.length;
  const first = sorted[0].deployedAt;
  const last = sorted[sorted.length - 1].deployedAt;
  const msDiff = last.getTime() - first.getTime() || 1;
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);
  const deploymentFrequencyPerDay = daysDiff === 0 ? totalDeployments : totalDeployments / daysDiff;
  res.json({
    totalDeployments,
    firstDeploymentAt: first,
    lastDeploymentAt: last,
    deploymentFrequencyPerDay: Number(deploymentFrequencyPerDay.toFixed(2)),
  });
});

// ----------------------
// GitHub helpers and DORA metrics (used by dashboard)
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
    const err = new Error(`GitHub API ${res.status}: ${text}`);
    err.status = res.status;
    err.responseText = text;
    throw err;
  }
  return res.json();
}

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

async function computeGithubMetrics({ days = WINDOW_DAYS, since, until } = {}) {
  // If no GitHub token, return an empty-but-valid structure (avoid throwing uncaught)
  if (!GITHUB_TOKEN) {
    return { daily: {}, meta: { successes: 0, failures: 0, commits: 0, window_days: days, total_deployments: 0, lead_times_ms_all: [], mttr_ms_all: [] } };
  }

  const now = Date.now();
  // If the caller provided explicit ISO since/until, prefer them. Otherwise compute from `days`.
  let sinceIso = '';
  let untilIso = '';
  try {
    if (since) {
      sinceIso = new Date(since).toISOString();
    } else {
      sinceIso = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
    }
  } catch (e) {
    sinceIso = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
  }
  try {
    if (until) {
      untilIso = new Date(until).toISOString();
    } else {
      untilIso = new Date(now).toISOString();
    }
  } catch (e) {
    untilIso = new Date(now).toISOString();
  }

  let runsResp;
  let commits;
  try {
    [runsResp, commits] = await Promise.all([getWorkflowRunsPage(100), getCommits(sinceIso, untilIso)]);
  } catch (e) {
    if (e && (e.status === 401 || e.status === 403)) {
      return {
        daily: {},
        meta: { successes: 0, failures: 0, commits: 0, window_days: days, total_deployments: 0, lead_times_ms_all: [], mttr_ms_all: [] },
        warning: 'GITHUB_TOKEN is invalid or lacks permissions; GitHub-backed metrics are disabled',
      };
    }
    throw e;
  }
  const runsAll = (runsResp.workflow_runs || []);
  const sinceDate = new Date(sinceIso);
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

  // Binary search helper: find the first deployment event with time >= targetTime
  // Returns the index, or deploymentEvents.length if none found
  function findFirstDeploymentGte(targetTime) {
    let lo = 0, hi = deploymentEvents.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (deploymentEvents[mid].time < targetTime) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // Binary search helper: find the first deployment event with time > targetTime
  function findFirstDeploymentGt(targetTime) {
    let lo = 0, hi = deploymentEvents.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (deploymentEvents[mid].time <= targetTime) lo = mid + 1;
      else hi = mid;
    }
    return lo;
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

  // Compute lead times and daily lead_time_ms_mean in a single pass over commits
  // Using binary search instead of linear .find() for O(n log m) instead of O(n*m)
  const leadTimes = [];
  for (const c of commits) {
    const cTime = new Date(c.commit.committer.date);
    const idx = findFirstDeploymentGte(cTime);
    if (idx < deploymentEvents.length) {
      const deploy = deploymentEvents[idx];
      const leadTime = deploy.time - cTime;
      leadTimes.push(leadTime);
      const day = deploy.time.toISOString().slice(0, 10);
      daily[day] ??= {};
      daily[day].lead_time_ms_mean ??= [];
      daily[day].lead_time_ms_mean.push(leadTime);
    }
  }

  // Compute MTTRs and daily mttr_ms_mean in a single pass over failures
  // Using binary search instead of linear .find() for O(n log m) instead of O(n*m)
  const mttrs = [];
  for (const f of failures) {
    const fTime = new Date(f.updated_at || f.run_started_at || f.created_at);
    const idx = findFirstDeploymentGt(fTime);
    if (idx < deploymentEvents.length) {
      const next = deploymentEvents[idx];
      const mttr = next.time - fTime;
      mttrs.push(mttr);
      const day = (f.updated_at || f.run_started_at || f.created_at).slice(0, 10);
      daily[day] ??= {};
      daily[day].mttr_ms_mean ??= [];
      daily[day].mttr_ms_mean.push(mttr);
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

// Pro endpoints (runs & summary)
app.get('/api/runs', async (req, res) => {
  try {
    if (!GITHUB_TOKEN) {
      // Return an empty list with a helpful warning rather than a 500
      return res.json({ runs: [], warning: 'GITHUB_TOKEN not set; set it in .env to enable GitHub-backed runs' });
    }
    const per_page = Number(req.query.per_page || 50);
    const resp = await getWorkflowRunsPage(per_page);
    const since = req.query.since ? new Date(req.query.since) : null;
    const until = req.query.until ? new Date(req.query.until) : null;
    const runs = (resp.workflow_runs || [])
      .filter(r => {
        if (!since && !until) return true;
        const d = new Date(r.updated_at || r.run_started_at || r.created_at);
        if (since && d < since) return false;
        if (until && d > until) return false;
        return true;
      })
      .map(r => ({
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
    console.error('GET /api/runs error:', e && (e.stack || e.message || e));
    if (e && (e.status === 401 || e.status === 403)) {
      return res.json({ runs: [], warning: 'GITHUB_TOKEN is invalid or lacks permissions; runs are unavailable' });
    }
    res.status(500).json({ error: e.message || 'Failed to fetch runs' });
  }
});

app.get('/api/summary', async (req, res) => {
  try {
    const days = Number(req.query.days || WINDOW_DAYS);
    const since = req.query.since || undefined;
    const until = req.query.until || undefined;
    const data = await computeGithubMetrics({ days, since, until });
    const meta = data.meta || {};
    const leadAll = meta.lead_times_ms_all || [];
    const mttrAll = meta.mttr_ms_all || [];

    const medianLead = leadAll.length ? percentile(leadAll, 50) / 3600000 : null;
    const p95Lead = leadAll.length ? percentile(leadAll, 95) / 3600000 : null;
    const medianMttr = mttrAll.length ? percentile(mttrAll, 50) / 3600000 : null;
    const p95Mttr = mttrAll.length ? percentile(mttrAll, 95) / 3600000 : null;

    let contributors_count = 0;
    try {
      if (GITHUB_TOKEN) {
        const contributorsResp = await gh(`/repos/${OWNER}/${REPO}/contributors`, { per_page: 100 });
        if (Array.isArray(contributorsResp)) {
          // Count only the configured OWNER (your portfolio) to avoid counting bots or other org members
          const ownerLogin = String(OWNER || '').toLowerCase();
          if (ownerLogin) {
            contributors_count = contributorsResp.filter(c => String(c.login || '').toLowerCase() === ownerLogin).length;
          } else {
            contributors_count = contributorsResp.length || 0;
          }
        } else {
          contributors_count = Number(contributorsResp.length || 0);
        }
      } else {
        contributors_count = 0;
      }
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
      ...(data.warning ? { warning: data.warning } : {}),
    });
  } catch (e) {
    console.error('GET /api/summary error:', e && (e.stack || e.message || e));
    res.status(500).json({ error: e.message || 'Failed to compute summary' });
  }
});

// Add this before: app.use(express.static('public'));
app.get('/api/metrics/github', async (req, res) => {
  try {
    const days = Number(req.query.days || WINDOW_DAYS);
    const since = req.query.since || undefined;
    const until = req.query.until || undefined;
    const data = await computeGithubMetrics({ days, since, until });
    // If token missing, include a friendly warning so front-end can show it
    if (!GITHUB_TOKEN) {
      return res.json({ ...data, warning: 'GITHUB_TOKEN not set; GitHub-backed metrics are disabled' });
    }
    return res.json(data);
  } catch (err) {
    console.error('GET /api/metrics/github error', err && (err.stack || err.message || err));
    if (err && (err.status === 401 || err.status === 403)) {
      return res.json({
        daily: {},
        meta: { successes: 0, failures: 0, commits: 0, window_days: Number(req.query.days || WINDOW_DAYS), total_deployments: 0, lead_times_ms_all: [], mttr_ms_all: [] },
        warning: 'GITHUB_TOKEN is invalid or lacks permissions; GitHub-backed metrics are disabled',
      });
    }
    res.status(500).json({ error: err.message || 'Failed to compute GitHub metrics' });
  }
});

// ----- Serve static dashboard & fallback -----
// Serve public files (this comes after API routes so /api/* isn't captured by static)
app.use(express.static('public'));

// Fallback root -> index.html if present
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

// API 404 handler (return JSON for unknown API endpoints)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handler — return JSON for API paths, plain text for others
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && (err.stack || err.message || err));
  if (req.path && req.path.startsWith('/api/')) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  } else {
    res.status(500).send('Internal Server Error');
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