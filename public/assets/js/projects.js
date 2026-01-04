/*__LEGACY_DISABLED__
(() => {
  'use strict';

  // Elite, outcome-driven Projects section
  // - 3 cards max
  // - Fast scan: bullets only, no long paragraphs
  // - EN/FR supported via localStorage('lang') and main.js hook
  // - Architecture opens in a clean modal (zoom/download/close)

  const UI = {
    en: {
      capabilities: 'Capabilities',
      impact: 'Impact',
      technologies: 'Technologies',
      viewArchitecture: 'View Architecture',
      modalZoomOut: 'Zoom out',
      modalZoomIn: 'Zoom in',
      modalDownload: 'Download',
      modalClose: 'Close',
      modalAlt: 'Architecture diagram'
    },
    fr: {
      capabilities: 'Capacités',
      impact: 'Impact',
      technologies: 'Technologies',
      viewArchitecture: "Voir l'architecture",
      modalZoomOut: 'Dézoomer',
      modalZoomIn: 'Zoomer',
      modalDownload: 'Télécharger',
      modalClose: 'Fermer',
      modalAlt: "Schéma d'architecture"
    }
  };

  // Data rules enforced by structure:
  // - context <= 12 words (keep it very short)
  // - max 3 bullets for capabilities
  // - max 3 bullets for impact (metric emphasized)
  // - max 4 technologies
  const PROJECTS = [
    {
      id: 'mission-devops',
      title: {
        en: 'Gated Microservice Releases',
        fr: 'Releases microservices gatées'
      },
      context: {
        en: 'Repeatable CI/CD with deploy gates on Azure.',
        fr: 'CI/CD reproductible avec gates de déploiement sur Azure.'
      },
      capabilities: {
        en: ['Release automation', 'Deployment gates', 'Repeatable builds'],
        fr: ['Automatisation des releases', 'Gates de déploiement', 'Builds reproductibles']
      },
      impact: {
        en: [
          { metric: '2', text: 'delivery paths standardized (.NET + React)' },
          { metric: '3', text: 'stage gated pipeline (build → test → deploy)' },
          { metric: '1', text: 'production target (Azure Web App)' }
        ],
        fr: [
          { metric: '2', text: 'flux de livraison standardisés (.NET + React)' },
          { metric: '3', text: 'étapes de pipeline (build → tests → déploiement)' },
          { metric: '1', text: 'cible de production (Azure Web App)' }
        ]
      },
      technologies: ['GitLab CI', 'Azure Web App', '.NET', 'React'],
      architectureImage: '/images/mission-devops-arch.png'
    },
    {
      id: 'azure-hub-spoke',
      title: {
        en: 'Secure Hybrid Connectivity',
        fr: 'Connectivité hybride sécurisée'
      },
      context: {
        en: 'Hub-and-spoke segmentation with encrypted site-to-site VPN.',
        fr: 'Segmentation hub-and-spoke avec VPN site-à-site chiffré.'
      },
      capabilities: {
        en: ['Network segmentation', 'Encrypted hybrid VPN', 'Infrastructure as Code'],
        fr: ['Segmentation réseau', 'VPN hybride chiffré', 'Infrastructure as Code']
      },
      impact: {
        en: [
          { metric: '50%', text: 'faster delivery via automated provisioning' },
          { metric: '1', text: 'encrypted IPSec tunnel for hybrid traffic' },
          { metric: '1', text: 'central hub for routing / inspection' }
        ],
        fr: [
          { metric: '50%', text: 'de livraison plus rapide via provisionnement automatisé' },
          { metric: '1', text: 'tunnel IPSec chiffré pour le trafic hybride' },
          { metric: '1', text: 'hub central pour routage / inspection' }
        ]
      },
      technologies: ['Azure', 'Terraform', 'VPN Gateway', 'Azure Firewall'],
      architectureImage: '/images/hub-spoke-arch.png'
    },
    {
      id: 'ansible-project',
      title: {
        en: 'Repeatable AWS Server Baselines',
        fr: 'Baselines serveurs AWS reproductibles'
      },
      context: {
        en: 'Idempotent provisioning with encrypted secrets and drift control.',
        fr: 'Provisionnement idempotent avec secrets chiffrés et contrôle du drift.'
      },
      capabilities: {
        en: ['Configuration baselines', 'Secrets encryption', 'OS hardening'],
        fr: ['Baselines de configuration', 'Chiffrement des secrets', 'Durcissement OS']
      },
      impact: {
        en: [
          { metric: '4', text: 'core services standardized per baseline' },
          { metric: '1', text: 'vault workflow for encrypted secrets' },
          { metric: '1', text: 'repeatable run to reduce configuration drift' }
        ],
        fr: [
          { metric: '4', text: 'services standardisés par baseline' },
          { metric: '1', text: 'workflow Vault pour secrets chiffrés' },
          { metric: '1', text: 'exécution reproductible pour réduire le drift' }
        ]
      },
      technologies: ['Ansible', 'AWS EC2', 'Linux', 'Ansible Vault'],
      architectureImage: '/images/ansible-project-arch.png'
    }
  ];

  function getLang() {
    const raw = (localStorage.getItem('lang') || 'fr').toLowerCase();
    return raw === 'en' ? 'en' : 'fr';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function ensureModal() {
    if (document.getElementById('archModalOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'archModalOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Architecture');

    overlay.innerHTML = `
      <div class="modal-controls" aria-label="Modal controls">
        <button type="button" class="control-icon-btn" data-action="zoomOut" aria-label="Zoom out" title="Zoom out">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
        </button>
        <button type="button" class="control-icon-btn" data-action="zoomIn" aria-label="Zoom in" title="Zoom in">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
        <a class="control-icon-btn" data-action="download" aria-label="Download" title="Download" download>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
        </a>
        <button type="button" class="control-icon-btn close-btn" data-action="close" aria-label="Close" title="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal-content">
        <div class="modal-image-container">
          <img class="modal-image" id="archModalImage" alt="" />
        </div>
        <div class="modal-caption" id="archModalCaption"></div>
      </div>
    `;

    document.body.appendChild(overlay);

    const img = overlay.querySelector('#archModalImage');
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function applyTransform() {
      if (!img) return;
      img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      img.style.cursor = scale > 1 ? 'grab' : 'default';
    }

    function resetView() {
      scale = 1;
      translateX = 0;
      translateY = 0;
      applyTransform();
    }

    function setOpen(open) {
      overlay.classList.toggle('open', !!open);
      if (!open) resetView();
    }

    function close() {
      setOpen(false);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    overlay.querySelectorAll('[data-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-action');
        if (!action) return;
        if (action === 'close') {
          close();
          return;
        }
        if (action === 'zoomIn') {
          scale = Math.min(4, +(scale + 0.2).toFixed(2));
          applyTransform();
          return;
        }
        if (action === 'zoomOut') {
          scale = Math.max(1, +(scale - 0.2).toFixed(2));
          applyTransform();
        }
      });
    });

    if (img) {
      img.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
        e.preventDefault();
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
        applyTransform();
      });
    }

    window.__openArchitectureModal = (src, caption, lang) => {
      const l = lang === 'en' ? 'en' : 'fr';
      const strings = UI[l];

      const zoomOutBtn = overlay.querySelector('[data-action="zoomOut"]');
      const zoomInBtn = overlay.querySelector('[data-action="zoomIn"]');
      const downloadBtn = overlay.querySelector('[data-action="download"]');
      const closeBtn = overlay.querySelector('[data-action="close"]');
      if (zoomOutBtn) {
        zoomOutBtn.setAttribute('aria-label', strings.modalZoomOut);
        zoomOutBtn.title = strings.modalZoomOut;
      }
      if (zoomInBtn) {
        zoomInBtn.setAttribute('aria-label', strings.modalZoomIn);
        zoomInBtn.title = strings.modalZoomIn;
      }
      if (downloadBtn) {
        downloadBtn.setAttribute('aria-label', strings.modalDownload);
        downloadBtn.title = strings.modalDownload;
      }
      if (closeBtn) {
        closeBtn.setAttribute('aria-label', strings.modalClose);
        closeBtn.title = strings.modalClose;
      }

      const captionEl = overlay.querySelector('#archModalCaption');
      const imgEl = overlay.querySelector('#archModalImage');
      if (imgEl) {
        imgEl.src = src;
        imgEl.alt = strings.modalAlt;
      }
      if (downloadBtn && src) {
        downloadBtn.setAttribute('href', src);
        downloadBtn.setAttribute('download', (caption || 'architecture') + '.png');
      }
      if (captionEl) captionEl.textContent = caption || '';

      resetView();
      setOpen(true);
      overlay.tabIndex = -1;
      overlay.focus();
    };
  }

  function render(lang) {
    const root = document.getElementById('projects-container');
    if (!root) return;

    const l = lang === 'en' ? 'en' : 'fr';
    const strings = UI[l];

    root.innerHTML = `
      <div class="elite-projects" aria-label="Projects">
        <div class="elite-projects-grid"></div>
      </div>
    `;

    const grid = root.querySelector('.elite-projects-grid');
    if (!grid) return;

    PROJECTS.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'elite-card';

      const context = (p.context && p.context[l]) ? p.context[l] : '';
      const cap = (p.capabilities && p.capabilities[l]) ? p.capabilities[l] : [];
      const impact = (p.impact && p.impact[l]) ? p.impact[l] : [];

      const capItems = cap.slice(0, 3).map(li => `<li>${escapeHtml(li)}</li>`).join('');
      const impactItems = impact.slice(0, 3).map(row => {
        const metric = row && row.metric ? String(row.metric) : '';
        const text = row && row.text ? String(row.text) : '';
        return `<li><span class="metric">${escapeHtml(metric)}</span><span class="metric-text">${escapeHtml(text)}</span></li>`;
      }).join('');

      const tech = Array.isArray(p.technologies) ? p.technologies.slice(0, 4) : [];
      const techTags = tech.map(t => `<span class="elite-tag">${escapeHtml(t)}</span>`).join('');

      card.innerHTML = `
        <h3 class="elite-title">${escapeHtml(p.title[l] || '')}</h3>
        ${context ? `<p class="elite-context">${escapeHtml(context)}</p>` : ''}

        <div class="elite-section">
          <div class="elite-label">${escapeHtml(strings.capabilities)}</div>
          <ul class="elite-list">${capItems}</ul>
        </div>

        <div class="elite-impact">
          <div class="elite-label">${escapeHtml(strings.impact)}</div>
          <ul class="elite-impact-list">${impactItems}</ul>
        </div>

        <div class="elite-footer">
          <div class="elite-tech" aria-label="${escapeHtml(strings.technologies)}">${techTags}</div>
          <button type="button" class="elite-cta" data-arch="${escapeHtml(p.architectureImage || '')}" data-caption="${escapeHtml(p.title[l] || '')}">
            ${escapeHtml(strings.viewArchitecture)}
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll('.elite-cta').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-arch') || '';
        const caption = btn.getAttribute('data-caption') || '';
        if (!src) return;
        ensureModal();
        if (typeof window.__openArchitectureModal === 'function') {
          window.__openArchitectureModal(src, caption, l);
        }
      });
    });
  }

  function init() {
    render(getLang());
    // Hook used by main.js language toggle
    window.updateProjectsLanguage = (nextLang) => {
      render((nextLang || '').toLowerCase() === 'en' ? 'en' : 'fr');
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

            // Data rules (enforced by content):
            // - context: <= 12 words
            // - max 3 capabilities
            // - max 3 impact bullets, with a highlighted metric
            // - max 4 technologies
            const PROJECTS = [
                {
                    id: 'mission-devops',
                    title: {
                        en: 'Gated Microservice Releases',
                        fr: 'Releases microservices gatées'
                    },
                    context: {
                        en: 'Repeatable CI/CD with deploy gates on Azure.',
                        fr: 'CI/CD reproductible avec gates de déploiement sur Azure.'
                    },
                    capabilities: {
                        en: ['Release automation', 'Deployment gates', 'Repeatable builds'],
                        fr: ['Automatisation des releases', 'Gates de déploiement', 'Builds reproductibles']
                    },
                    impact: {
                        en: [
                            { metric: '2', text: 'delivery paths standardized (.NET + React)' },
                            { metric: '3', text: 'stage gated pipeline (build → test → deploy)' },
                            { metric: '1', text: 'production target (Azure Web App)' }
                        ],
                        fr: [
                            { metric: '2', text: 'flux de livraison standardisés (.NET + React)' },
                            { metric: '3', text: 'étapes de pipeline (build → tests → déploiement)' },
                            { metric: '1', text: 'cible de production (Azure Web App)' }
                        ]
                    },
                    technologies: ['GitLab CI', 'Azure Web App', '.NET', 'React'],
                    architectureImage: '/images/mission-devops-arch.png'
                },
                {
                    id: 'azure-hub-spoke',
                    title: {
                        en: 'Secure Hybrid Connectivity',
                        fr: 'Connectivité hybride sécurisée'
                    },
                    context: {
                        en: 'Hub-and-spoke segmentation with encrypted site-to-site VPN.',
                        fr: 'Segmentation hub-and-spoke avec VPN site-à-site chiffré.'
                    },
                    capabilities: {
                        en: ['Network segmentation', 'Encrypted hybrid VPN', 'Infrastructure as Code'],
                        fr: ['Segmentation réseau', 'VPN hybride chiffré', 'Infrastructure as Code']
                    },
                    impact: {
                        en: [
                            { metric: '50%', text: 'faster delivery via automated provisioning' },
                            { metric: '1', text: 'encrypted IPSec tunnel for hybrid traffic' },
                            { metric: '1', text: 'central hub for routing / inspection' }
                        ],
                        fr: [
                            { metric: '50%', text: 'de livraison plus rapide via provisionnement automatisé' },
                            { metric: '1', text: 'tunnel IPSec chiffré pour le trafic hybride' },
                            { metric: '1', text: 'hub central pour routage / inspection' }
                        ]
                    },
                    technologies: ['Azure', 'Terraform', 'VPN Gateway', 'Azure Firewall'],
                    architectureImage: '/images/hub-spoke-arch.png'
                },
                {
                    id: 'ansible-project',
                    title: {
                        en: 'Repeatable AWS Server Baselines',
                        fr: 'Baselines serveurs AWS reproductibles'
                    },
                    context: {
                        en: 'Idempotent provisioning with encrypted secrets and drift control.',
                        fr: 'Provisionnement idempotent avec secrets chiffrés et contrôle du drift.'
                    },
                    capabilities: {
                        en: ['Configuration baselines', 'Secrets encryption', 'OS hardening'],
                        fr: ['Baselines de configuration', 'Chiffrement des secrets', 'Durcissement OS']
                    },
                    impact: {
                        en: [
                            { metric: '4', text: 'core services standardized per baseline' },
                            { metric: '1', text: 'vault workflow for encrypted secrets' },
                            { metric: '1', text: 'repeatable run to reduce configuration drift' }
                        ],
                        fr: [
                            { metric: '4', text: 'services standardisés par baseline' },
                            { metric: '1', text: 'workflow Vault pour secrets chiffrés' },
                            { metric: '1', text: 'exécution reproductible pour réduire le drift' }
                        ]
                    },
                    technologies: ['Ansible', 'AWS EC2', 'Linux', 'Ansible Vault'],
                    architectureImage: '/images/ansible-project-arch.png'
                }
            ];

            function getLang() {
                const raw = (localStorage.getItem('lang') || 'fr').toLowerCase();
                return raw === 'en' ? 'en' : 'fr';
            }

            function escapeHtml(value) {
                return String(value)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            }

            function ensureModal() {
                if (document.getElementById('archModalOverlay')) return;

                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                overlay.id = 'archModalOverlay';
                overlay.setAttribute('role', 'dialog');
                overlay.setAttribute('aria-modal', 'true');
                overlay.setAttribute('aria-label', 'Architecture');

                overlay.innerHTML = `
              <div class="modal-controls" aria-label="Modal controls">
                <button type="button" class="control-icon-btn" data-action="zoomOut" aria-label="Zoom out" title="Zoom out">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                </button>
                <button type="button" class="control-icon-btn" data-action="zoomIn" aria-label="Zoom in" title="Zoom in">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                </button>
                <a class="control-icon-btn" data-action="download" aria-label="Download" title="Download" download>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
                </a>
                <button type="button" class="control-icon-btn close-btn" data-action="close" aria-label="Close" title="Close">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                </button>
              </div>
              <div class="modal-content">
                <div class="modal-image-container">
                  <img class="modal-image" id="archModalImage" alt="" />
                </div>
                <div class="modal-caption" id="archModalCaption"></div>
              </div>
            `;

                document.body.appendChild(overlay);

                const img = overlay.querySelector('#archModalImage');
                let scale = 1;
                let translateX = 0;
                let translateY = 0;
                let isDragging = false;
                let startX = 0;
                let startY = 0;

                function applyTransform() {
                    if (!img) return;
                    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                }

                function resetView() {
                    scale = 1;
                    translateX = 0;
                    translateY = 0;
                    applyTransform();
                }

                function setOpen(open) {
                    overlay.classList.toggle('open', !!open);
                    if (!open) resetView();
                }

                function close() { setOpen(false); }

                overlay.addEventListener('click', (e) => {
                    // Only close when clicking the backdrop (not the controls/image)
                    if (e.target === overlay) close();
                });

                overlay.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') close();
                });

                overlay.querySelectorAll('[data-action]').forEach((el) => {
                    el.addEventListener('click', (e) => {
                        const action = el.getAttribute('data-action');
                        if (!action) return;
                        if (action === 'close') { close(); return; }
                        if (action === 'zoomIn') { scale = Math.min(4, +(scale + 0.2).toFixed(2)); applyTransform(); return; }
                        if (action === 'zoomOut') { scale = Math.max(1, +(scale - 0.2).toFixed(2)); applyTransform(); return; }
                    });
                });

                if (img) {
                    img.addEventListener('mousedown', (e) => {
                        if (scale <= 1) return;
                        isDragging = true;
                        startX = e.clientX - translateX;
                        startY = e.clientY - translateY;
                        img.style.cursor = 'grabbing';
                        e.preventDefault();
                    });
                    window.addEventListener('mousemove', (e) => {
                        if (!isDragging) return;
                        translateX = e.clientX - startX;
                        translateY = e.clientY - startY;
                        applyTransform();
                    });
                    window.addEventListener('mouseup', () => {
                        isDragging = false;
                        if (img) img.style.cursor = scale > 1 ? 'grab' : 'default';
                    });
                }

                // Expose a small API for opening.
                window.__openArchitectureModal = (src, caption, lang) => {
                    const l = (lang === 'en') ? 'en' : 'fr';
                    const strings = UI[l];

                    const zoomOutBtn = overlay.querySelector('[data-action="zoomOut"]');
                    const zoomInBtn = overlay.querySelector('[data-action="zoomIn"]');
                    const downloadBtn = overlay.querySelector('[data-action="download"]');
                    const closeBtn = overlay.querySelector('[data-action="close"]');
                    if (zoomOutBtn) { zoomOutBtn.setAttribute('aria-label', strings.modalZoomOut); zoomOutBtn.title = strings.modalZoomOut; }
                    if (zoomInBtn) { zoomInBtn.setAttribute('aria-label', strings.modalZoomIn); zoomInBtn.title = strings.modalZoomIn; }
                    if (downloadBtn) { downloadBtn.setAttribute('aria-label', strings.modalDownload); downloadBtn.title = strings.modalDownload; }
                    if (closeBtn) { closeBtn.setAttribute('aria-label', strings.modalClose); closeBtn.title = strings.modalClose; }

                    const captionEl = overlay.querySelector('#archModalCaption');
                    const imgEl = overlay.querySelector('#archModalImage');
                    if (imgEl) {
                        imgEl.src = src;
                        imgEl.alt = strings.modalAlt;
                        imgEl.style.cursor = 'default';
                    }
                    if (downloadBtn && src) {
                        downloadBtn.setAttribute('href', src);
                        downloadBtn.setAttribute('download', (caption || 'architecture') + '.png');
                    }
                    if (captionEl) captionEl.textContent = caption || '';

                    setOpen(true);
                    overlay.tabIndex = -1;
                    overlay.focus();
                };
            }

            function render(lang) {
                const root = document.getElementById('projects-container');
                if (!root) return;

                const l = (lang === 'en') ? 'en' : 'fr';
                const strings = UI[l];

                root.innerHTML = `
              <div class="elite-projects" aria-label="Projects">
                <div class="elite-projects-grid"></div>
              </div>
            `;

                const grid = root.querySelector('.elite-projects-grid');
                if (!grid) return;

                PROJECTS.forEach((p) => {
                    const card = document.createElement('article');
                    card.className = 'elite-card';

                    const context = (p.context && p.context[l]) ? p.context[l] : '';
                    const cap = (p.capabilities && p.capabilities[l]) ? p.capabilities[l] : [];
                    const impact = (p.impact && p.impact[l]) ? p.impact[l] : [];

                    const capItems = cap.slice(0, 3).map(li => `<li>${escapeHtml(li)}</li>`).join('');
                    const impactItems = impact.slice(0, 3).map(row => {
                        const metric = row && row.metric ? String(row.metric) : '';
                        const text = row && row.text ? String(row.text) : '';
                        return `<li><span class="metric">${escapeHtml(metric)}</span><span class="metric-text">${escapeHtml(text)}</span></li>`;
                    }).join('');

                    const tech = Array.isArray(p.technologies) ? p.technologies.slice(0, 4) : [];
                    const techTags = tech.map(t => `<span class="elite-tag">${escapeHtml(t)}</span>`).join('');

                    card.innerHTML = `
                <h3 class="elite-title">${escapeHtml(p.title[l] || '')}</h3>
                ${context ? `<p class="elite-context">${escapeHtml(context)}</p>` : ''}

                <div class="elite-section">
                  <div class="elite-label">${escapeHtml(strings.capabilities)}</div>
                  <ul class="elite-list">${capItems}</ul>
                </div>

                <div class="elite-impact">
                  <div class="elite-label">${escapeHtml(strings.impact)}</div>
                  <ul class="elite-impact-list">${impactItems}</ul>
                </div>

                <div class="elite-footer">
                  <div class="elite-tech" aria-label="${escapeHtml(strings.technologies)}">${techTags}</div>
                  <button type="button" class="elite-cta" data-arch="${escapeHtml(p.architectureImage || '')}" data-caption="${escapeHtml(p.title[l] || '')}">
                    ${escapeHtml(strings.viewArchitecture)}
                  </button>
                </div>
              `;

                    grid.appendChild(card);
                });

                // Bind CTA handlers.
                grid.querySelectorAll('.elite-cta').forEach((btn) => {
                    btn.addEventListener('click', () => {
                        const src = btn.getAttribute('data-arch') || '';
                        const caption = btn.getAttribute('data-caption') || '';
                        if (!src) return;
                        ensureModal();
                        if (typeof window.__openArchitectureModal === 'function') {
                            window.__openArchitectureModal(src, caption, l);
                        }
                    });
                });
            }

            function init() {
                const lang = getLang();
                render(lang);

                // Hook for main.js language toggle.
                window.updateProjectsLanguage = (nextLang) => {
                    render((nextLang || '').toLowerCase() === 'en' ? 'en' : 'fr');
                };
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();
/* __LEGACY_DISABLED__
                "Some refactor effort to fit managed services"
            ],
            fr: [
                "Contraintes PaaS vs contrôle total sur VMs",
                "Migration nécessite un cutover/rollback maîtrisé",
                "Refactor parfois nécessaire pour services managés"
            ]
        },
        architectureTypes: ["Migration", "PaaS", "CI/CD"],
        categories: ["cloudAzure", "cicd", "infrastructure"],
        location: "Casablanca, Maroc",
        date: "Août 2025 – Oct 2025",
        architecture: "GitHub Actions -> Azure App Service + MySQL",
        technologies: ["Azure App Service", "GitHub Actions", "Azure MySQL", "Node.js"],
        architectureImage: "/images/migration-arch.png"
    },
    {
        id: "ansible-project",
        tier: 2,
        primaryTitle: {
            en: "Repeatable Server Baselines on AWS",
            fr: "Baselines serveurs reproductibles sur AWS"
        },
        secondaryTitle: {
            en: "Ansible automation with dynamic inventory + secrets encryption",
            fr: "Automatisation Ansible (inventaire dynamique) + chiffrement des secrets"
        },
        contextLine: {
            en: "Operations intent: eliminate manual config drift and enforce consistent hardening",
            fr: "Intention ops : éliminer le drift manuel et imposer un hardening cohérent"
        },
        capabilities: {
            en: [
                "Configuration standardization",
                "Secrets management",
                "OS hardening",
                "Repeatable provisioning",
                "Fleet consistency"
            ],
            fr: [
                "Standardisation de configuration",
                "Gestion des secrets",
                "Durcissement OS",
                "Provisionnement reproductible",
                "Cohérence de flotte"
            ]
        },
        problem: {
            en: [
                "Manual server configuration was slow and error-prone",
                "Inconsistent baselines increased security drift"
            ],
            fr: [
                "La configuration manuelle était lente et sujette aux erreurs",
                "Des baselines incohérentes augmentaient le drift de sécurité"
            ]
        },
        solutionBullets: {
            en: [
                "Automated EC2 provisioning/config through Ansible roles and dynamic inventory",
                "Encrypted secrets via Ansible Vault to avoid plaintext credentials",
                "Standardized service setup for Nginx, Docker, MySQL, Redis"
            ],
            fr: [
                "Automatisation EC2 via rôles Ansible et inventaire dynamique",
                "Secrets chiffrés via Ansible Vault (évite les identifiants en clair)",
                "Standardisation Nginx, Docker, MySQL, Redis"
            ]
        },
        impactBullets: {
            en: [
                "Standardized **4** core services per host baseline",
                "Encrypted secrets with **1** vault workflow",
                "Reduced drift with **1** repeatable configuration run"
            ],
            fr: [
                "Standardisation de **4** services par baseline serveur",
                "Secrets chiffrés via **1** workflow Vault",
                "Réduction du drift via **1** exécution reproductible"
            ]
        },
        keyDecisions: {
            en: [
                "Ansible roles for composable service baselines",
                "Dynamic inventory to avoid manual host lists",
                "Vault to keep secrets out of plaintext config"
            ],
            fr: [
                "Rôles Ansible pour des baselines composables",
                "Inventaire dynamique pour éviter les listes manuelles",
                "Vault pour éviter les secrets en clair"
            ]
        },
        tradeoffs: {
            en: [
                "Requires discipline around idempotency and role versioning",
                "Secrets rotation must be operationalized",
                "Hardening can impact legacy app compatibility"
            ],
            fr: [
                "Nécessite discipline sur l'idempotence et versioning",
                "La rotation des secrets doit être opérationnalisée",
                "Le hardening peut impacter la compatibilité legacy"
            ]
        },
        architectureTypes: ["Infrastructure automation", "Secrets management"],
        categories: ["cloudAws", "devops", "infrastructure"],
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        architecture: "Ansible Node -> AWS API -> EC2 (Nginx, Docker, DBs)",
        technologies: ["Ansible", "AWS EC2", "IAM", "Linux", "MySQL", "Redis", "Nginx"],
        architectureImage: "/images/ansible-project-arch.png"
    },
    {
        id: "pfe-bairoutech",
        tier: 2,
        primaryTitle: {
            en: "Container Orchestration for Reliable Deployments",
            fr: "Orchestration conteneurs pour déploiements fiables"
        },
        secondaryTitle: {
            en: "Kubernetes: ingress routing + probes + persistent storage",
            fr: "Kubernetes : ingress + sondes + stockage persistant"
        },
        contextLine: {
            en: "Production intent: reduce downtime and improve availability during traffic spikes",
            fr: "Intention production : réduire l'indisponibilité et améliorer la disponibilité en pic"
        },
        capabilities: {
            en: [
                "Health-based availability",
                "Rolling deployments",
                "Ingress routing",
                "Stateful persistence",
                "Operational resilience"
            ],
            fr: [
                "Disponibilité via health checks",
                "Déploiements progressifs",
                "Routage Ingress",
                "Persistance stateful",
                "Résilience opérationnelle"
            ]
        },
        problem: {
            en: [
                "Traffic spikes exposed scalability limits",
                "Deployments caused downtime without health-based rollouts"
            ],
            fr: [
                "Les pics de trafic exposaient des limites de scalabilité",
                "Les déploiements causaient des interruptions sans rollouts basés sur la santé"
            ]
        },
        solutionBullets: {
            en: [
                "Containerized Node.js/MongoDB and orchestrated with Kubernetes",
                "Enforced liveness/readiness probes to gate rollouts",
                "Configured Ingress and PVC for routing + persistence"
            ],
            fr: [
                "Conteneurisation Node.js/MongoDB et orchestration Kubernetes",
                "Sondes liveness/readiness pour gate les rollouts",
                "Ingress + PVC pour routage et persistance"
            ]
        },
        impactBullets: {
            en: [
                "**−40%** deployment time",
                "Gated rollouts with **2** health checks (liveness + readiness)",
                "Persisted state via **1** PVC-backed datastore"
            ],
            fr: [
                "**−40%** de temps de déploiement",
                "Rollouts gatés via **2** sondes (liveness + readiness)",
                "Persistance via **1** stockage PVC"
            ]
        },
        keyDecisions: {
            en: [
                "Probes to prevent unhealthy pods from receiving traffic",
                "Ingress routing to standardize entrypoint",
                "PVC for stateful persistence where required"
            ],
            fr: [
                "Sondes pour éviter d'envoyer du trafic vers des pods non sains",
                "Ingress pour standardiser le point d'entrée",
                "PVC pour la persistance stateful si nécessaire"
            ]
        },
        tradeoffs: {
            en: [
                "Kubernetes adds operational complexity (cluster lifecycle)",
                "Stateful workloads require careful storage design",
                "Ingress/probes require good app health endpoints"
            ],
            fr: [
                "Kubernetes ajoute de la complexité opérationnelle",
                "Le stateful impose un design stockage soigné",
                "Ingress/sondes nécessitent de bons endpoints de health"
            ]
        },
        architectureTypes: ["Kubernetes", "Ingress", "Containers"],
        categories: ["kubernetes", "devops", "infrastructure"],
        location: "Fès, Maroc",
        date: "Févr 2025 – Juin 2025",
        architecture: "K8s Cluster -> Ingress -> Svc -> Pods -> PVC",
        technologies: ["Kubernetes", "Docker", "Node.js", "MongoDB"],
        architectureImage: "/images/k8s-arch.png"
    },
    {
        id: "rag-chatbot",
        tier: 2,
        primaryTitle: {
            en: "Searchable Knowledge via RAG Pipeline",
            fr: "Connaissance searchable via pipeline RAG"
        },
        secondaryTitle: {
            en: "Blob ingestion → chunking/embeddings → vector index",
            fr: "Ingestion Blob → chunking/embeddings → index vectoriel"
        },
        contextLine: {
            en: "Production intent: reduce time-to-answer with centralized retrieval and predictable ingestion",
            fr: "Intention production : réduire le time-to-answer via ingestion et retrieval maîtrisés"
        },
        capabilities: {
            en: [
                "Document ingestion",
                "Vector retrieval",
                "Data extraction",
                "API orchestration",
                "Knowledge centralization"
            ],
            fr: [
                "Ingestion documentaire",
                "Recherche vectorielle",
                "Extraction de données",
                "Orchestration API",
                "Centralisation de connaissance"
            ]
        },
        problem: {
            en: [
                "Unstructured documents (PDF/DOCX) slowed information retrieval",
                "Manual searching introduced inconsistency and rework"
            ],
            fr: [
                "Des documents non structurés (PDF/DOCX) ralentissaient la recherche",
                "La recherche manuelle introduisait de l'incohérence et du rework"
            ]
        },
        solutionBullets: {
            en: [
                "Built an ingestion pipeline: storage, chunking, embeddings, and vector indexing",
                "Orchestrated retrieval + response generation through a Node.js backend"
            ],
            fr: [
                "Pipeline d'ingestion : stockage, chunking, embeddings, indexation vectorielle",
                "Orchestration retrieval + génération via backend Node.js"
            ]
        },
        impactBullets: {
            en: [
                "Indexed **2** formats (PDF + DOCX) into **1** vector index",
                "Built a **4-step** ingestion path (blob → chunk → embed → index)",
                "Delivered retrieval via **1** backend API surface"
            ],
            fr: [
                "Indexation de **2** formats (PDF + DOCX) dans **1** index vectoriel",
                "Pipeline d'ingestion en **4 étapes** (blob → chunk → embed → index)",
                "Retrieval exposé via **1** API backend"
            ]
        },
        keyDecisions: {
            en: [
                "Deterministic ingestion pipeline to keep indexing predictable",
                "Vector search to avoid brittle keyword-only lookup",
                "Backend orchestration to control prompts and retrieval"
            ],
            fr: [
                "Pipeline d'ingestion déterministe pour une indexation prévisible",
                "Recherche vectorielle pour éviter le tout-keyword",
                "Orchestration backend pour contrôler prompts et retrieval"
            ]
        },
        tradeoffs: {
            en: [
                "Index freshness depends on ingestion cadence",
                "Quality depends on chunking and retrieval tuning",
                "Higher cost/latency than simple keyword search"
            ],
            fr: [
                "Fraîcheur de l'index dépend de la cadence d'ingestion",
                "Qualité dépend du chunking et du tuning retrieval",
                "Coût/latence supérieurs à une recherche keyword simple"
            ]
        },
        architectureTypes: ["RAG", "Vector search"],
        categories: ["aiRag", "cloudAzure"],
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        architecture: "Docs -> Blob -> AI Search (Index) -> OpenAI",
        technologies: ["Azure OpenAI", "Azure AI Search", "Node.js", "Bootstrap"],
        architectureImage: "/images/rag-arch.png"
    },
    {
        id: "bairoutech-admin",
        tier: 3,
        primaryTitle: {
            en: "Enterprise Identity & Endpoint Operations",
            fr: "Opérations identité & postes en entreprise"
        },
        secondaryTitle: {
            en: "AD/GPO + DNS/DHCP + VPN + MFA",
            fr: "AD/GPO + DNS/DHCP + VPN + MFA"
        },
        contextLine: {
            en: "Operations intent: reduce incidents through standardized access and baseline policy",
            fr: "Intention ops : réduire les incidents via accès standardisé et politiques baseline"
        },
        capabilities: {
            en: [
                "Identity administration",
                "Policy enforcement",
                "Secure remote access",
                "Operational support",
                "Incident reduction"
            ],
            fr: [
                "Administration identité",
                "Application des politiques",
                "Accès distant sécurisé",
                "Support opérationnel",
                "Réduction d'incidents"
            ]
        },
        problem: {
            en: [
                "User support and infrastructure operations needed repeatable administration",
                "Security controls required consistent enforcement"
            ],
            fr: [
                "Le support et l'exploitation nécessitaient une administration reproductible",
                "Les contrôles de sécurité demandaient une application cohérente"
            ]
        },
        solutionBullets: {
            en: [
                "Administered AD, DNS, DHCP and enforced workstation policy via GPO",
                "Configured Site-to-Site VPN and MFA to strengthen access security"
            ],
            fr: [
                "Administration AD, DNS, DHCP et politiques postes via GPO",
                "Configuration VPN Site-à-Site et MFA pour renforcer la sécurité d'accès"
            ]
        },
        impactBullets: {
            en: [
                "Standardized **3** core services (AD + DNS + DHCP)",
                "Hardened access with **2** controls (VPN + MFA)",
                "Enforced **1** workstation baseline via GPO"
            ],
            fr: [
                "Standardisation de **3** services (AD + DNS + DHCP)",
                "Accès renforcé via **2** contrôles (VPN + MFA)",
                "Baseline poste appliquée via **1** GPO"
            ]
        },
        keyDecisions: {
            en: [
                "Central identity for consistent access control",
                "GPO baselines to reduce endpoint drift",
                "MFA + VPN to enforce secure remote access"
            ],
            fr: [
                "Identité centralisée pour un contrôle d'accès cohérent",
                "Baselines GPO pour réduire le drift poste",
                "MFA + VPN pour sécuriser l'accès distant"
            ]
        },
        tradeoffs: {
            en: [
                "Policy enforcement can impact user experience",
                "MFA adds friction but reduces compromise risk",
                "Operational rigor required for directory hygiene"
            ],
            fr: [
                "Application des politiques peut impacter l'expérience utilisateur",
                "MFA ajoute de la friction mais réduit le risque",
                "Rigueur nécessaire pour l'hygiène de l'annuaire"
            ]
        },
        architectureTypes: ["Identity", "Remote access"],
        categories: ["systems", "infrastructure"],
        location: "",
        date: "",
        architecture: "AD + Microsoft 365 Hybrid",
        technologies: ["Active Directory", "DNS/DHCP", "GPO", "VPN", "M365"],
        architectureImage: "/images/admin-arch.png"
    },
    {
        id: "ifmotica-network",
        tier: 3,
        primaryTitle: {
            en: "Office Network & Workstation Readiness",
            fr: "Réseau bureau & préparation des postes"
        },
        secondaryTitle: {
            en: "Switching/routing + Windows domain tooling",
            fr: "Switching/routage + outillage domaine Windows"
        },
        contextLine: {
            en: "Operations intent: predictable onboarding and consistent endpoint configuration",
            fr: "Intention ops : onboarding prévisible et configuration postes cohérente"
        },
        capabilities: {
            en: [
                "Network deployment",
                "Endpoint readiness",
                "Admin automation",
                "Operational setup",
                "User onboarding"
            ],
            fr: [
                "Déploiement réseau",
                "Préparation des postes",
                "Automatisation admin",
                "Mise en place opérationnelle",
                "Onboarding utilisateurs"
            ]
        },
        problem: {
            en: [
                "New office setup required end-to-end network and workstation configuration",
                "Manual admin tasks slowed rollout and increased inconsistencies"
            ],
            fr: [
                "Un nouveau bureau nécessitait un déploiement réseau et la configuration des postes",
                "Les tâches admin manuelles ralentissaient le déploiement et créaient des incohérences"
            ]
        },
        solutionBullets: {
            en: [
                "Deployed Windows 10/11 and configured routers/switches for office connectivity",
                "Created PowerShell tools to support AD administration and repeatable tasks"
            ],
            fr: [
                "Déploiement Windows 10/11 et configuration routeurs/switchs",
                "Outils PowerShell pour faciliter l'administration AD et répéter les tâches"
            ]
        },
        impactBullets: {
            en: [
                "Delivered endpoints across **2** OS versions (Windows 10/11)",
                "Implemented **2** network layers (switching + routing)",
                "Reduced admin toil via **1** PowerShell toolkit"
            ],
            fr: [
                "Déploiement postes sur **2** OS (Windows 10/11)",
                "Mise en place de **2** couches réseau (switching + routage)",
                "Réduction du toil admin via **1** toolkit PowerShell"
            ]
        },
        keyDecisions: {
            en: [
                "Standardized workstation images for predictable onboarding",
                "Layered network setup for office reliability",
                "Automation scripts for repeatable admin tasks"
            ],
            fr: [
                "Images postes standardisées pour un onboarding prévisible",
                "Réseau structuré en couches pour fiabilité bureau",
                "Scripts d'automatisation pour tâches admin répétables"
            ]
        },
        tradeoffs: {
            en: [
                "Physical networks constrain change velocity",
                "Standard images require update cadence",
                "Automation needs ongoing maintenance as tooling evolves"
            ],
            fr: [
                "Le réseau physique limite la vélocité de changement",
                "Les images standard nécessitent une cadence de mise à jour",
                "L'automatisation demande maintenance continue"
            ]
        },
        architectureTypes: ["Network deployment", "Windows domain"],
        categories: ["systems", "infrastructure"],
        location: "Fès, Maroc",
        date: "",
        architecture: "Physical Topology + Windows Domain",
        technologies: ["Windows 10/11", "Networking", "PowerShell", "Support"],
        architectureImage: "/images/network-arch.png"
    }
];

// --- Icons (SVG Strings) ---
const icons = {
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    external: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    zoomIn: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`,
    zoomOut: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
};

// --- State ---
let activeCategory = "all";
let searchQuery = "";
let currentLang = localStorage.getItem("lang") || "fr";
let currentModalProject = null;
let currentScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

// --- DOM ---
const container = document.getElementById("projects-container");

function getLabels() {
    return I18N[currentLang] || I18N.fr;
}

function getLoc(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object") return field[currentLang] || field.en || field.fr || "";
    return "";
}

function escapeHtml(v) {
    return String(v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatMetric(text) {
    // Allow the data to mark metrics explicitly with **...**
    return String(text).replace(/\*\*(.*?)\*\* /g, '<span class="metric-highlight">$1</span>');
}

function asLocalizedList(field) {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === "object") return field[currentLang] || field.en || field.fr || [];
    return [];
}

function renderBulletListItems(items, max = 3) {
    return (items || [])
        .slice(0, max)
        .map((t) => `<li>${formatMetric(escapeHtml(t))}</li>`)
        .join("");
}

function projectCategories(project) {
    return Array.isArray(project.categories) ? project.categories : [];
}

function getSearchText(project) {
    const asText = (x) => {
        if (!x) return "";
        if (typeof x === "string") return x;
        if (Array.isArray(x)) return x.join(" ");
        if (typeof x === "object") {
            const en = x.en ? (Array.isArray(x.en) ? x.en.join(" ") : String(x.en)) : "";
            const fr = x.fr ? (Array.isArray(x.fr) ? x.fr.join(" ") : String(x.fr)) : "";
            return `${en} ${fr}`;
        }
        return "";
    };

    return [
        asText(project.primaryTitle),
        asText(project.secondaryTitle),
        asText(project.contextLine),
        asText(project.capabilities),
        asText(project.problem),
        asText(project.solutionBullets),
        asText(project.impactBullets),
        asText(project.architecture),
        ...(project.architectureTypes || []),
        ...(project.technologies || [])
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

function init() {
    if (!container) return;

    // Expose language hook for main.js
    window.updateProjectsLanguage = (lang) => {
        currentLang = lang || "fr";
        localStorage.setItem("lang", currentLang);
        updateUIForLanguage();
    };

    const wrapper = document.createElement("div");
    wrapper.className = "projects-wrapper";

    wrapper.appendChild(renderFilters());

    const gridEl = document.createElement("div");
    gridEl.className = "projects-grid";
    gridEl.id = "projects-grid-root";
    wrapper.appendChild(gridEl);

    container.innerHTML = "";
    container.appendChild(wrapper);

    renderProjects();

    if (!document.getElementById("project-modal")) {
        createModal();
    }
}

function renderFilters() {
    const labels = getLabels();

    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";

    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";
    searchWrapper.innerHTML = `
        <div class="search-icon">${icons.search}</div>
        <input
            type="search"
            class="search-input"
            id="project-search-input"
            placeholder="${escapeHtml(labels.searchPlaceholder)}"
            aria-label="${escapeHtml(labels.searchPlaceholder)}"
            value="${escapeHtml(searchQuery)}"
        />
    `;
    const input = searchWrapper.querySelector("input");
    input.addEventListener("input", (e) => {
        searchQuery = e.target.value || "";
        renderProjects();
    });

    const categoriesWrapper = document.createElement("div");
    categoriesWrapper.className = "categories-wrapper";
    categoriesWrapper.setAttribute("role", "toolbar");
    categoriesWrapper.setAttribute("aria-label", labels.categoriesLabel);

    CATEGORY_DEFS.forEach((cat) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `category-btn ${activeCategory === cat.key ? "active" : ""}`;
        btn.textContent = (cat.label && (cat.label[currentLang] || cat.label.fr || cat.label.en)) || cat.key;
        btn.setAttribute("data-category", cat.key);
        btn.setAttribute("aria-pressed", activeCategory === cat.key ? "true" : "false");
        btn.addEventListener("click", () => {
            activeCategory = cat.key;
            updateCategoryButtons(categoriesWrapper);
            renderProjects();
        });
        categoriesWrapper.appendChild(btn);
    });

    filtersContainer.appendChild(searchWrapper);
    filtersContainer.appendChild(categoriesWrapper);
    return filtersContainer;
}

function updateCategoryButtons(wrapper) {
    wrapper.querySelectorAll(".category-btn").forEach((btn) => {
        const key = btn.getAttribute("data-category");
        const active = key === activeCategory;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
}

function updateUIForLanguage() {
    const labels = getLabels();
    const searchInput = document.getElementById("project-search-input");
    if (searchInput) {
        searchInput.placeholder = labels.searchPlaceholder;
        searchInput.setAttribute("aria-label", labels.searchPlaceholder);
    }

    const catWrapper = document.querySelector(".categories-wrapper");
    if (catWrapper) {
        catWrapper.querySelectorAll(".category-btn").forEach((btn) => {
            const key = btn.getAttribute("data-category");
            const def = CATEGORY_DEFS.find((d) => d.key === key);
            if (!def) return;
            btn.textContent = (def.label && (def.label[currentLang] || def.label.fr || def.label.en)) || key;
        });
        updateCategoryButtons(catWrapper);
    }

    renderProjects();
}

function renderProjects() {
    const gridRoot = document.getElementById("projects-grid-root");
    if (!gridRoot) return;

    const labels = getLabels();
    const query = (searchQuery || "").trim().toLowerCase();

    const filtered = projectsData.filter((project) => {
        const matchesCategory = activeCategory === "all" ? true : projectCategories(project).includes(activeCategory);
        if (!query) return matchesCategory;
        return matchesCategory && getSearchText(project).includes(query);
    });

    gridRoot.innerHTML = "";

    if (filtered.length === 0) {
        gridRoot.innerHTML = `
            <div class="no-results">
                <p>${escapeHtml(labels.noResults)}</p>
                <button type="button" class="clear-filter-btn" id="clear-filter">${escapeHtml(labels.clearFilter)}</button>
            </div>
        `;
        const clearBtn = gridRoot.querySelector("#clear-filter");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                activeCategory = "all";
                searchQuery = "";
                const input = document.getElementById("project-search-input");
                if (input) input.value = "";
                const catWrapper = document.querySelector(".categories-wrapper");
                if (catWrapper) updateCategoryButtons(catWrapper);
                renderProjects();
            });
        }
        return;
    }

    filtered.forEach((project, index) => {
        const card = createProjectCard(project);
        gridRoot.appendChild(card);
        setTimeout(() => card.classList.add("visible"), index * 80);
    });
}

function createProjectCard(project) {
    const labels = getLabels();

    const titlePrimary = getLoc(project.primaryTitle);
    const subtitle = getLoc(project.secondaryTitle);
    const capabilities = asLocalizedList(project.capabilities);
    const impact = asLocalizedList(project.impactBullets);
    const technologies = Array.isArray(project.technologies) ? project.technologies : [];

    const el = document.createElement("article");
    el.className = `project-card tier-${project.tier || 3}`;
    el.setAttribute("role", "article");

    const hasArchitecture = !!(project.architectureImage && String(project.architectureImage).trim());

    el.innerHTML = `
        <div class="card-glow"></div>
        <div class="card-content project-card-compact">
            <div class="card-title-block">
                <h3 class="card-title clamp-2" title="${escapeHtml(titlePrimary)}">${escapeHtml(titlePrimary)}</h3>
                <p class="card-subtitle" title="${escapeHtml(subtitle)}">${escapeHtml(subtitle)}</p>
            </div>

            <div class="card-essentials">
                <div class="card-block">
                    <div class="section-label">${escapeHtml(labels.capabilities)}</div>
                    <ul class="bullet-list bullet-compact">
                        ${renderBulletListItems(capabilities, 3)}
                    </ul>
                </div>

                <div class="card-block impact-box impact-compact">
                    <div class="impact-label">${escapeHtml(labels.impact)}</div>
                    <ul class="impact-list bullet-compact">
                        ${renderBulletListItems(impact, 3)}
                    </ul>
                </div>
            </div>

            <div class="card-footer">
                <div class="tag-row" aria-label="${escapeHtml(labels.technologies)}">
                    ${(technologies || []).slice(0, 5).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("")}
                </div>

                <button type="button" class="view-diagram-btn view-diagram-link" ${hasArchitecture ? "" : "disabled aria-disabled=\"true\""}>
                    <span>${escapeHtml(labels.viewArchitecture)}</span>
                </button>
            </div>
        </div>
    `;

    const viewBtn = el.querySelector(".view-diagram-btn");
    if (viewBtn) {
        viewBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (viewBtn.disabled) return;
            openModal(project);
        });
    }

    return el;
}

// --- Modal ---

function createModal() {
    const labels = getLabels();
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "project-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    modal.innerHTML = `
        <div class="modal-shell" role="document">
            <div class="modal-panel">
                <div class="modal-head">
                    <div class="modal-project-title" id="modal-project-title"></div>
                    <div class="modal-project-subtitle" id="modal-project-subtitle"></div>
                </div>

                <div class="modal-sections">
                    <div class="modal-section">
                        <div class="section-label">${escapeHtml(labels.problem)}</div>
                        <ul class="bullet-list" id="modal-problem"></ul>
                    </div>
                    <div class="modal-section">
                        <div class="section-label">${escapeHtml(labels.keyDecisions)}</div>
                        <ul class="bullet-list" id="modal-decisions"></ul>
                    </div>
                    <div class="modal-section">
                        <div class="section-label">${escapeHtml(labels.toolsServices)}</div>
                        <div class="tag-row" id="modal-tools"></div>
                    </div>
                    <div class="modal-section">
                        <div class="section-label">${escapeHtml(labels.tradeoffs)}</div>
                        <ul class="bullet-list" id="modal-tradeoffs"></ul>
                    </div>
                </div>
            </div>

            <div class="modal-figure">
                <div class="modal-controls">
                    <button class="control-icon-btn" id="modal-zoom-out" title="${escapeHtml(labels.modalZoomOut)}" aria-label="${escapeHtml(labels.modalZoomOut)}">${icons.zoomOut}</button>
                    <button class="control-icon-btn" id="modal-zoom-in" title="${escapeHtml(labels.modalZoomIn)}" aria-label="${escapeHtml(labels.modalZoomIn)}">${icons.zoomIn}</button>
                    <button class="control-icon-btn" id="modal-download" title="${escapeHtml(labels.modalDownload)}" aria-label="${escapeHtml(labels.modalDownload)}">${icons.download}</button>
                    <button class="control-icon-btn close-btn" id="modal-close" title="${escapeHtml(labels.modalClose)}" aria-label="${escapeHtml(labels.modalClose)}">${icons.close}</button>
                </div>
                <div class="modal-image-container" id="modal-img-container">
                    <img src="" alt="${escapeHtml(labels.modalAlt)}" class="modal-image" id="modal-img">
                </div>
                <div class="modal-caption" id="modal-caption"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector("#modal-close");
    const zoomInBtn = modal.querySelector("#modal-zoom-in");
    const zoomOutBtn = modal.querySelector("#modal-zoom-out");
    const downloadBtn = modal.querySelector("#modal-download");
    const containerEl = modal.querySelector("#modal-img-container");

    const close = () => closeModal();

    modal.addEventListener("click", (e) => {
        if (e.target === modal) close();
    });
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        close();
    });
    zoomInBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateScale(0.5);
    });
    zoomOutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateScale(-0.5);
    });
    downloadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        downloadImage();
    });

    // Pan
    containerEl.addEventListener("mousedown", (e) => {
        const img = document.getElementById("modal-img");
        if (!img) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        containerEl.style.cursor = "grabbing";
        e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    });
    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        containerEl.style.cursor = "grab";
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            close();
        }
    });
}

function openModal(project) {
    currentModalProject = project;
    currentScale = 1;
    translateX = 0;
    translateY = 0;

    const modal = document.getElementById("project-modal");
    const img = document.getElementById("modal-img");
    const caption = document.getElementById("modal-caption");
    const titleEl = document.getElementById("modal-project-title");
    const subtitleEl = document.getElementById("modal-project-subtitle");
    const problemEl = document.getElementById("modal-problem");
    const decisionsEl = document.getElementById("modal-decisions");
    const toolsEl = document.getElementById("modal-tools");
    const tradeoffsEl = document.getElementById("modal-tradeoffs");
    if (!modal || !img || !caption || !titleEl || !subtitleEl || !problemEl || !decisionsEl || !toolsEl || !tradeoffsEl) return;

    img.src = project.architectureImage || "/assets/images/placeholder-arch.png";
    titleEl.textContent = getLoc(project.primaryTitle) || project.id;
    subtitleEl.textContent = getLoc(project.secondaryTitle) || "";
    caption.textContent = getLoc(project.primaryTitle) || project.id;

    const problem = asLocalizedList(project.problem);
    const decisions = asLocalizedList(project.keyDecisions);
    const tradeoffs = asLocalizedList(project.tradeoffs);
    const tech = Array.isArray(project.technologies) ? project.technologies : [];

    problemEl.innerHTML = renderBulletListItems(problem, 3);
    decisionsEl.innerHTML = renderBulletListItems(decisions, 4);
    tradeoffsEl.innerHTML = renderBulletListItems(tradeoffs, 4);
    toolsEl.innerHTML = tech.slice(0, 8).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("");

    updateImageTransform();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    currentModalProject = null;
}

function updateScale(delta) {
    const next = currentScale + delta;
    if (next < 0.5 || next > 5) return;
    currentScale = next;
    updateImageTransform();
}

function updateImageTransform() {
    const img = document.getElementById("modal-img");
    if (!img) return;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

function downloadImage() {
    if (!currentModalProject || !currentModalProject.architectureImage) return;

    const link = document.createElement("a");
    link.href = currentModalProject.architectureImage;
    link.download = `architecture-${currentModalProject.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

*/

// Load the clean elite renderer (kept separate so this file can stay as a legacy archive).
(() => {
    const s = document.createElement('script');
    s.src = 'assets/js/projects-elite.js';
    s.defer = true;
    document.head.appendChild(s);
})();
