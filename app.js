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
const DEPLOY_WORKFLOW_ID = process.env.DEPLOY_WORKFLOW_ID || ''; // optional: target a specific workflow
const WINDOW_DAYS = Number(process.env.WINDOW_DAYS || 60);

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory "database" for users and deployments
const users = [];
const deployments = [];

// Home Page with Form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hamza's Node.js App</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(to right, #e0f7fa, #ffffff); color: #333; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .container { background: white; padding: 30px 40px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); text-align: center; width: 100%; max-width: 400px; }
        h1 { font-size: 1.8rem; color: #0078D7; margin-bottom: 20px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; }
        input::placeholder { animation: movePlaceholder 3s infinite alternate; color: #aaa; }
        button { background-color: #0078D7; color: white; padding: 12px 20px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
        button:hover { background-color: #005bb5; }
        @keyframes movePlaceholder { 0% { transform: translateX(0); } 50% { transform: translateX(5px); } 100% { transform: translateX(0); } }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌐Hello from App.js running in local environment!!</h1>
        <p>Welcome from <strong>Hamza Hssaini</strong></p>
        <form action="/register" method="POST">
          <input type="text" name="name" placeholder="Enter your username" required />
          <input type="email" name="email" placeholder="Enter your gmail" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Register route (stores users in memory)
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  users.push({ id: users.length + 1, name, email });
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Success</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f5fff5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
        .success-box { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; width: 100%; animation: fadeIn 0.6s ease-out; position: relative; }
        h1 { color: #28a745; font-size: 1.8rem; margin-bottom: 10px; }
        p { font-size: 1.1rem; color: #333; }
        .back-btn { margin-top: 20px; display: inline-block; background-color: #0078D7; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: background-color 0.3s ease; }
        .back-btn:hover { background-color: #005bb5; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      </style>
      <script>
        setTimeout(() => { window.location.href = "/"; }, 5000);
      </script>
    </head>
    <body>
      <div class="success-box">
        <h1>👋 Hello ${name}, your registration is <span style="color: green;">successful!</span></h1>
        <p><strong>Registered Email:</strong> ${email}</p>
        <p>🎉 Thank you for joining, <strong>${name}</strong>!</p>
        <a class="back-btn" href="/">← Back to Home</a>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #555;">Redirecting to home page in 5 seconds...</p>
      </div>
    </body>
    </html>
  `);
});

// API route to get users (from memory)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Health check route
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// =========================
// In-memory deployments API
// =========================
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
  if (deployments.length === 0) {
    return res.json({ totalDeployments: 0, deploymentFrequencyPerDay: 0 });
  }
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

// =========================
// GitHub-backed DORA metrics
// =========================
async function gh(path, params = {}) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required for GitHub-backed metrics');
  }
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

async function getWorkflowRuns(status, sinceIso) {
  return gh(`/repos/${OWNER}/${REPO}/actions/runs`, {
    status,
    per_page: 100,
    branch: BRANCH,
    ...(DEPLOY_WORKFLOW_ID ? { workflow_id: DEPLOY_WORKFLOW_ID } : {}),
    ...(sinceIso ? { created: `${sinceIso}..` } : {}),
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

async function computeGithubMetrics({ days = WINDOW_DAYS } = {}) {
  const now = Date.now();
  const since = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
  const until = new Date(now).toISOString();

  const [successRuns, failureRuns, commits] = await Promise.all([
    getWorkflowRuns('success', since),
    getWorkflowRuns('failure', since),
    getCommits(since, until),
  ]);

  const successes = successRuns.workflow_runs || [];
  const failures = failureRuns.workflow_runs || [];

  const deploymentEvents = successes
    .map(r => ({
      time: new Date(r.updated_at || r.run_started_at || r.created_at),
      sha: r.head_sha,
      id: r.id,
    }))
    .sort((a, b) => a.time - b.time);

  // Lead time (simple: commit time -> first deploy after it)
  const leadTimes = [];
  for (const c of commits) {
    const cTime = new Date(c.commit.committer.date);
    const deploy = deploymentEvents.find(d => d.time >= cTime);
    if (deploy) leadTimes.push({ ms: deploy.time - cTime, deployId: deploy.id });
  }

  // MTTR: failed deploy -> next success
  const mttrs = [];
  for (const f of failures) {
    const fTime = new Date(f.updated_at || f.run_started_at || f.created_at);
    const next = deploymentEvents.find(d => d.time > fTime);
    if (next) mttrs.push({ ms: next.time - fTime, failureId: f.id, recoveryId: next.id });
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

  for (const lt of leadTimes) {
    const deploy = deploymentEvents.find(d => d.id === lt.deployId);
    if (!deploy) continue;
    const day = deploy.time.toISOString().slice(0, 10);
    daily[day] ??= {};
    daily[day].lead_time_ms_mean ??= [];
    daily[day].lead_time_ms_mean.push(lt.ms);
  }

  for (const m of mttrs) {
    const failure = failures.find(f => f.id === m.failureId);
    if (!failure) continue;
    const day = (failure.updated_at || failure.run_started_at || failure.created_at).slice(0, 10);
    daily[day] ??= {};
    daily[day].mttr_ms_mean ??= [];
    daily[day].mttr_ms_mean.push(m.ms);
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
    },
  };
}

// GET /api/metrics/github -> GitHub-backed DORA metrics
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});