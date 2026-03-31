const fs = require('fs');
const k8sTxtPath = 'c:\\dora-metrics\\k8s.txt';
const outputPath = 'c:\\dora-metrics\\public\\engineering-notes\\posts\\kubernetes-cheat-sheet.html';

const inputInfo = fs.readFileSync(k8sTxtPath, 'utf8');
const lines = inputInfo.split('\n').map(l => l.trim()).filter(l => l);
let grouped = {};
let currentCat = null;
let currentCmd = null;

for (let line of lines) {
    if (line.startsWith('🔹')) {
        currentCat = line.replace('🔹', '').trim();
        if (!grouped[currentCat]) grouped[currentCat] = [];
    } else if (line.match(/^\d+\./)) {
        if (currentCmd && currentCat) grouped[currentCat].push(currentCmd);

        let dashIndex = line.indexOf(' – ');
        if (dashIndex === -1) dashIndex = line.indexOf(' - ');

        if (dashIndex !== -1) {
            let cmdPart = line.substring(0, dashIndex).trim();
            let descPart = line.substring(dashIndex + 3).trim();
            let rawCmd = cmdPart.replace(/^\d+\./, '').trim();
            currentCmd = { command: rawCmd, description: descPart };
        } else {
            let rawCmd = line.replace(/^\d+\./, '').trim();
            currentCmd = { command: rawCmd, description: '' };
        }
    } else {
        if (currentCmd) {
            if (line.includes(' – ')) {
                let parts = line.split(' – ');
                currentCmd.command += ' ' + parts[0].trim();
                currentCmd.description += " " + parts.slice(1).join(' – ').trim();
            } else if (!currentCmd.description) {
                currentCmd.command += line;
            } else {
                currentCmd.description += ' ' + line.trim();
            }
        }
    }
}
if (currentCmd && currentCat) grouped[currentCat].push(currentCmd);

let commandsArray = [];
let idCounter = 1;
let categoriesListHtml = [];

const iconMap = {
    'Cluster': '🎛️',
    'Pod': '📦',
    'Deployment': '🚀',
    'Service': '🌐',
    'Namespace': '📁',
    'ConfigMap': '⚙️',
    'Volume': '💾',
    'Role': '🔐',
    'Node': '🖥️',
    'Troubleshooting': '🔧'
};

for (let cat in grouped) {
    let catShort = cat.split(' ')[0];
    let icon = iconMap[catShort] || '📚';
    categoriesListHtml.push(`<li data-category="${cat.replace(/"/g, '&quot;')}"><span class="cat-icon">${icon}</span> ${cat}</li>`);

    for (let cmd of grouped[cat]) {
        let title = cmd.description || "Execute Command";
        if (title.length > 60) title = title.substring(0, 56) + '...';
        
        let difficulty = "Essential";
        let cLog = cmd.command.toLowerCase();
        if (cLog.includes('--force') || cLog.includes('drain') || cLog.includes('kubeadm') || cLog.includes('etcd') || cLog.includes('taint')) difficulty = "Advanced";
        else if (cLog.includes('--patch') || cLog.includes('kubelet') || cLog.includes('auth can-i') || cLog.includes('role') || cLog.includes('-o yaml')) difficulty = "Intermediate";

        let tags = ["#" + catShort.toLowerCase()];
        if (cLog.includes("logs") || cLog.includes("describe") || cLog.includes("top ")) tags.push("#debug");
        if (cLog.includes("delete ") || cLog.includes("--force")) tags.push("#destructive");
        if (cLog.includes("yaml")) tags.push("#manifests");

        commandsArray.push({
            id: "cmd-" + idCounter++,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            command: cmd.command,
            description: "Quick Action — " + cat,
            difficulty: difficulty,
            category: cat,
            tags: tags,
            notes: (cmd.description || "") + " — Included in " + cat + " commands group."
        });
    }
}

