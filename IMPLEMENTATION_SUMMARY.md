
# Portfolio Architecture Update

I have successfully integrated the **Modern React/Next.js Projects UI** into your **Production Node.js/Express Portfolio**.

## 🏗 Architecture Change

Your workspace is now a hybrid:
1.  **Production Core**: `node app.js` serves the classic HTML (`public/index.html`) via Express.
2.  **Projects Widget**: A React "Micro-frontend" (`app/widget.tsx`) that renders the Projects section.
    -   Built using **Vite**.
    -   Bundled into `public/assets/js/projects-widget.js`.
    -   Injected into `public/index.html`.

## 🛠 File Changes

-   **`app/widget.tsx`**: New entry point that wraps `Filters`, `ProjectCard`, and `ProjectModal` for embedding.
-   **`vite.config.ts`**: Configuration to build the widget into static assets.
-   **`public/index.html`**: Updated to remove legacy JS modals/grids and include the React widget container `<div id="react-projects-root">`.
-   **`public/assets/js/main.js`**: Legacy `renderProjects` logic disabled to prevent conflicts.

## 🚀 How to Run (Local)

1.  **Start Production Server**:
    ```bash
    node app.js
    ```
    Open [http://localhost:3000](http://localhost:3000).
    You will see the Classic Hero/About sections, but the **Projects** section is now the React-powered UI.

## 🔄 How to Update Projects (Dev Workflow)

If you modify `data/projects.ts` or any React component (`components/*.tsx`):

1.  **Rebuild the Widget**:
    ```bash
    npx vite build
    ```
    (This updates `public/assets/js/projects-widget.js`)

2.  **Restart Node Server** (if needed, though client-side changes usually just need a browser refresh).

## ⚠️ Important Notes

-   **Tailwind Isolation**: I disabled Tailwind's "Preflight" in `tailwind.config.ts` to prevent it from resetting your production site's existing styles (Hero, Nav, etc.).
-   **Data Source**: `data/projects.ts` is the single source of truth for the Projects section.
