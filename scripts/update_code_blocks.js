const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../public/engineering-notes/posts');

const newCSS = `
        /* Code Blocks */
        pre {
            background: var(--code-bg);
            padding: 24px;
            border-radius: 12px;
            overflow-x: auto;
            margin: 32px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .code-header + pre {
            margin-top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        pre code, .table-code-block code {
            font-family: var(--font-mono);
            font-size: 14px;
            color: var(--code-text);
            line-height: 1.6;
            background: transparent;
            padding: 0;
            border: none;
        }
        .code-header {
            display: flex;
            align-items: center;
            background: #0f172a;
            color: #94a3b8;
            padding: 12px 16px;
            border-radius: 12px 12px 0 0;
            font-family: var(--font-mono);
            font-size: 13px;
            font-weight: 600;
            margin-top: 32px;
            margin-bottom: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .code-header::before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ef4444;
            box-shadow: 16px 0 0 #eab308, 32px 0 0 #22c55e;
            margin-right: 48px;
        }
        p code, li code, td code:not(.block-code) {
            background: #f1f5f9;
            color: #0f172a;
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 14px;
            border: 1px solid #e2e8f0;
        }
`;

fs.readdirSync(postsDir).forEach(file => {
    if (!file.endsWith('.html')) return;
    
    let filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update CSS
    // Let's find the /* Code Blocks */ section and replace it until </style> or next /* ... */ or media query
    // A simpler way: we just find "/* Code Blocks */" and replace everything until "@media" or "</style>"
    const cssStart = content.indexOf('/* Code Blocks */');
    if (cssStart !== -1) {
        let cssEnd = content.indexOf('@media', cssStart);
        if (cssEnd === -1) cssEnd = content.indexOf('</style>', cssStart);
        if (cssEnd !== -1) {
            // keep the media query or </style> intact
            const before = content.substring(0, cssStart);
            const after = content.substring(cssEnd);
            content = before + newCSS.trim() + '\n\n        ' + after.trim();
        }
    }

    // 2. Add <div class="code-header">Bash</div> before <pre><code> if not already there
    // We regex match <pre> that doesn't have a code-header before it.
    // Actually, we can just replace all `<pre>` with the block if it doesn't already have one preceded in the text.
    
    // Split by <pre>
    const parts = content.split(/<pre(\s*[^>]*)>/g);
    let newHtml = parts[0];
    for (let i = 1; i < parts.length; i += 2) {
        const preAttrs = parts[i];
        const rest = parts[i+1];
        
        // Check if the previous part already ends with a code-header
        if (newHtml.trim().endsWith('</div>') && newHtml.includes('class="code-header"')) {
            // Already has a header likely, just put <pre> back
            newHtml += '<pre' + preAttrs + '>' + rest;
        } else {
            // Look into the code block to see if it's shell/bash or something else.
            // If it contains "kubectl", "podman", "docker", "curl", "sudo", let's call it "Bash"
            // If it contains "yaml" or "apiVersion" or "kind:", call it "YAML"
            let type = "Terminal";
            const codeSnippet = rest.substring(0, Math.min(200, rest.indexOf('</pre>'))).toLowerCase();
            
            if (codeSnippet.includes('kubectl ') || codeSnippet.includes('sudo ') || codeSnippet.includes('curl ') || codeSnippet.includes('podman ') || codeSnippet.includes('helm ') || codeSnippet.includes('terraform ')) {
                type = "Bash";
            } else if (codeSnippet.includes('apiversion:') || codeSnippet.includes('kind:') || file.includes('redis')) {
                type = "YAML";
            }
            
            // Actually, we can just default to "Terminal" for safety or "Bash".
            if (!file.includes('gitlab-runner-dind-setup')) {
                newHtml += '<div class="code-header">' + type + '</div>\n<pre' + preAttrs + '>' + rest;
            } else {
                 newHtml += '<pre' + preAttrs + '>' + rest;
            }
        }
    }
    
    if (!file.includes('gitlab-runner-dind-setup')) {
        fs.writeFileSync(filePath, newHtml, 'utf8');
        console.log('Updated', file);
    }
});
