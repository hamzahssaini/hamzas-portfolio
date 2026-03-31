const fs = require('fs');
let code = fs.readFileSync('c:\\dora-metrics\\scripts\\build_k8s_page.js', 'utf8');

const oldCss = `        /* Terminal Window Stylings */
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
        }`;

const newCss = `        /* Command Block Stylings */
        .cmd-block {
            background: #0f172a; /* Sleek dark theme */
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            width: 100%;
            max-width: 550px;
            position: relative;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #1e293b;
            padding: 18px 24px;
            overflow: hidden;
        }
        .cmd-block:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
            border-color: #38bdf8;
        }
        .cmd-block:hover::after {
            content: 'Copy';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 16px;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-family: var(--font-sans);
            font-weight: 600;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.2s;
        }
        .cmd-content {
            color: #f8fafc;
            font-family: var(--font-mono);
            font-size: 14.5px;
            word-break: break-all;
            line-height: 1.5;
            padding-right: 60px; /* Room for copy badge */
        }
        .cmd-content > .prompt {
            color: #38bdf8;
            margin-right: 12px;
            user-select: none;
            font-weight: 700;
            opacity: 0.8;
        }`;

const oldHtml = `                                <td class="cmd-cell">
                                    <div class="term-window" onclick="copyCmd(this)" data-raw="\\$\\{rawCmdEscaped\\}">
                                        <div class="term-header">
                                            <div class="term-buttons"><span></span><span></span><span></span></div>
                                        </div>
                                        <div class="term-body">
                                            <span class="prompt">$</span>\\$\\{formattedCmd\\}
                                        </div>
                                    </div>
                                </td>`;

const newHtml = `                                <td class="cmd-cell">
                                    <div class="cmd-block" onclick="copyCmd(this)" data-raw="\\$\\{rawCmdEscaped\\}">
                                        <div class="cmd-content">
                                            <span class="prompt">$</span>\\$\\{formattedCmd\\}
                                        </div>
                                    </div>
                                </td>`;

let updatedCode = code.replace(oldCss, newCss);
updatedCode = updatedCode.replace(oldHtml.replace(/\\$\\{/g, '${').replace(/\\}/g, '}'), newHtml.replace(/\\$\\{/g, '${').replace(/\\}/g, '}'));

fs.writeFileSync('c:\\dora-metrics\\scripts\\build_k8s_page.js', updatedCode, 'utf8');
console.log('Script updated successfully.');
