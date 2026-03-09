// check_github_token.js
// Reads .env via dotenv and queries GitHub /user to report status code and scopes.

require('dotenv').config();
const https = require('https');
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('NO_TOKEN');
  process.exit(2);
}

const opts = {
  hostname: 'api.github.com',
  path: '/user',
  method: 'GET',
  headers: {
    'User-Agent': 'dora-metrics-token-check',
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github+json'
  }
};

const req = https.request(opts, (res) => {
  console.log('HTTP', res.statusCode);
  const scopes = res.headers['x-oauth-scopes'] || '';
  if (scopes) console.log('SCOPES', scopes);
  let body = '';
  res.on('data', (c) => body += c.toString());
  res.on('end', () => {
    if (res.statusCode === 200) {
      try { const j = JSON.parse(body); console.log('USER_LOGIN', j.login || '(unknown)'); } catch (e) {}
    } else {
      try { const j = JSON.parse(body); if (j && j.message) console.error('MSG', j.message); } catch(e){}
    }
    process.exit(res.statusCode === 200 ? 0 : 1);
  });
});

req.on('error', (err) => {
  console.error('REQ_ERR', err && err.message);
  process.exit(3);
});

req.end();