const commandsJson = JSON.stringify(commandsArray, null, 2);

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K8s OpsFlow | Production Grade Cheat Sheet</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #0B0F19; --bg-surface: #131A2A; --bg-surface-hover: #1A2235;
            --border-color: #232E42; --border-glow: rgba(59, 130, 246, 0.4);
            --text-primary: #F1F5F9; --text-secondary: #94A3B8;
            --accent-primary: #3B82F6; --accent-primary-hover: #2563EB;
            --terminal-hdr: #1E293B; --terminal-bg: #030712;
            --terminal-text: #22D3EE; --terminal-prompt: #E2E8F0;
            --badge-essential: #059669; --badge-intermediate: #D97706; --badge-advanced: #E11D48;
            --tag-bg: rgba(51, 65, 85, 0.5); --tag-text: #60A5FA;
            --sidebar-width: 280px; --header-height: 70px;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body.light-theme {
            --bg-main: #F8FAFC; --bg-surface: #FFFFFF; --bg-surface-hover: #F1F5F9;
            --border-color: #E2E8F0; --border-glow: rgba(59, 130, 246, 0.2);
            --text-primary: #0F172A; --text-secondary: #475569;
            --terminal-hdr: #E2E8F0; --terminal-bg: #0F172A;
            --terminal-text: #4ADE80; --terminal-prompt: #94A3B8;
            --tag-bg: #EFF6FF; --tag-text: #2563EB;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--bg-main); color: var(--text-primary); line-height: 1.6; overflow: hidden; transition: background-color 0.3s, color 0.3s; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }

        .app-container { display: flex; flex-direction: column; height: 100vh; }
        .main-wrapper { display: flex; flex: 1; overflow: hidden; position: relative; }

        kbd { background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; font-family: inherit; font-size: 0.75rem; color: var(--text-secondary); box-shadow: 0 1px 1px rgba(0,0,0,0.2); }

        .top-navbar { height: var(--header-height); background-color: var(--bg-surface); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; z-index: 20; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .logo-wrapper { display: flex; align-items: center; gap: 16px; }
        .logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .logo-icon-bg { background: linear-gradient(135deg, var(--accent-primary), #8B5CF6); color: white; padding: 6px; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4); }
        .logo h1 { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; }
        .mobile-only { display: none; }

        .search-container { flex: 0 1 540px; position: relative; display: flex; align-items: center; }
        .search-icon { position: absolute; left: 16px; color: var(--text-secondary); pointer-events: none; }
        #searchInput { width: 100%; padding: 12px 16px 12px 42px; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-main); color: var(--text-primary); font-size: 0.95rem; transition: all 0.2s; }
        #searchInput:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        .search-shortcut { position: absolute; right: 12px; pointer-events: none; display: flex; gap: 4px; }

        .icon-btn { background: transparent; border: 1px solid transparent; color: var(--text-secondary); cursor: pointer; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { background-color: var(--bg-main); color: var(--text-primary); }

        .sidebar { width: var(--sidebar-width); background-color: var(--bg-surface); border-right: 1px solid var(--border-color); overflow-y: auto; padding: 24px 16px; flex-shrink: 0; display: flex; flex-direction: column; gap: 32px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 15; }
        .sidebar-section h3 { font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.05em; margin-bottom: 12px; padding-left: 12px; font-weight: 600; }
        .category-list { list-style: none; }
        .category-list li { padding: 10px 12px; margin-bottom: 4px; border-radius: 8px; cursor: pointer; color: var(--text-secondary); font-size: 0.95rem; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
        .category-list li:hover { background-color: var(--bg-surface-hover); color: var(--text-primary); }
        .category-list li.active { background-color: rgba(59, 130, 246, 0.1); color: var(--accent-primary); }
        .cat-icon { font-size: 1.1rem; opacity: 0.8; }
        .category-list li.active .cat-icon { opacity: 1; }

        .sidebar-overlay { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); z-index: 10; }

        .main-content { flex: 1; padding: 40px; overflow-y: auto; position: relative; scroll-behavior: smooth; }
        .content-header { margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-start; }
        .content-header h2 { font-size: 1.75rem; font-weight: 600; margin-bottom: 8px; }
        .subtitle { color: var(--text-secondary); font-size: 0.9rem; }
        .stat-badge { background: var(--bg-surface); border: 1px solid var(--border-color); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; font-weight: 500; }
        #commandCount { color: var(--text-primary); font-weight: 600; }

        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 24px; align-items: start; }
        .command-card { position: relative; border-radius: 12px; background: transparent; outline: none; z-index: 1; cursor: default; animation: fadeIn 0.4s ease-out forwards; }
        .command-card::before { content: ''; position: absolute; inset: 0; background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: inherit; z-index: -1; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-glow { position: absolute; inset: -1px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-primary), #8B5CF6); opacity: 0; transition: opacity 0.3s; z-index: -2; filter: blur(8px); }
        .command-card:hover::before, .command-card:focus-visible::before { transform: translateY(-4px); border-color: var(--border-glow); background-color: var(--bg-surface-hover); }
        .command-card:hover .card-glow, .command-card:focus-visible .card-glow { opacity: 0.5; transform: translateY(-4px); }
        .card-inner { padding: 24px; display: flex; flex-direction: column; gap: 16px; transition: transform 0.3s; }
        .command-card:hover .card-inner { transform: translateY(-4px); }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .card-meta { display: flex; align-items: center; gap: 10px; }
        .difficulty-badge { padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .difficulty-badge.essential { background-color: var(--badge-essential); }
        .difficulty-badge.intermediate { background-color: var(--badge-intermediate); }
        .difficulty-badge.advanced { background-color: var(--badge-advanced); }

        .category-label { color: var(--text-secondary); font-size: 0.85rem; font-weight: 500; }
        .fav-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); padding: 4px; border-radius: 50%; }
        .fav-btn:hover { color: #F59E0B; transform: scale(1.15); background: rgba(245, 158, 11, 0.1); }
        .fav-btn.active { color: #F59E0B; }
        .fav-btn.active svg { fill: #F59E0B; }

        .card-title { font-size: 1.2rem; font-weight: 600; letter-spacing: -0.01em; }
        .card-description { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; }

        .terminal-wrapper { border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .terminal-header { background: var(--terminal-hdr); height: 28px; display: flex; align-items: center; padding: 0 12px; gap: 8px; position: relative; }
        .term-dots { display: flex; gap: 6px; }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-dot.close { background: #FF5F56; }
        .term-dot.min { background: #FFBD2E; }
        .term-dot.max { background: #27C93F; }
        .term-title { position: absolute; left: 50%; transform: translateX(-50%); font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--text-secondary); }

        .terminal-body { background: var(--terminal-bg); padding: 16px; display: flex; align-items: flex-start; gap: 12px; position: relative; }
        .terminal-body .prompt { color: var(--terminal-prompt); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; font-weight: bold; user-select: none; }
        .command-text { font-family: 'JetBrains Mono', Consolas, monospace; font-size: 0.9rem; color: var(--terminal-text); white-space: pre-wrap; word-break: break-all; flex: 1; line-height: 1.5; }
        .copy-btn { background: rgba(255,255,255,0.05); border: 1px solid transparent; color: var(--text-secondary); cursor: pointer; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; margin-top: -4px; right: 12px; }
        .copy-btn:hover { background: rgba(59, 130, 246, 0.2); color: var(--accent-primary); }

        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
        .tags-container { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { background-color: var(--tag-bg); color: var(--tag-text); font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; font-weight: 500; }

        .expand-btn { background: none; border: none; color: var(--accent-primary); cursor: pointer; font-size: 0.9rem; font-weight: 500; padding: 6px 12px; border-radius: 6px; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .expand-btn:hover { background: rgba(59, 130, 246, 0.1); }
        .expand-btn svg { transition: transform 0.3s; }
        .expand-btn.open svg { transform: rotate(180deg); }

        .card-expanded-content { display: none; padding-top: 16px; border-top: 1px dashed var(--border-color); }
        .card-expanded-content.show { display: block; animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .notes-wrapper { background: rgba(59, 130, 246, 0.05); padding: 16px; border-radius: 8px; border-left: 3px solid var(--accent-primary); display: flex; gap: 12px; }
        .notes-icon { font-size: 1.2rem; flex-shrink: 0; }
        .expanded-notes { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }

        .empty-state { text-align: center; padding: 100px 20px; color: var(--text-secondary); animation: fadeIn 0.4s; }
        .empty-state.hidden { display: none; }
        .empty-icon svg { width: 64px; height: 64px; margin-bottom: 20px; opacity: 0.3; }
        .empty-state h3 { font-size: 1.5rem; margin-bottom: 8px; color: var(--text-primary); font-weight: 600; }

        .toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 100; display: flex; flex-direction: column; gap: 12px; pointer-events: none; }
        .toast { background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-primary); padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 500; box-shadow: 0 10px 25px rgba(0,0,0,0.3); animation: toastSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .toast svg { color: #10B981; }
        .toast.fadeOut { animation: toastFadeOut 0.3s ease forwards; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastSlideIn { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes toastFadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9); } }

        @media (max-width: 1100px) { .cards-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
            .cards-grid { grid-template-columns: 1fr; }
            .mobile-only { display: block; }
            .top-navbar { padding: 0 16px; }
            .sidebar { position: absolute; top: 0; bottom: 0; left: 0; transform: translateX(-100%); width: 280px; }
            .sidebar.open { transform: translateX(0); box-shadow: 4px 0 25px rgba(0,0,0,0.5); }
            .sidebar-overlay.active { display: block; }
            .main-content { padding: 24px 16px; }
            .search-container { flex: 1; margin: 0 16px; }
            .search-shortcut { display: none; }
        }
    </style>
</head>
<body class="dark-theme">
    <div class="app-container">
        <header class="top-navbar">
            <div class="logo-wrapper">
                <button id="mobileMenuBtn" class="icon-btn mobile-only" aria-label="Toggle Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
                </button>
                <a href="/" style="text-decoration:none; color:inherit;">
                    <div class="logo">
                        <div class="logo-icon-bg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                        </div>
                        <h1>K8s OpsFlow</h1>
                    </div>
                </a>
            </div>
            
            <div class="search-container">
                <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <input type="text" id="searchInput" placeholder="Search resources, commands, or tags...">
                <div class="search-shortcut"><kbd>Ctrl</kbd>+<kbd>K</kbd></div>
            </div>

            <div class="nav-actions">
                <button id="themeToggle" class="icon-btn theme-toggle" title="Toggle Theme">
                    <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
                </button>
            </div>
        </header>

        <div class="main-wrapper">
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-section">
                    <h3>Library</h3>
                    <ul id="categoryList" class="category-list">
                        <li class="active" data-category="all"><span class="cat-icon">📚</span> All Commands</li>
                        ${categoriesListHtml.join('\n                        ')}
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <h3>Your Workspace</h3>
                    <ul class="category-list" id="workspaceList">
                        <li data-category="Favorites" class="accent-fav"><span class="cat-icon">⭐</span> Favorites</li>
                        <li data-category="Recent" class="accent-rec"><span class="cat-icon">🕒</span> Recently Used</li>
                    </ul>
                </div>
            </aside>

            <div class="sidebar-overlay" id="sidebarOverlay"></div>

            <main class="main-content">
                <div class="content-header">
                    <div>
                        <h2>Command Reference</h2>
                        <p class="subtitle">Press <kbd>c</kbd> while hovering a card to quick-copy</p>
                    </div>
                    <div class="stat-badge"><span id="commandCount">0</span> elements</div>
                </div>
                
                <div id="cardsContainer" class="cards-grid"></div>
                
                <div id="emptyState" class="empty-state hidden">
                    <div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></div>
                    <h3>No results found</h3>
                    <p>Try adjusting your search query or filters.</p>
                </div>
            </main>
        </div>
    </div>

    <div id="toastContainer" class="toast-container"></div>

    <template id="cardTemplate">
        <div class="command-card" tabindex="0">
            <div class="card-glow"></div>
            <div class="card-inner">
                <div class="card-header">
                    <div class="card-meta"><span class="difficulty-badge"></span><span class="category-label"></span></div>
                    <button class="fav-btn" title="Toggle Favorite"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>
                </div>
                <h3 class="card-title"></h3>
                <p class="card-description"></p>
                <div class="terminal-wrapper">
                    <div class="terminal-header">
                        <div class="term-dots"><span class="term-dot close"></span><span class="term-dot min"></span><span class="term-dot max"></span></div>
                        <span class="term-title">bash — kubectl</span>
                    </div>
                    <div class="terminal-body">
                        <span class="prompt">$</span><code class="command-text"></code>
                        <button class="copy-btn" title="Copy to clipboard"><svg class="copy-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="tags-container"></div>
                    <button class="expand-btn"><span>Details</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                </div>
                <div class="card-expanded-content">
                    <div class="notes-wrapper"><div class="notes-icon">💡</div><p class="expanded-notes"></p></div>
                </div>
            </div>
        </div>
    </template>

    <script>
        const COMMANDS_DATA = ${commandsJson};

        const State = {
            favorites: JSON.parse(localStorage.getItem('opsflow_favs')) || [],
            recent: JSON.parse(localStorage.getItem('opsflow_recent')) || [],
            currentCategory: 'all',
            searchQuery: '',
            hoveredCardId: null
        };

        const DOM = {
            searchInput: document.getElementById('searchInput'),
            cardsContainer: document.getElementById('cardsContainer'),
            cardTemplate: document.getElementById('cardTemplate'),
            categoryList: document.getElementById('categoryList'),
            workspaceList: document.getElementById('workspaceList'),
            commandCount: document.getElementById('commandCount'),
            emptyState: document.getElementById('emptyState'),
            themeToggleBtn: document.getElementById('themeToggle'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            sidebar: document.getElementById('sidebar'),
            sidebarOverlay: document.getElementById('sidebarOverlay'),
            toastContainer: document.getElementById('toastContainer')
        };

        function init() {
            initTheme();
            setupEventListeners();
            renderCards();
        }

        function setupEventListeners() {
            DOM.searchInput.addEventListener('input', debounce((e) => {
                State.searchQuery = e.target.value.toLowerCase().trim();
                renderCards();
            }, 200));

            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); DOM.searchInput.focus(); }
                if (e.key === 'c' && document.activeElement !== DOM.searchInput && State.hoveredCardId) {
                    const cmdObj = COMMANDS_DATA.find(c => c.id === State.hoveredCardId);
                    if (cmdObj) copyCommand(cmdObj.command, cmdObj.id);
                }
                if (e.key === 'Escape') {
                    DOM.searchInput.value = ''; State.searchQuery = ''; DOM.searchInput.blur();
                    DOM.sidebar.classList.remove('open'); DOM.sidebarOverlay.classList.remove('active');
                    renderCards();
                }
            });

            const handleNavClick = (e) => {
                const li = e.target.closest('li');
                if (!li) return;
                document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
                State.currentCategory = li.dataset.category;
                if (window.innerWidth <= 768) toggleMobileSidebar();
                renderCards();
            };

            DOM.categoryList.addEventListener('click', handleNavClick);
            DOM.workspaceList.addEventListener('click', handleNavClick);
            DOM.themeToggleBtn.addEventListener('click', toggleTheme);
            DOM.mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
            DOM.sidebarOverlay.addEventListener('click', toggleMobileSidebar);
        }

        function renderCards() {
            const fragment = document.createDocumentFragment();
            let filtered = COMMANDS_DATA.filter(cmd => filterLogic(cmd));

            if (State.currentCategory === 'Recent') {
                filtered.sort((a, b) => State.recent.indexOf(a.id) - State.recent.indexOf(b.id));
            }

            DOM.cardsContainer.innerHTML = '';
            DOM.commandCount.textContent = filtered.length;

            if (filtered.length === 0) {
                DOM.emptyState.classList.remove('hidden');
            } else {
                DOM.emptyState.classList.add('hidden');
                filtered.forEach((cmd, index) => {
                    const node = createCardNode(cmd);
                    node.querySelector('.command-card').style.animationDelay = \`\${Math.min(index * 0.05, 0.5)}s\`;
                    fragment.appendChild(node);
                });
                DOM.cardsContainer.appendChild(fragment);
            }
        }

        function filterLogic(cmd) {
            const q = State.searchQuery;
            const matchSearch = !q || 
                cmd.title.toLowerCase().includes(q) ||
                cmd.command.toLowerCase().includes(q) ||
                cmd.description.toLowerCase().includes(q) ||
                cmd.tags.some(t => t.toLowerCase().includes(q));

            let matchCategory = true;
            if (State.currentCategory === 'Favorites') matchCategory = State.favorites.includes(cmd.id);
            else if (State.currentCategory === 'Recent') matchCategory = State.recent.includes(cmd.id);
            else if (State.currentCategory !== 'all') matchCategory = cmd.category === State.currentCategory;

            return matchSearch && matchCategory;
        }

        function createCardNode(cmd) {
            const clone = DOM.cardTemplate.content.cloneNode(true);
            const cardEl = clone.querySelector('.command-card');
            cardEl.dataset.id = cmd.id;

            cardEl.addEventListener('mouseenter', () => State.hoveredCardId = cmd.id);
            cardEl.addEventListener('mouseleave', () => { if (State.hoveredCardId === cmd.id) State.hoveredCardId = null; });

            const badge = clone.querySelector('.difficulty-badge');
            badge.textContent = cmd.difficulty;
            badge.classList.add(cmd.difficulty.toLowerCase());
            
            clone.querySelector('.category-label').textContent = String(cmd.category).split(' & ')[0];
            clone.querySelector('.card-title').textContent = cmd.title;
            clone.querySelector('.card-description').textContent = cmd.description;
            clone.querySelector('.command-text').textContent = cmd.command;
            clone.querySelector('.expanded-notes').innerHTML = cmd.notes;

            const tagsContainer = clone.querySelector('.tags-container');
            cmd.tags.forEach(tag => {
                const span = document.createElement('span'); span.className = 'tag'; span.textContent = tag;
                tagsContainer.appendChild(span);
            });

            clone.querySelector('.copy-btn').addEventListener('click', () => copyCommand(cmd.command, cmd.id));

            const expandBtn = clone.querySelector('.expand-btn');
            const expandedContent = clone.querySelector('.card-expanded-content');
            expandBtn.addEventListener('click', () => {
                expandedContent.classList.toggle('show');
                expandBtn.classList.toggle('open');
            });

            const favBtn = clone.querySelector('.fav-btn');
            if (State.favorites.includes(cmd.id)) favBtn.classList.add('active');
            favBtn.addEventListener('click', () => toggleFavorite(cmd.id, favBtn));

            return clone;
        }

        function copyCommand(text, id) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Command copied to clipboard!');
                addToRecent(id);
            });
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = \`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>\${message}</span>\`;
            DOM.toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('fadeOut');
                toast.addEventListener('animationend', () => toast.remove());
            }, 3000);
        }

        function addToRecent(id) {
            State.recent = [id, ...State.recent.filter(r => r !== id)].slice(0, 15);
            localStorage.setItem('opsflow_recent', JSON.stringify(State.recent));
            if (State.currentCategory === 'Recent') renderCards();
        }

        function toggleFavorite(id, btnElement) {
            const index = State.favorites.indexOf(id);
            if (index > -1) {
                State.favorites.splice(index, 1);
                btnElement.classList.remove('active');
            } else {
                State.favorites.push(id);
                btnElement.classList.add('active');
            }
            localStorage.setItem('opsflow_favs', JSON.stringify(State.favorites));
            if (State.currentCategory === 'Favorites') renderCards();
        }

        function toggleMobileSidebar() {
            DOM.sidebar.classList.toggle('open'); DOM.sidebarOverlay.classList.toggle('active');
        }

        function initTheme() {
            const saved = localStorage.getItem('opsflow_theme') || 'dark';
            if (saved === 'light') document.body.classList.add('light-theme');
        }

        function toggleTheme() {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('opsflow_theme', isLight ? 'light' : 'dark');
        }

        function debounce(func, wait) {
            let timeout;
            return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
        }

        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>`;

fs.writeFileSync(outputPath, htmlTemplate, 'utf8');
console.log('Successfully upgraded the Kubernetes Cheat Sheet to OpsFlow App!');