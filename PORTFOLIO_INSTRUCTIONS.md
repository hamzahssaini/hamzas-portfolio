# Professional DevOps Portfolio

This portfolio has been transformed into a production-ready Next.js application using React, Tailwind CSS, Framer Motion, and Lucide Icons.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## Project Structure
- `/app`: Main application routes (page.tsx, layout.tsx, globals.css)
- `/components`: Reusable UI components (ProjectCard, ProjectModal, Filters)
- `/data`: Source of truth for project data (projects.ts)
- `/public/images`: Directory for architecture images

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

3.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## Architecture Images (CRITICAL)

The portfolio expects architecture diagrams for each project to be placed in `public/images/`.

Please add the following files to `public/images/`:
- `mission-devops-arch.png`
- `ansible-project-arch.png`
- `hub-spoke-arch.png`
- `migration-arch.png`
- `k8s-arch.png`
- `rag-arch.png`
- `admin-arch.png`
- `network-arch.png`

Use high-quality PNGs or JPEGs. The modal handles scaling automatically.

## Features
- **Project Filtering**: Filter by category (DevOps, Cloud, AI, etc.) or search by text.
- **Architecture Viewer**: detailed modal with Zoom/Pan/Download.
- **Dark Mode**: Toggle supported.
- **Responsive**: Mobile-first design.
