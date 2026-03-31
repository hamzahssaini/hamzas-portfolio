const fs = require('fs');
let b = fs.readFileSync('c:/dora-metrics/scripts/build_k8s_page.js', 'utf8');

const regex = /<div class="code-box".*?<\/div>/g;
const newStr = `<div class="term-window" onclick="copyCmd(this)" data-raw="\${cmd.command.replace(/"/g, '&quot;')}">
                                        <div class="term-header">
                                            <div class="term-buttons"><span style="background-color: #ef4444;"></span><span style="background-color: #eab308;"></span><span style="background-color: #22c55e;"></span></div>
                                            <div class="term-title">BASH</div>
                                        </div>
                                        <div class="term-body">
                                            <span class="prompt">$</span> \${formattedCmd}
                                        </div>
                                    </div>`;

b = b.replace(regex, newStr);

fs.writeFileSync('c:/dora-metrics/scripts/build_k8s_page.js', b);
