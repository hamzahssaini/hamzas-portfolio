const fs = require('fs');

const inputInfo = fs.readFileSync('c:\\dora-metrics\\k8s.txt', 'utf8');

// Parse input correctly
const lines = inputInfo.split('\n').map(l => l.trim()).filter(l => l);
let grouped = {};
let currentCat = null;
let currentCmd = null;

for (let line of lines) {
    if (line.startsWith('🔹')) {
        currentCat = line.replace('🔹', '').trim();
        if (!grouped[currentCat]) grouped[currentCat] = [];
    } else if (line.match(/^\d+\./)) {
        if (currentCmd && currentCat) {
            grouped[currentCat].push(currentCmd);
        }
        
        // Find the boundary: usually " – " or " - " or just the first dash
        let dashIndex = line.indexOf(' – ');
        if (dashIndex === -1) dashIndex = line.indexOf(' - ');
        
        if (dashIndex !== -1) {
            let cmdPart = line.substring(0, dashIndex).trim();
            let descPart = line.substring(dashIndex + 3).trim();
            
            let numMatch = cmdPart.match(/^(\d+)\./);
            let num = numMatch ? numMatch[1] : '';
            let rawCmd = cmdPart.replace(/^\d+\./, '').trim();
            
            currentCmd = { number: num, command: rawCmd, description: descPart };
        } else {
            // fallback
            let numMatch = line.match(/^(\d+)\./);
            let num = numMatch ? numMatch[1] : '';
            let rawCmd = line.replace(/^\d+\./, '').trim();
            currentCmd = { number: num, command: rawCmd, description: '' };
        }
    } else {
        // Continues description or command
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

// HTML template
let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kubernetes Cheat Sheet: 200 Essential Commands</title>
    <link rel="stylesheet" href="/assets/css/styles.css">

    <style>
        :root {
            --bg: #f9fafb;
            --surface: #ffffff;
            --text-main: #1f2937;
            --text-muted: #6b7280;
            --accent: #326ce5; /* K8s Blue */
            --accent-hover: #2151b1;
            --border: #e5e7eb;
            --code-bg: #1e293b;
            --code-text: #e2e8f0;
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            --font-mono: 'Consolas', 'Fira Code', monospace;
            --container-width: 1100px;
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-sans);
            margin: 0;
            -webkit-font-smoothing: antialiased;
        }

        nav {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 30px 24px;
            display: flex;
            align-items: center;
        }

        nav a {
            color: var(--text-muted);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            font-size: 15px;
            transition: color 0.2s;
        }
        
        nav a:hover { color: var(--accent); }

        main {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 24px 80px;
        }

        header {
            text-align: center;
            margin-bottom: 50px;
        }

        h1 {
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: var(--text-main);
            margin-bottom: 12px;
        }

        .subtitle {
            font-size: 18px;
            color: var(--text-muted);
            max-width: 600px;
            margin: 0 auto;
        }

        /* Controls / Filtering */
        .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--surface);
            padding: 20px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            margin-bottom: 30px;
            border: 1px solid var(--border);
            gap: 16px;
            position: sticky;
            top: 20px;
            z-index: 100;
        }

        .search-box {
            position: relative;
            flex-grow: 1;
            max-width: 500px;
        }

        .search-box input {
            width: 100%;
            padding: 12px 16px 12px 42px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.2s;
            box-sizing: border-box;
        }

        .search-box input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(50, 108, 229, 0.15);
        }

        .search-box svg {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }

        .stats {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-muted);
            background: var(--bg);
            padding: 8px 16px;
            border-radius: 20px;
        }

        /* Cheat Sheet Layout */
        .sheet-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .category-section {
            background: var(--surface);
            border-radius: 16px;
            border: 1px solid var(--border);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
            overflow: hidden;
        }

        .category-header {
            background: #f1f5f9;
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            font-weight: 700;
            font-size: 18px;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .table-wrap {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th, td {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            vertical-align: middle;
        }

        th {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: #f8fafc;
        }

        tr:last-child td { border-bottom: none; }
        tr:hover { background: #f8fafc; }

        .cmd-cell { width: 55%; }
        .desc-cell { width: 45%; color: var(--text-main); font-size: 15.5px; font-weight: 500; line-height: 1.5; }

        /* Terminal Window Stylings */
        .term-window {
            background: #0f172a; /* True Dark slate */
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 550px;
            position: relative;
            cursor: pointer;
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #1e293b;
        }
        .term-window:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        .term-window:hover::after {
            content: 'Click to Copy';
            position: absolute;
            top: 7px;
            right: 14px;
            color: #94a3b8;
            font-size: 12px;
            font-family: var(--font-sans);
            font-weight: 500;
            pointer-events: none;
            opacity: 0.8;
        }
        .term-header {
            background: #1e293b; /* Mac-like Lighter header */
            padding: 10px 14px;
            display: flex;
            align-items: center;
        }
        .term-buttons {
            display: flex;
            gap: 6px;
            margin-right: 12px;
        }
        .term-buttons span {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            display: inline-block;
        }
        .term-buttons span:nth-child(1) { background-color: #ef4444; }
        .term-buttons span:nth-child(2) { background-color: #eab308; }
        .term-buttons span:nth-child(3) { background-color: #22c55e; }
        .term-body {
            padding: 16px 18px;
            color: #e2e8f0;
            font-family: var(--font-mono);
            font-size: 14px;
            word-break: break-all;
            line-height: 1.5;
        }
        .term-body > .prompt {
            color: #38bdf8;
            margin-right: 10px;
            user-select: none;
            font-weight: 700;
        }

        .cmd-number {
            display: inline-block;
            width: 28px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            font-family: var(--font-mono);
        }

        .hidden { display: none !important; }

        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
        }
        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }

    </style>
</head>
<body>

    <nav>
        <a href="/engineering-notes/archive.html">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Notes Archive
        </a>
    </nav>

    <main>
        <header>
            <div style="display:inline-block; padding: 12px; background: rgba(50,108,229,0.1); border-radius: 16px; margin-bottom: 20px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h1>The Ultimate Kubernetes Cheat Sheet</h1>
            <p class="subtitle">A master reference of 200 meticulously categorized commands for cluster administrators and DevOps engineers.</p>
        </header>

        <div class="controls">
            <div class="search-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="searchInput" placeholder="Search for commands, resources, flags... (e.g. 'daemonset' or '--force')" autocomplete="off" spellcheck="false" />
            </div>
            <div class="stats" id="counterDisplay">Showing 200 commands</div>
        </div>

        <div class="sheet-container" id="cheatSheet">
`;

for (let cat in grouped) {
    html += `
            <div class="category-section" data-category="${cat.toLowerCase()}">
                <div class="category-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    ${cat}
                </div>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 60px;">#</th>
                                <th class="cmd-cell">Command execution</th>
                                <th class="desc-cell">Description</th>
                            </tr>
                        </thead>
                        <tbody>`;
    grouped[cat].forEach(cmd => {
        let formattedCmd = cmd.command.replace(/(\<[^\>]+\>)/g, '<span style="color:#fcd34d;">$1</span>');
        
        // Escape quotes to put into the raw onclick copy
        let rawCmdEscaped = cmd.command.replace(/'/g, '&apos;').replace(/"/g, '&quot;');

        html += `
                            <tr class="cmd-row" data-search="${(cmd.command + " " + cmd.description).toLowerCase().replace(/"/g, '&quot;')}">
                                <td><span class="cmd-number">${cmd.number}</span></td>
                                <td class="cmd-cell">
                                    <div class="term-window" onclick="copyCmd(this)" data-raw="${rawCmdEscaped}">
                                        <div class="term-header">
                                            <div class="term-buttons"><span></span><span></span><span></span></div>
                                        </div>
                                        <div class="term-body">
                                            <span class="prompt">$</span>${formattedCmd}
                                        </div>
                                    </div>
                                </td>
                                <td class="desc-cell">${cmd.description}</td>
                            </tr>`;
    });
    html += `
                        </tbody>
                    </table>
                </div>
            </div>`;
}

html += `
        </div>
    </main>

    <div id="toast" class="toast">Command copied to clipboard!</div>

    <script>
        // Copy to clipboard
        function copyCmd(el) {
            let textToCopy = el.getAttribute('data-raw');
            // convert &apos; and &quot; back
            textToCopy = textToCopy.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2500);
            });
        }

        // Fast filtering
        const searchInput = document.getElementById('searchInput');
        const rows = document.querySelectorAll('.cmd-row');
        const categories = document.querySelectorAll('.category-section');
        const counterDisplay = document.getElementById('counterDisplay');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            rows.forEach(row => {
                const text = row.getAttribute('data-search');
                if (text.includes(query)) {
                    row.classList.remove('hidden');
                    visibleCount++;
                } else {
                    row.classList.add('hidden');
                }
            });

            // Hide empty categories
            categories.forEach(cat => {
                const visibleRows = cat.querySelectorAll('.cmd-row:not(.hidden)');
                if (visibleRows.length === 0) {
                    cat.classList.add('hidden');
                } else {
                    cat.classList.remove('hidden');
                }
            });

            counterDisplay.textContent = \`Showing \${visibleCount} command\${visibleCount !== 1 ? 's' : ''}\`;
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('c:\\dora-metrics\\public\\engineering-notes\\posts\\kubernetes-cheat-sheet.html', html, 'utf8');
console.log('Successfully reverted to Mac Terminal style HTML!');
