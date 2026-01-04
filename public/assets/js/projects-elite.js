(() => {
  'use strict';

  const UI = {
    en: {
      searchPlaceholder: 'Search projects by skill, tech, or outcome (e.g. Azure, CI/CD, Security)',
      filterAll: 'All',
      projectsIntro: 'DevOps & cloud projects focused on reliability, automation, and secure delivery — from CI/CD to infrastructure and RAG pipelines.',
      featuredTitle: 'Featured projects',
      moreTitle: 'More projects',
      filterDevOps: 'DevOps',
      filterCloudAzure: 'Cloud Azure',
      filterCloudAws: 'Cloud AWS',
      filterKubernetes: 'Kubernetes',
      filterCicd: 'CI/CD',
      filterInfrastructure: 'Infrastructure',
      filterSystems: 'Systems & Support',
      filterAiRag: 'AI / RAG',
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
      searchPlaceholder: 'Rechercher par compétence, techno, ou résultat (ex : Azure, CI/CD, Sécurité)',
      filterAll: 'Tous',
      projectsIntro: "Projets DevOps & cloud axés fiabilité, automatisation et livraison sécurisée — du CI/CD à l’infrastructure et aux pipelines RAG.",
      featuredTitle: 'Projets phares',
      moreTitle: 'Autres projets',
      filterDevOps: 'DevOps',
      filterCloudAzure: 'Cloud Azure',
      filterCloudAws: 'Cloud AWS',
      filterKubernetes: 'Kubernetes',
      filterCicd: 'CI/CD',
      filterInfrastructure: 'Infrastructure',
      filterSystems: 'Systèmes & Support',
      filterAiRag: 'IA / RAG',
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

  const PROJECTS = [
    {
      id: 'mission-devops',
      domains: ['devops', 'cicd', 'cloudAzure'],
      title: { en: 'Gated Microservice Releases', fr: 'Releases microservices gatées' },
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
      domains: ['cloudAzure', 'infrastructure'],
      title: { en: 'Secure Hybrid Connectivity', fr: 'Connectivité hybride sécurisée' },
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
      id: 'migration-azure',
      domains: ['cloudAzure', 'cicd', 'infrastructure'],
      title: { en: 'App Migration to Azure PaaS', fr: 'Migration application vers Azure PaaS' },
      context: {
        en: 'GitHub Actions → Azure App Service + Azure Database for MySQL.',
        fr: 'GitHub Actions → Azure App Service + Azure Database for MySQL.'
      },
      capabilities: {
        en: ['PaaS deployment', 'CI/CD cutover planning', 'Managed database migration'],
        fr: ['Déploiement PaaS', 'Plan de cutover CI/CD', 'Migration base managée']
      },
      impact: {
        en: [
          'Shipped **1** production PaaS target (Azure App Service)',
          'Migrated **1** MySQL datastore to managed Azure MySQL',
          'Prepared **1** cutover/rollback path for release'
        ],
        fr: [
          'Livré **1** cible PaaS en production (Azure App Service)',
          'Migration de **1** datastore MySQL vers Azure MySQL managé',
          'Préparation de **1** plan cutover/rollback pour la release'
        ]
      },
      technologies: ['Azure App Service', 'GitHub Actions', 'Azure MySQL', 'Node.js'],
      architectureImage: '/images/migration-arch.png'
    },
    {
      id: 'ansible-project',
      domains: ['devops', 'cloudAws', 'infrastructure'],
      title: { en: 'Repeatable Server Baselines on AWS', fr: 'Baselines serveurs reproductibles sur AWS' },
      context: {
        en: 'Ansible automation with dynamic inventory + secrets encryption.',
        fr: "Automatisation Ansible (inventaire dynamique) + chiffrement des secrets."
      },
      capabilities: {
        en: [
          'Configuration standardization',
          'Secrets management',
          'OS hardening',
          'Repeatable provisioning',
          'Fleet consistency'
        ],
        fr: [
          'Standardisation de configuration',
          'Gestion des secrets',
          'Durcissement OS',
          'Provisionnement reproductible',
          'Cohérence de flotte'
        ]
      },
      impact: {
        en: [
          'Standardized **4** core services per host baseline',
          'Encrypted secrets with **1** vault workflow',
          'Reduced drift with **1** repeatable configuration run'
        ],
        fr: [
          'Standardisation de **4** services par baseline serveur',
          'Secrets chiffrés via **1** workflow Vault',
          'Réduction du drift via **1** exécution reproductible'
        ]
      },
      technologies: ['Ansible', 'AWS EC2', 'IAM', 'Linux', 'MySQL', 'Redis', 'Nginx'],
      architectureImage: '/images/ansible-project-arch.png'
    },
    {
      id: 'pfe-bairoutech',
      domains: ['kubernetes', 'devops', 'infrastructure'],
      title: {
        en: 'Container Orchestration for Reliable Deployments',
        fr: 'Orchestration conteneurs pour déploiements fiables'
      },
      context: {
        en: 'Kubernetes: ingress routing + probes + persistent storage.',
        fr: 'Kubernetes : ingress + sondes + stockage persistant.'
      },
      capabilities: {
        en: [
          'Health-based availability',
          'Rolling deployments',
          'Ingress routing',
          'Stateful persistence',
          'Operational resilience'
        ],
        fr: [
          'Disponibilité via health checks',
          'Déploiements progressifs',
          'Routage Ingress',
          'Persistance stateful',
          'Résilience opérationnelle'
        ]
      },
      impact: {
        en: [
          '**−40%** deployment time',
          'Gated rollouts with **2** health checks (liveness + readiness)',
          'Persisted state via **1** PVC-backed datastore'
        ],
        fr: [
          '**−40%** de temps de déploiement',
          'Rollouts gatés via **2** sondes (liveness + readiness)',
          'Persistance via **1** stockage PVC'
        ]
      },
      technologies: ['Kubernetes', 'Docker', 'Node.js', 'MongoDB'],
      architectureImage: '/images/k8s-arch.png'
    },
    {
      id: 'rag-chatbot',
      domains: ['aiRag', 'cloudAzure'],
      title: { en: 'Searchable Knowledge via RAG Pipeline', fr: 'Connaissance searchable via pipeline RAG' },
      context: {
        en: 'Blob ingestion → chunking/embeddings → vector index.',
        fr: 'Ingestion Blob → chunking/embeddings → index vectoriel.'
      },
      capabilities: {
        en: ['Document ingestion', 'Vector retrieval', 'Data extraction', 'API orchestration', 'Knowledge centralization'],
        fr: ['Ingestion documentaire', 'Recherche vectorielle', 'Extraction de données', 'Orchestration API', 'Centralisation de connaissance']
      },
      impact: {
        en: [
          'Indexed **2** formats (PDF + DOCX) into **1** vector index',
          'Built a **4-step** ingestion path (blob → chunk → embed → index)',
          'Delivered retrieval via **1** backend API surface'
        ],
        fr: [
          'Indexation de **2** formats (PDF + DOCX) dans **1** index vectoriel',
          "Pipeline d'ingestion en **4 étapes** (blob → chunk → embed → index)",
          'Retrieval exposé via **1** API backend'
        ]
      },
      technologies: ['Azure OpenAI', 'Azure AI Search', 'Node.js', 'Bootstrap'],
      architectureImage: '/images/rag-arch.png'
    },
    {
      id: 'bairoutech-admin',
      domains: ['systems', 'infrastructure'],
      title: {
        en: 'Enterprise Identity & Endpoint Operations',
        fr: 'Opérations identité & postes en entreprise'
      },
      context: { en: 'AD/GPO + DNS/DHCP + VPN + MFA.', fr: 'AD/GPO + DNS/DHCP + VPN + MFA.' },
      capabilities: {
        en: ['Identity administration', 'Policy enforcement', 'Secure remote access', 'Operational support', 'Incident reduction'],
        fr: ['Administration identité', 'Application des politiques', 'Accès distant sécurisé', 'Support opérationnel', "Réduction d'incidents"]
      },
      impact: {
        en: [
          'Standardized **3** core services (AD + DNS + DHCP)',
          'Hardened access with **2** controls (VPN + MFA)',
          'Enforced **1** workstation baseline via GPO'
        ],
        fr: [
          'Standardisation de **3** services (AD + DNS + DHCP)',
          'Accès renforcé via **2** contrôles (VPN + MFA)',
          'Baseline poste appliquée via **1** GPO'
        ]
      },
      technologies: ['Active Directory', 'DNS/DHCP', 'GPO', 'VPN', 'M365'],
      architectureImage: '/images/admin-arch.png'
    },
    {
      id: 'ifmotica-network',
      domains: ['systems', 'infrastructure'],
      title: {
        en: 'Office Network & Workstation Readiness',
        fr: 'Réseau bureau & préparation des postes'
      },
      context: {
        en: 'Switching/routing + Windows domain tooling.',
        fr: 'Switching/routage + outillage domaine Windows.'
      },
      capabilities: {
        en: ['Network deployment', 'Endpoint readiness', 'Admin automation', 'Operational setup', 'User onboarding'],
        fr: ['Déploiement réseau', 'Préparation des postes', 'Automatisation admin', 'Mise en place opérationnelle', 'Onboarding utilisateurs']
      },
      impact: {
        en: [
          'Delivered endpoints across **2** OS versions (Windows 10/11)',
          'Implemented **2** network layers (switching + routing)',
          'Reduced admin toil via **1** PowerShell toolkit'
        ],
        fr: [
          'Déploiement postes sur **2** OS (Windows 10/11)',
          'Mise en place de **2** couches réseau (switching + routage)',
          'Réduction du toil admin via **1** toolkit PowerShell'
        ]
      },
      technologies: ['Windows 10/11', 'Networking', 'PowerShell', 'Support'],
      architectureImage: '/images/network-arch.png'
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

  function parseImpactItem(value) {
    const raw = String(value || '').trim();
    if (!raw) return { metric: '', text: '' };

    const match = raw.match(/\*\*([^*]+)\*\*/);
    if (!match) return { metric: '', text: raw };

    const metric = (match[1] || '').trim();
    const text = raw.replace(match[0], '').replace(/\s{2,}/g, ' ').trim();
    return { metric, text };
  }

  const state = {
    query: '',
    activeFilter: 'all',
    lang: getLang()
  };

  const FEATURED_IDS = new Set([
    'azure-hub-spoke',
    'mission-devops',
    'ansible-project',
    'pfe-bairoutech'
  ]);

  function domainLabel(domainKey, l) {
    const strings = UI[l];
    if (domainKey === 'devops') return strings.filterDevOps;
    if (domainKey === 'cloudAzure') return strings.filterCloudAzure;
    if (domainKey === 'cloudAws') return strings.filterCloudAws;
    if (domainKey === 'kubernetes') return strings.filterKubernetes;
    if (domainKey === 'cicd') return strings.filterCicd;
    if (domainKey === 'infrastructure') return strings.filterInfrastructure;
    if (domainKey === 'systems') return strings.filterSystems;
    if (domainKey === 'aiRag') return strings.filterAiRag;
    return String(domainKey || '').trim();
  }

  function projectMetaLine(p, l) {
    const order = ['devops', 'cloudAzure', 'cloudAws', 'kubernetes', 'cicd', 'infrastructure', 'systems', 'aiRag'];
    const domains = Array.isArray(p.domains) ? p.domains : [];
    const sorted = order.filter(k => domains.includes(k));
    const labels = (sorted.length ? sorted : domains).map(k => domainLabel(k, l));
    return labels.filter(Boolean).slice(0, 3).join(' • ');
  }

  const FILTERS = [
    {
      key: 'all',
      label: (l) => UI[l].filterAll,
      match: () => true
    },
    {
      key: 'devops',
      label: (l) => UI[l].filterDevOps,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('devops')
    },
    {
      key: 'cloudAzure',
      label: (l) => UI[l].filterCloudAzure,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('cloudAzure')
    },
    {
      key: 'cloudAws',
      label: (l) => UI[l].filterCloudAws,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('cloudAws')
    },
    {
      key: 'kubernetes',
      label: (l) => UI[l].filterKubernetes,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('kubernetes')
    },
    {
      key: 'cicd',
      label: (l) => UI[l].filterCicd,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('cicd')
    },
    {
      key: 'infrastructure',
      label: (l) => UI[l].filterInfrastructure,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('infrastructure')
    },
    {
      key: 'systems',
      label: (l) => UI[l].filterSystems,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('systems')
    },
    {
      key: 'aiRag',
      label: (l) => UI[l].filterAiRag,
      match: (p) => Array.isArray(p.domains) && p.domains.includes('aiRag')
    }
  ];

  function getSearchText(p, l) {
    const safe = (x) => (x == null ? '' : String(x));
    const list = (arr) => (Array.isArray(arr) ? arr.map(safe).join(' ') : '');

    const title = p.title && p.title[l] ? p.title[l] : '';
    const context = p.context && p.context[l] ? p.context[l] : '';
    const caps = p.capabilities && p.capabilities[l] ? list(p.capabilities[l]) : '';
    const impact = p.impact && p.impact[l] ? list(p.impact[l]) : '';
    const tech = list(p.technologies);

    return [title, context, caps, impact, tech].filter(Boolean).join(' ').toLowerCase();
  }

  function filteredProjects() {
    const l = state.lang;
    const q = (state.query || '').trim().toLowerCase();
    const active = state.activeFilter;

    const filterDef = FILTERS.find(f => f.key === active) || FILTERS[0];

    return PROJECTS.filter((p) => {
      if (!filterDef.match(p)) return false;
      if (!q) return true;
      return getSearchText(p, l).includes(q);
    });
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
      <div class="modal-controls" role="toolbar" aria-label="Architecture controls">
        <button type="button" class="control-icon-btn" data-action="zoomOut" aria-label="Zoom out" title="Zoom out">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
        </button>
        <button type="button" class="control-icon-btn" data-action="zoomIn" aria-label="Zoom in" title="Zoom in">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
        <a class="control-icon-btn" data-action="download" aria-label="Download" title="Download" href="#" download>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
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
        if (img) img.style.cursor = scale > 1 ? 'grab' : 'default';
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

  function ensureShell() {
    const root = document.getElementById('projects-container');
    if (!root) return null;

    if (root.querySelector('[data-projects-shell="true"]')) return root;

    root.innerHTML = `
      <div class="projects-shell" data-projects-shell="true">
        <div class="projects-intro" id="projectsIntro"></div>
        <div class="projects-toolbar" aria-label="Projects controls">
          <div class="projects-toolbar-surface">
            <div class="projects-search" role="search">
              <span class="projects-search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input id="projectsSearchInput" class="projects-search-input" type="search" />
            </div>
            <div class="projects-filters" id="projectsFilters" role="toolbar" aria-label="Project domains"></div>
          </div>
        </div>

        <div class="projects-sections" aria-label="Projects">
          <section class="projects-section" data-section="featured">
            <div class="projects-section-header">
              <h3 class="projects-section-title" id="projectsFeaturedTitle"></h3>
            </div>
            <div class="elite-projects-grid" id="projectsFeaturedGrid"></div>
          </section>

          <section class="projects-section" data-section="more">
            <div class="projects-section-header">
              <h3 class="projects-section-title" id="projectsMoreTitle"></h3>
            </div>
            <div class="elite-projects-grid" id="projectsMoreGrid"></div>
          </section>
        </div>
      </div>
    `;

    return root;
  }

  function renderFilters() {
    const root = document.getElementById('projects-container');
    if (!root) return;
    const filtersEl = root.querySelector('#projectsFilters');
    if (!filtersEl) return;

    const l = state.lang;
    filtersEl.innerHTML = '';

    FILTERS.forEach((f) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-pill';
      btn.textContent = f.label(l);
      btn.setAttribute('data-filter', f.key);
      btn.setAttribute('aria-pressed', state.activeFilter === f.key ? 'true' : 'false');
      if (state.activeFilter === f.key) btn.classList.add('active');
      btn.addEventListener('click', () => {
        state.activeFilter = f.key;
        renderFilters();
        renderGrid();
      });
      filtersEl.appendChild(btn);
    });
  }

  function createCard(p, l, strings) {
    const card = document.createElement('article');
    card.className = 'elite-card';

    const context = p.context && p.context[l] ? p.context[l] : '';
    const meta = projectMetaLine(p, l);
    const cap = p.capabilities && p.capabilities[l] ? p.capabilities[l] : [];
    const impact = p.impact && p.impact[l] ? p.impact[l] : [];

    const capItems = cap
      .slice(0, 3)
      .map((li) => `<li>${escapeHtml(li)}</li>`)
      .join('');

    const impactItems = impact
      .slice(0, 3)
      .map((row) => {
        if (row && typeof row === 'object' && ('metric' in row || 'text' in row)) {
          const metric = row.metric ? String(row.metric) : '';
          const text = row.text ? String(row.text) : '';
          return `<li><span class="metric">${escapeHtml(metric)}</span><span class="metric-text">${escapeHtml(text)}</span></li>`;
        }

        const parsed = parseImpactItem(row);
        const safeMetric = escapeHtml(parsed.metric);
        const safeText = escapeHtml(parsed.text);
        if (!safeMetric) return `<li><span class="metric-text">${safeText}</span></li>`;
        return `<li><span class="metric">${safeMetric}</span><span class="metric-text">${safeText}</span></li>`;
      })
      .join('');

    const tech = Array.isArray(p.technologies) ? p.technologies.slice(0, 4) : [];
    tech.sort((a, b) => String(a).localeCompare(String(b)));
    const techTags = tech.map((t) => `<span class="elite-tag">${escapeHtml(t)}</span>`).join('');

    card.innerHTML = `
      <div class="elite-header">
        <h3 class="elite-title">${escapeHtml(p.title[l] || '')}</h3>
        ${meta ? `<div class="elite-meta">${escapeHtml(meta)}</div>` : ''}
      </div>
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
        <div class="elite-actions">
          <button type="button" class="elite-cta" data-arch="${escapeHtml(p.architectureImage || '')}" data-caption="${escapeHtml(p.title[l] || '')}">
            ${escapeHtml(strings.viewArchitecture)}
          </button>
        </div>
      </div>
    `;

    return card;
  }

  function bindCtas(container, l) {
    container.querySelectorAll('.elite-cta').forEach((btn) => {
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

  function renderGrid() {
    const root = document.getElementById('projects-container');
    if (!root) return;

    const featuredGrid = root.querySelector('#projectsFeaturedGrid');
    const moreGrid = root.querySelector('#projectsMoreGrid');
    if (!featuredGrid || !moreGrid) return;

    featuredGrid.innerHTML = '';
    moreGrid.innerHTML = '';

    const l = state.lang;
    const strings = UI[l];
    const list = filteredProjects();

    const featured = list.filter(p => FEATURED_IDS.has(p.id));
    const more = list.filter(p => !FEATURED_IDS.has(p.id));

    featured.forEach((p) => featuredGrid.appendChild(createCard(p, l, strings)));
    more.forEach((p) => moreGrid.appendChild(createCard(p, l, strings)));

    const featuredSection = root.querySelector('[data-section="featured"]');
    const moreSection = root.querySelector('[data-section="more"]');
    if (featuredSection) featuredSection.style.display = featured.length ? '' : 'none';
    if (moreSection) moreSection.style.display = more.length ? '' : 'none';

    bindCtas(featuredGrid, l);
    bindCtas(moreGrid, l);
  }

  function render(lang) {
    state.lang = lang === 'en' ? 'en' : 'fr';

    const root = ensureShell();
    if (!root) return;

    const l = state.lang;
    const strings = UI[l];

    const intro = root.querySelector('#projectsIntro');
    if (intro) intro.textContent = strings.projectsIntro;

    const featuredTitle = root.querySelector('#projectsFeaturedTitle');
    if (featuredTitle) featuredTitle.textContent = strings.featuredTitle;

    const moreTitle = root.querySelector('#projectsMoreTitle');
    if (moreTitle) moreTitle.textContent = strings.moreTitle;

    const input = root.querySelector('#projectsSearchInput');
    if (input) {
      input.placeholder = strings.searchPlaceholder;
      input.setAttribute('aria-label', strings.searchPlaceholder);
      input.value = state.query;

      if (!input.__bound) {
        input.addEventListener('input', (e) => {
          state.query = e.target.value || '';
          renderGrid();
        });
        input.__bound = true;
      }
    }

    renderFilters();
    renderGrid();
  }

  function init() {
    const lang = getLang();
    render(lang);

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
