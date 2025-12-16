// app.js
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(morgan('dev'));
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
        input::placeholder {
          animation: movePlaceholder 3s infinite alternate;
          color: #aaa;
        }
        button { background-color: #0078D7; color: white; padding: 12px 20px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
        button:hover { background-color: #005bb5; }

        @keyframes movePlaceholder {
          0% { transform: translateX(0); }
          50% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌐Hello from App.js running in Kubernetes</h1>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <script>
        // Redirect to home page after 5 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      </script>
    </head>
    <body>
      <div class="success-box">
        <h1>👋 Hello ${name}, your registration is <span style="color: green;">successful!</span></h1>
        <p><strong>Registered Email:</strong> ${email}</p>
        <p>🎉 Thank you for joining, <strong>${name}</strong>!</p>
        <a class="back-btn" href="/">← Back to Home</a>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #555;">
          Redirecting to home page in 5 seconds...
        </p>
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
// DORA METRICS API (in-memory)
// =========================

// POST /api/deployments
app.post('/api/deployments', (req, res) => {
  const { repo, commit, deployedAt } = req.body;

  if (!repo || !commit || !deployedAt) {
    return res
      .status(400)
      .json({ error: 'repo, commit and deployedAt are required' });
  }

  const deployment = {
    id: deployments.length + 1,
    repo,
    commit,
    deployedAt: new Date(deployedAt),
  };

  deployments.push(deployment);

  res.status(201).json(deployment);
});

// GET /api/deployments
app.get('/api/deployments', (req, res) => {
  // sort by deployedAt desc
  const sorted = [...deployments].sort(
    (a, b) => b.deployedAt - a.deployedAt
  );
  res.json(sorted);
});

// GET /api/metrics
app.get('/api/metrics', (req, res) => {
  if (deployments.length === 0) {
    return res.json({
      totalDeployments: 0,
      deploymentFrequencyPerDay: 0,
    });
  }

  const sorted = [...deployments].sort((a, b) => a.deployedAt - b.deployedAt);
  const totalDeployments = sorted.length;
  const first = sorted[0].deployedAt;
  const last = sorted[sorted.length - 1].deployedAt;

  const msDiff = last.getTime() - first.getTime() || 1;
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);

  const deploymentFrequencyPerDay =
    daysDiff === 0 ? totalDeployments : totalDeployments / daysDiff;

  res.json({
    totalDeployments,
    firstDeploymentAt: first,
    lastDeploymentAt: last,
    deploymentFrequencyPerDay: Number(
      deploymentFrequencyPerDay.toFixed(2)
    ),
  });
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