// check_repo_runs.js
require('dotenv').config();
const https = require('https');
const token = process.env.GITHUB_TOKEN;
const owner = process.env.OWNER || 'hamzahssaini';
const repo = process.env.REPO || 'dora-metrics';
if (!token) { console.error('NO_TOKEN'); process.exit(2); }

const path = `/repos/${owner}/${repo}/actions/runs?per_page=1`;
const opts = {
  hostname: 'api.github.com',
  path,
  method: 'GET',
  headers: {
    'User-Agent': 'dora-metrics-token-check',
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github+json'
  }
};

const req = https.request(opts, (res) => {
  console.log('HTTP', res.statusCode);
  let body = '';
  res.on('data', (c) => body += c.toString());
  res.on('end', () => {
    try { const j = JSON.parse(body); console.log('BODY', Object.keys(j).join(', ')); if (j.message) console.log('MSG', j.message); } catch(e) { console.log('RAW', body.slice(0,300)); }
    process.exit(res.statusCode === 200 ? 0 : 1);
  });
});
req.on('error', (err) => { console.error('REQ_ERR', err && err.message); process.exit(3); });
req.end();
