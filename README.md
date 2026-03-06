# DORA Metrics

`dora-metrics` is a simple Node.js application designed to help understand and experiment with **DORA metrics** and modern **CI/CD** practices.

The goal of this project is to:

- Practice a clean **Git branching** and **Pull Request** workflow.
- Set up **GitHub Actions** for CI/CD.
- Measure and reason about **Deployment Frequency** and **Lead Time for Changes**.

---

## 📊 What are DORA Metrics?

DORA (DevOps Research and Assessment) defines four key metrics to evaluate software delivery performance.  
This project focuses primarily on:

### 1. Deployment Frequency

> How often an application is deployed to production (or a production‑like environment) over a period of time.

- Example: 10 deployments in 5 days → **2 deployments/day**
- Indicates:
  - Team agility
  - Level of automation in the CI/CD pipeline

### 2. Lead Time for Changes

> Time between a code change (commit) and its deployment to production.

- Example:  
  - Commit: Monday 09:00  
  - Deployed: Tuesday 09:00  
  - → Lead Time = **24 hours**
- Indicates:
  - Speed of the delivery pipeline
  - Fluidity from **Dev → Prod**

This repository is used to **simulate and improve** these metrics via small, frequent changes and automated deployments.

---

## 🏗️ Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
├── services/
│   ├── backend/                   # Node.js/Express API (DORA metrics + contact)
│   │   ├── app.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── Dockerfile
│   │   └── scripts/
│   └── frontend/                  # Static portfolio + dashboard (Nginx)
│       ├── public/
│       ├── Dockerfile
│       └── nginx.conf
├── .env                           # (Local dev) environment variables
└── README.md
```

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **CI/CD:** GitHub Actions
- **Containerization:** Dockerfile (optional for container deployments)

---

## 🚀 CI/CD Pipeline

The CI/CD pipeline is defined in:

- `.github/workflows/ci-cd.yml`

Current behavior:

- **On every push** and **pull request**:
  - Checkout the code
  - Install dependencies with `npm ci`
  - Run tests with `npm test` (or a placeholder if no tests yet)

- **On push to `main`**:
  - The same build & tests run
  - A simple **“simulated deployment”** step executes – this can later be replaced by a real deployment (Docker, VPS, cloud provider, etc.)

Example workflow (simplified):

```yaml
name: CI-CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test || echo "no tests yet"

      - name: Deploy
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          echo "Simulated deployment at $(date -u)"
```

As the project evolves, the `Deploy` step will be updated to perform a **real deployment**.

---

## 🧪 Running the Project Locally

1. **Clone the repository**

```bash
git clone https://github.com/hamzahssaini/dora-metrics.git
cd dora-metrics
```

2. **Start the backend (API)**

```bash
cd services/backend
npm ci
npm start
```

The backend listens on `PORT` (default `3000`). Health: `GET /healthz`.

3. **Open the frontend**

- Recommended (served by backend during dev): open `http://localhost:3000/` **only if** you run a separate static server or reverse-proxy.
- Simplest: open the static file directly: `services/frontend/public/index.html`.

For the metrics dashboard, prefer: `http://localhost:3000/dashboard.html` when you serve the frontend via a web server. If you open it via `file://`, it will prompt you to start the backend.

4. **Run tests**

```bash
npm test
```

(If tests are not yet implemented, you can add them later and update the CI pipeline accordingly.)

---

## 🌱 Working with DORA-Friendly Workflow

To practice good DORA metrics, the project follows this workflow:

1. Start from up‑to‑date `main`:

```bash
git checkout main
git pull origin main
```

2. Create a small feature branch:

```bash
git checkout -b feature/small-change
```

3. Make small, focused changes and commit:

```bash
git add <files>
git commit -m "Describe the change"
git push -u origin feature/small-change
```

4. Open a **Pull Request** to `main` on GitHub.
5. Let **GitHub Actions** run (build & tests).
6. After review, **merge** the PR into `main`.
7. The CI/CD pipeline on `main` runs and performs a (simulated) deploy.

This pattern allows later calculation of:

- **Deployment Frequency** = number of successful `main` deployments per period
- **Lead Time for Changes** = time from commit/PR to successful deployment

---

## 📌 Future Improvements

Planned or possible enhancements:

- Implement real deployment (Docker container, VPS, PaaS, etc.)
- Add an API or background job to:
  - Record deployments
  - Compute and display DORA metrics
- Add automated tests and code coverage
- Add a small UI or dashboard to visualize DORA metrics over time

---

## 🐳 Docker Builds (ready for Kubernetes)

Backend image:

```bash
docker build -t dora-backend:local services/backend
docker run --rm -p 3000:3000 --env-file .env dora-backend:local
```

Frontend image:

```bash
docker build -t dora-frontend:local services/frontend
docker run --rm -p 8080:80 dora-frontend:local
```

In Kubernetes, you typically route `/api/*` to the backend Service and `/` to the frontend Service using an Ingress.

---

## 📄 License

This project is for learning and experimentation purposes.  
You can adapt and reuse the structure and ideas to build your own DORA metrics tooling.