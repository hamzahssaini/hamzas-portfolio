(() => {
  'use strict';

  const UI = {
    en: {
      searchPlaceholder: 'Search projects by skill, tech, or outcome (e.g. Azure, CI/CD, Security)',
      filterAll: 'All',
      projectsIntro: 'Selected Cloud/DevOps work: CI/CD, IaC, Kubernetes, and secure delivery.',
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
      showMore: 'More projects',
      hideMore: 'Hide projects',
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
      projectsIntro: 'Sélection Cloud/DevOps : CI/CD, IaC, Kubernetes et delivery sécurisé.',
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
      showMore: 'Plus de projets',
      hideMore: 'Masquer',
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
      title: { en: 'Azure Microservices CI/CD', fr: 'CI/CD microservices Azure' },
      date: 'dec 2025 - present',
      type: 'Work',
      repo: '',
      context: {
        en: 'CI/CD automation for a microservices application deployed on Azure.',
        fr: 'Automatisation CI/CD pour une application microservices déployée sur Azure.'
      },
      capabilities: {
        en: [
          'GitLab CI pipelines for backend (.NET) and frontend (React)',
          'Automated build, test, and deploy to Azure Web App',
          'Environment separation (dev/test/prod)',
          'Repeatable release flow to reduce manual errors'
        ],
        fr: [
          'Pipelines GitLab CI backend (.NET) et frontend (React)',
          'Build, tests et déploiement automatisés vers Azure Web App',
          'Séparation des environnements (dev/test/prod)',
          'Flux de release reproductible pour réduire les erreurs manuelles'
        ]
      },
      impact: {
        en: [
          { metric: '2', text: 'CI/CD pipelines delivered (backend + frontend)' },
          { metric: '3', text: 'environments separated for safer releases' },
          { metric: '1', text: 'production deployment target (Azure Web App)' }
        ],
        fr: [
          { metric: '2', text: 'pipelines CI/CD livrés (backend + frontend)' },
          { metric: '3', text: 'environnements séparés pour releases plus sûres' },
          { metric: '1', text: 'cible de déploiement production (Azure Web App)' }
        ]
      },
      technologies: ['GitLab CI', 'Azure Web App', '.NET', 'React'],
      architectureImage: '/images/mission-devops-arch.png',
      gallery: [
        { src: '/images/projects/mission-devops/01.png' },
        { src: '/images/projects/mission-devops/02.png' },
        { src: '/images/projects/mission-devops/03.png' },
        { src: '/images/projects/mission-devops/04.png' },
        { src: '/images/projects/mission-devops/05.png' }
      ]
    },
    {
      id: 'azure-hub-spoke',
      domains: ['cloudAzure', 'infrastructure'],
      title: { en: 'Azure Hub-Spoke Hybrid Network', fr: 'Réseau hybride Azure hub-spoke' },
      date: 'Oct 2025 – Nov 2025',
      type: 'Personal',
      repo: 'https://github.com/hamzahssaini/Project-Azure-Hybrid-Infra',
      context: {
        en: 'Secure hybrid Azure architecture delivered using Infrastructure as Code.',
        fr: 'Architecture hybride Azure sécurisée livrée via Infrastructure as Code.'
      },
      capabilities: {
        en: [
          'Hub & spoke network design with segmentation',
          'IPSec site-to-site VPN for on-prem ↔ cloud connectivity',
          'Terraform-based IaC with repeatable deployments',
          'CI/CD pipeline for infrastructure delivery'
        ],
        fr: [
          'Conception réseau hub & spoke avec segmentation',
          'VPN IPSec site-à-site pour connectivité on-prem ↔ cloud',
          'IaC Terraform avec déploiements reproductibles',
          'Pipeline CI/CD pour delivery infrastructure'
        ]
      },
      impact: {
        en: [
          { metric: '50%', text: 'faster infrastructure delivery' },
          { metric: '1', text: 'standardized hub-spoke architecture' },
          { metric: '1', text: 'IPSec tunnel enabling hybrid connectivity' }
        ],
        fr: [
          { metric: '50%', text: 'delivery infrastructure plus rapide' },
          { metric: '1', text: 'architecture hub-spoke standardisée' },
          { metric: '1', text: 'tunnel IPSec pour connectivité hybride' }
        ]
      },
      technologies: ['Azure', 'Terraform', 'Azure DevOps', 'Active Directory', 'Network Security'],
      architectureImage: '/images/hub-spoke-arch.png',
      gallery: [
        { src: '/images/projects/azure-hub-spoke/01.png' },
        { src: '/images/projects/azure-hub-spoke/02.png' },
        { src: '/images/projects/azure-hub-spoke/03.png' },
        { src: '/images/projects/azure-hub-spoke/04.png' }
      ]
    },
    {
      id: 'migration-azure',
      domains: ['cloudAzure', 'cicd', 'infrastructure'],
      title: { en: 'Azure App Service Migration', fr: 'Migration Azure App Service' },
      date: 'Août 2025 – Oct 2025',
      type: 'Personal',
      repo: 'https://github.com/hamzahssaini/mig-to-azure-via-Terraform',
      context: {
        en: 'Application migration and optimization on Azure App Service.',
        fr: 'Migration et optimisation applicative sur Azure App Service.'
      },
      capabilities: {
        en: [
          'Rehost & refactor migration strategy',
          'CI/CD pipelines with GitHub Actions',
          'Managed database deployment (Azure Database for MySQL)',
          'Monitoring and performance optimization'
        ],
        fr: [
          'Stratégie de migration rehost & refactor',
          'Pipelines CI/CD avec GitHub Actions',
          'Déploiement base managée (Azure Database for MySQL)',
          'Monitoring et optimisation des performances'
        ]
      },
      impact: {
        en: [
          { metric: '+30%', text: 'application performance' },
          { metric: '−20%', text: 'infrastructure costs' },
          { metric: '1', text: 'automated deployment pipeline' }
        ],
        fr: [
          { metric: '+30%', text: 'performance applicative' },
          { metric: '−20%', text: 'coûts d’infrastructure' },
          { metric: '1', text: 'pipeline de déploiement automatisé' }
        ]
      },
      technologies: ['Azure App Service', 'GitHub Actions', 'Azure Database for MySQL', 'Node.js', 'Azure Monitor'],
      architectureImage: '/images/migration-arch.png',
      gallery: [
        { src: '/images/projects/migration-azure/01.png' },
        { src: '/images/projects/migration-azure/02.png' },
        { src: '/images/projects/migration-azure/03.png' },
        { src: '/images/projects/migration-azure/04.png' }
      ]
    },
    {
      id: 'ansible-project',
      domains: ['devops', 'cloudAws', 'infrastructure'],
      title: { en: 'AWS Baseline Automation (Ansible)', fr: 'Automatisation baselines AWS (Ansible)' },
      date: 'Déc 2025',
      type: 'Personal',
      repo: 'https://github.com/hamzahssaini/ansible-aws-devops',
      context: {
        en: 'Infrastructure automation and service hardening on AWS using Ansible.',
        fr: 'Automatisation infrastructure et durcissement de services sur AWS via Ansible.'
      },
      capabilities: {
        en: [
          'Dynamic AWS EC2 inventory with aws_ec2',
          'Automated deployment of Nginx, Docker, MySQL, Redis',
          'Secrets management using Ansible Vault',
          'Idempotent runs to reduce configuration drift'
        ],
        fr: [
          'Inventaire dynamique AWS EC2 via aws_ec2',
          'Déploiement automatisé de Nginx, Docker, MySQL, Redis',
          'Gestion des secrets via Ansible Vault',
          'Exécutions idempotentes pour réduire le drift'
        ]
      },
      impact: {
        en: [
          { metric: '4', text: 'services automated (Nginx, Docker, MySQL, Redis)' },
          { metric: '1', text: 'encrypted secrets workflow (Ansible Vault)' },
          { metric: '1', text: 'dynamic inventory source (aws_ec2)' }
        ],
        fr: [
          { metric: '4', text: 'services automatisés (Nginx, Docker, MySQL, Redis)' },
          { metric: '1', text: 'workflow de secrets chiffrés (Ansible Vault)' },
          { metric: '1', text: 'source d’inventaire dynamique (aws_ec2)' }
        ]
      },
      technologies: ['Ansible', 'AWS EC2', 'IAM', 'Linux', 'Nginx', 'Docker', 'MySQL', 'Redis'],
      architectureImage: '/images/ansible-project-arch.png',
      gallery: [
        { src: '/images/projects/ansible-project/01.png' },
        { src: '/images/projects/ansible-project/02.png' },
        { src: '/images/projects/ansible-project/03.png' },
        { src: '/images/projects/ansible-project/04.png' }
      ]
    },
    {
      id: 'pfe-bairoutech',
      domains: ['kubernetes', 'devops', 'infrastructure'],
      title: {
        en: 'Kubernetes Platform Blueprint',
        fr: 'Plateforme Kubernetes (Blueprint)'
      },
      date: 'Févr 2025 – Juin 2025',
      type: 'Work',
      repo: 'https://github.com/hamzahssaini/kubernetes-K8s-nodejs-mongodb-ci-cd',
      context: {
        en: 'Containerized and orchestrated a production-ready web application.',
        fr: 'Containerisation et orchestration d’une application web prête production.'
      },
      capabilities: {
        en: [
          'Dockerization of Node.js & MongoDB',
          'Kubernetes deployment with Ingress, PVC, health probes',
          'High availability and deployment standardization',
          'Security-minded rollout patterns (health-gated)'
        ],
        fr: [
          'Dockerisation de Node.js & MongoDB',
          'Déploiement Kubernetes avec Ingress, PVC et sondes santé',
          'Haute disponibilité et standardisation des déploiements',
          'Rollouts plus sûrs via gates santé (probes)'
        ]
      },
      impact: {
        en: [
          { metric: '40%', text: 'faster deployment cycles' },
          { metric: '2', text: 'health probes configured (liveness + readiness)' },
          { metric: '1', text: 'stateful persistence via PVC' }
        ],
        fr: [
          { metric: '40%', text: 'cycles de déploiement plus rapides' },
          { metric: '2', text: 'sondes santé (liveness + readiness)' },
          { metric: '1', text: 'persistance stateful via PVC' }
        ]
      },
      technologies: ['Kubernetes', 'Docker', 'Node.js', 'MongoDB', 'Linux', 'NGINX Ingress'],
      architectureImage: '/images/k8s-arch.png',
      gallery: [
        { src: '/images/projects/pfe-bairoutech/01.png' },
        { src: '/images/projects/pfe-bairoutech/02.png' },
        { src: '/images/projects/pfe-bairoutech/03.png' },
        { src: '/images/projects/pfe-bairoutech/04.png' },
        { src: '/images/projects/pfe-bairoutech/05.png' }
      ]
    },
    {
      id: 'rag-chatbot',
      domains: ['aiRag', 'cloudAzure'],
      title: { en: 'Azure RAG Chatbot (AI Search)', fr: 'Chatbot RAG Azure (AI Search)' },
      date: 'Déc 2025',
      type: 'Personal',
      repo: 'https://github.com/hamzahssaini/Chatbot-Project',
      context: {
        en: 'Enterprise RAG chatbot delivering document-grounded answers on Azure.',
        fr: 'Chatbot RAG délivrant des réponses fondées sur documents sur Azure.'
      },
      capabilities: {
        en: [
          'End-to-end RAG pipeline (ingestion → embeddings → vector search)',
          'Hybrid search (Top-K) with Azure AI Search',
          'Secure backend orchestration with Node.js/Express',
          'Modular architecture for scalability'
        ],
        fr: [
          'Pipeline RAG bout-en-bout (ingestion → embeddings → recherche vectorielle)',
          'Recherche hybride (Top-K) avec Azure AI Search',
          'Orchestration backend sécurisée en Node.js/Express',
          'Architecture modulaire et scalable'
        ]
      },
      impact: {
        en: [
          { metric: '3', text: 'pipeline stages (ingest → embed → retrieve)' },
          { metric: '1', text: 'vector search layer (Azure AI Search)' },
          { metric: '1', text: 'retrieval API for orchestration' }
        ],
        fr: [
          { metric: '3', text: 'étapes (ingest → embed → retrieve)' },
          { metric: '1', text: 'couche de recherche vectorielle (Azure AI Search)' },
          { metric: '1', text: 'API de retrieval pour orchestration' }
        ]
      },
      technologies: ['Azure OpenAI', 'Azure AI Search', 'Blob Storage', 'Node.js', 'Express', 'Bootstrap'],
      architectureImage: '/images/rag-arch.png',
      gallery: [
        { src: '/images/projects/rag-chatbot/01.png' },
        { src: '/images/projects/rag-chatbot/02.png' },
        { src: '/images/projects/rag-chatbot/03.png' },
        { src: '/images/projects/rag-chatbot/04.png' }
      ]
    },
    {
      id: 'bairoutech-admin',
      domains: ['systems', 'infrastructure'],
      title: {
        en: 'Windows Identity & M365 Operations',
        fr: 'Identité Windows & opérations M365'
      },
      date: 'Févr 2025 – Juin 2025',
      type: 'Work',
      repo: '',
      context: {
        en: 'Enterprise Windows Server and Microsoft 365 administration.',
        fr: 'Administration Windows Server et Microsoft 365 en entreprise.'
      },
      capabilities: {
        en: [
          'Active Directory, DNS, DHCP, GPO administration',
          'Site-to-site VPN for secure remote access',
          'Microsoft 365 tenant operations (MFA, licensing)',
          'Policy enforcement for standardized workstations'
        ],
        fr: [
          'Administration Active Directory, DNS, DHCP et GPO',
          'VPN site-à-site pour accès distant sécurisé',
          'Opérations tenant Microsoft 365 (MFA, licences)',
          'Application des politiques pour standardiser les postes'
        ]
      },
      impact: {
        en: [
          { metric: '4', text: 'core services administered (AD, DNS, DHCP, GPO)' },
          { metric: '2', text: 'security controls operated (VPN + MFA)' },
          { metric: '1', text: 'tenant administered (Microsoft 365)' }
        ],
        fr: [
          { metric: '4', text: 'services administrés (AD, DNS, DHCP, GPO)' },
          { metric: '2', text: 'contrôles sécurité (VPN + MFA)' },
          { metric: '1', text: 'tenant administré (Microsoft 365)' }
        ]
      },
      technologies: ['Windows Server', 'Active Directory', 'GPO', 'VPN', 'Microsoft 365', 'MFA'],
      architectureImage: '/images/admin-arch.png',
      gallery: [
        { src: '/images/projects/bairoutech-admin/01.png' },
        { src: '/images/projects/bairoutech-admin/02.png' },
        { src: '/images/projects/bairoutech-admin/03.png' },
        { src: '/images/projects/bairoutech-admin/04.png' }
      ]
    },
    {
      id: 'ifmotica-network',
      domains: ['systems', 'infrastructure'],
      title: {
        en: 'Network Deployment & Support Automation',
        fr: 'Déploiement réseau & automatisation support'
      },
      date: 'dec 2024 - Mai 2025',
      type: 'Work',
      repo: '',
      context: {
        en: 'IT infrastructure deployment and support automation for office environments.',
        fr: 'Déploiement d’infrastructure IT et automatisation du support en environnement bureau.'
      },
      capabilities: {
        en: [
          'Network equipment configuration (routers, switches)',
          'Windows 10/11 deployment and workstation imaging',
          'PowerShell GUI tool for Active Directory automation',
          'N1/N2 support workflows for incident handling'
        ],
        fr: [
          'Configuration équipements réseau (routeurs, switchs)',
          'Déploiement Windows 10/11 et imaging des postes',
          'Outil PowerShell GUI pour automatisation Active Directory',
          'Process support N1/N2 pour gestion d’incidents'
        ]
      },
      impact: {
        en: [
          { metric: '1', text: 'PowerShell GUI tool delivered for AD tasks' },
          { metric: '2', text: 'support tiers covered (N1/N2)' },
          { metric: '2', text: 'OS versions deployed (Windows 10/11)' }
        ],
        fr: [
          { metric: '1', text: 'outil PowerShell GUI livré pour tâches AD' },
          { metric: '2', text: 'niveaux de support couverts (N1/N2)' },
          { metric: '2', text: 'versions Windows déployées (10/11)' }
        ]
      },
      technologies: ['PowerShell', 'Active Directory', 'Windows', 'Networking', 'IT Support'],
      architectureImage: '/images/network-arch.png',
      gallery: [
        { src: '/images/projects/ifmotica-network/01.png' },
        { src: '/images/projects/ifmotica-network/02.png' },
        { src: '/images/projects/ifmotica-network/03.png' },
        { src: '/images/projects/ifmotica-network/04.png' }
      ]
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
    lang: getLang(),
    showMore: false
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
    overlay.setAttribute('aria-label', 'Gallery');

    overlay.innerHTML = `
      <div class="gallery-modal" role="document" aria-label="Gallery window">
        <div class="gallery-modal-header">
          <div class="gallery-modal-title">
            <span class="gallery-modal-title-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14z" />
                <path d="M8.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                <path d="M6 18h12l-4.2-5.6a1 1 0 0 0-1.6 0l-2.2 2.9-1.3-1.7a1 1 0 0 0-1.6 0L6 18z" />
              </svg>
            </span>
            <span class="gallery-modal-title-text" id="galleryModalTitle"></span>
          </div>
          <button type="button" class="gallery-modal-close" data-action="close" aria-label="Close" title="Close">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="gallery-modal-body">
          <figure class="gallery-modal-figure">
            <img class="gallery-modal-image" id="galleryModalImage" alt="" />
            <figcaption class="gallery-modal-caption" id="galleryModalCaption"></figcaption>
          </figure>

          <div class="gallery-modal-pagination" id="galleryModalPagination" aria-label="Gallery pagination"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    function setOpen(open) {
      overlay.classList.toggle('open', !!open);
    }

    function close() {
      setOpen(false);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowLeft') {
        try { window.__galleryPrev && window.__galleryPrev(); } catch (err) { }
        return;
      }
      if (e.key === 'ArrowRight') {
        try { window.__galleryNext && window.__galleryNext(); } catch (err) { }
      }
    });

    const closeBtn = overlay.querySelector('[data-action="close"]');
    if (closeBtn) closeBtn.addEventListener('click', () => close());

    function getCaptionText(item, l) {
      if (!item) return '';
      const cap = item.caption;
      if (!cap) return '';
      if (typeof cap === 'string') return cap;
      if (typeof cap === 'object') return String(cap[l] || cap.en || cap.fr || '');
      return '';
    }

    let galleryItems = [];
    let galleryIndex = 0;
    let galleryLang = 'fr';
    let galleryTitle = '';

    function renderPagination() {
      const el = overlay.querySelector('#galleryModalPagination');
      if (!el) return;
      const total = galleryItems.length;
      if (total <= 1) {
        el.innerHTML = '';
        return;
      }

      const prevDisabled = galleryIndex <= 0;
      const nextDisabled = galleryIndex >= total - 1;

      const pages = Array.from({ length: total }).map((_, i) => {
        const active = i === galleryIndex;
        return `<button type="button" class="gallery-page-btn${active ? ' is-active' : ''}" data-page="${i}" aria-label="Page ${i + 1}">${i + 1}</button>`;
      }).join('');

      el.innerHTML = `
        <button type="button" class="gallery-arrow-btn" data-nav="prev" ${prevDisabled ? 'disabled' : ''} aria-label="Previous">‹</button>
        <div class="gallery-pages">${pages}</div>
        <button type="button" class="gallery-arrow-btn" data-nav="next" ${nextDisabled ? 'disabled' : ''} aria-label="Next">›</button>
      `;

      el.querySelectorAll('[data-page]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const raw = btn.getAttribute('data-page');
          const idx = raw ? parseInt(raw, 10) : 0;
          if (Number.isFinite(idx)) {
            galleryIndex = Math.max(0, Math.min(total - 1, idx));
            renderSlide();
          }
        });
      });

      const prevBtn = el.querySelector('[data-nav="prev"]');
      const nextBtn = el.querySelector('[data-nav="next"]');
      if (prevBtn) prevBtn.addEventListener('click', () => { if (!prevDisabled) { galleryIndex -= 1; renderSlide(); } });
      if (nextBtn) nextBtn.addEventListener('click', () => { if (!nextDisabled) { galleryIndex += 1; renderSlide(); } });
    }

    function renderSlide() {
      const titleEl = overlay.querySelector('#galleryModalTitle');
      if (titleEl) titleEl.textContent = galleryTitle || '';

      const imgEl = overlay.querySelector('#galleryModalImage');
      const capEl = overlay.querySelector('#galleryModalCaption');
      const item = galleryItems[galleryIndex];

      const src = item && item.src ? String(item.src) : '';
      const caption = getCaptionText(item, galleryLang);
      if (imgEl) {
        // If the user hasn't added images yet (404), fall back to a known placeholder.
        imgEl.onerror = () => {
          const fallback = '/images/placeholder-arch.png';
          if (imgEl.getAttribute('src') === fallback) return;
          imgEl.src = fallback;
        };
        imgEl.src = src;
        imgEl.alt = galleryTitle || 'Image';
      }
      if (capEl) capEl.textContent = caption || '';

      renderPagination();
    }

    window.__galleryPrev = () => {
      if (galleryIndex <= 0) return;
      galleryIndex -= 1;
      renderSlide();
    };

    window.__galleryNext = () => {
      if (galleryIndex >= galleryItems.length - 1) return;
      galleryIndex += 1;
      renderSlide();
    };

    window.__openGalleryModal = (items, title, lang, startIndex) => {
      galleryLang = (lang || '').toLowerCase() === 'en' ? 'en' : 'fr';
      galleryTitle = String(title || '');
      galleryItems = Array.isArray(items) ? items.filter(x => x && x.src) : [];
      if (!galleryItems.length) return;
      galleryIndex = Number.isFinite(startIndex) ? Math.max(0, Math.min(galleryItems.length - 1, startIndex)) : 0;
      renderSlide();
      setOpen(true);
      overlay.tabIndex = -1;
      overlay.focus();
    };

    // Backward-compatible hook: single image opens as a 1-item gallery.
    window.__openArchitectureModal = (src, caption, lang) => {
      const l = (lang || '').toLowerCase() === 'en' ? 'en' : 'fr';
      const items = [{ src: src, caption: caption ? { en: String(caption), fr: String(caption) } : '' }];
      window.__openGalleryModal(items, String(caption || ''), l, 0);
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
            <div class="projects-more-row" id="projectsMoreRow">
              <button type="button" class="projects-more-toggle" id="projectsMoreToggle"></button>
            </div>
          </section>

          <section class="projects-section" data-section="more">
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

    function localizeDateString(input, lang) {
      const raw = String(input || '');
      if (!raw.trim()) return raw;

      // Localize common month abbreviations used in this portfolio.
      // Keeps the rest of the date string intact (years, separators, etc.).
      const frToEn = [
        [/\bjanv\.?\b/gi, 'Jan'],
        [/\bf[ée]vr\.?\b/gi, 'Feb'],
        [/\bmars\b/gi, 'Mar'],
        [/\bavr\.?\b/gi, 'Apr'],
        [/\bmai\b/gi, 'May'],
        [/\bjuin\b/gi, 'Jun'],
        [/\bjuil\.?\b/gi, 'Jul'],
        [/\bao[ûu]t\b/gi, 'Aug'],
        [/\bsept\.?\b/gi, 'Sep'],
        [/\boct\.?\b/gi, 'Oct'],
        [/\bnov\.?\b/gi, 'Nov'],
        [/\bd[ée]c\.?\b/gi, 'Dec']
      ];

      const enToFr = [
        [/\bjan\b/gi, 'Janv'],
        [/\bfeb\b/gi, 'Févr'],
        [/\bmar\b/gi, 'Mars'],
        [/\bapr\b/gi, 'Avr'],
        [/\bmay\b/gi, 'Mai'],
        [/\bjun\b/gi, 'Juin'],
        [/\bjul\b/gi, 'Juil'],
        [/\baug\b/gi, 'Août'],
        [/\bsep\b/gi, 'Sept'],
        [/\boct\b/gi, 'Oct'],
        [/\bnov\b/gi, 'Nov'],
        [/\bdec\b/gi, 'Déc']
      ];

      const rules = (lang === 'en') ? frToEn : enToFr;
      return rules.reduce((acc, [re, rep]) => acc.replace(re, rep), raw);
    }

    const repo = p && typeof p === 'object' ? String(p.repo || '') : '';
    const hasRepo = !!(repo && repo.trim() !== '' && repo !== '#' && /^https?:\/\//i.test(repo));
    const archSrc = p && typeof p === 'object' ? String(p.architectureImage || '') : '';
    const hasArch = !!(archSrc && archSrc.trim() !== '');

    const gallery = (p && typeof p === 'object' && Array.isArray(p.gallery)) ? p.gallery : [];
    const hasGallery = !!(gallery && Array.isArray(gallery) && gallery.length > 0);
    const hasMedia = hasGallery || hasArch;

    const dateRaw = (p && typeof p === 'object') ? (p.date ?? p.period ?? '') : '';
    const dateText = (() => {
      if (!dateRaw) return '2025 - present';
      if (typeof dateRaw === 'string') return localizeDateString(dateRaw, l);
      if (typeof dateRaw === 'object' && dateRaw) {
        const picked = String(dateRaw[l] || dateRaw.en || dateRaw.fr || '2025 - present');
        return localizeDateString(picked, l);
      }
      return '2025 - present';
    })();

    const typeRaw = (p && typeof p === 'object') ? String(p.type || '') : '';
    const typeNorm = typeRaw.trim().toLowerCase();
    const isWork = typeNorm === 'work' || typeNorm === 'experience';
    const isPersonal = typeNorm === 'personal' || typeNorm === 'perso' || typeNorm === 'side';
    const ribbonText = typeRaw.trim() || 'Work';
    const ribbonClass = isPersonal ? 'personal' : 'work';

    const context = p.context && p.context[l] ? p.context[l] : '';
    const cap = p.capabilities && p.capabilities[l] ? p.capabilities[l] : [];
    const impact = p.impact && p.impact[l] ? p.impact[l] : [];

    const capItems = cap
      .slice(0, 4)
      .map((li) => `<li>${escapeHtml(li)}</li>`)
      .join('');

    const impactItems = impact
      .slice(0, 3)
      .map((row) => {
        if (row && typeof row === 'object' && ('metric' in row || 'text' in row)) {
          const metric = row.metric ? String(row.metric) : '';
          const text = row.text ? String(row.text) : '';
          if (!metric.trim()) {
            return `<li class="no-metric"><span class="metric"></span><span class="metric-text">${escapeHtml(text)}</span></li>`;
          }
          return `<li><span class="metric">${escapeHtml(metric)}</span><span class="metric-text">${escapeHtml(text)}</span></li>`;
        }

        const parsed = parseImpactItem(row);
        const safeMetric = escapeHtml(parsed.metric);
        const safeText = escapeHtml(parsed.text);
        if (!safeMetric) return `<li class="no-metric"><span class="metric"></span><span class="metric-text">${safeText}</span></li>`;
        return `<li><span class="metric">${safeMetric}</span><span class="metric-text">${safeText}</span></li>`;
      })
      .join('');

    const tech = Array.isArray(p.technologies) ? p.technologies.slice(0, 8) : [];
    const techTags = tech.map((t) => `<span class="elite-tag">${escapeHtml(t)}</span>`).join('');

    const hideRepoIcon = !!(
      p &&
      !hasRepo &&
      (p.id === 'mission-devops' || p.id === 'bairoutech-admin' || p.id === 'ifmotica-network')
    );

    const repoIcon = hideRepoIcon ? '' : `
      <button type="button" class="elite-icon-btn elite-icon-btn--repo${hasRepo ? '' : ' is-disabled'}" aria-label="Open GitHub repo" title="${hasRepo ? 'Open GitHub repo' : 'Add GitHub repo URL'}" ${hasRepo ? '' : 'disabled'} data-repo="${escapeHtml(repo)}">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" stroke-width="2.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    `;

    const archIcon = `
      <button type="button" class="elite-icon-btn elite-icon-btn--arch primary${hasMedia ? '' : ' is-disabled'}" aria-label="Open images" title="${hasMedia ? (strings.viewArchitecture || 'Open images') : 'Add images'}" ${hasMedia ? '' : 'disabled'} data-project-id="${escapeHtml(p.id || '')}" data-arch="${escapeHtml(archSrc)}" data-caption="${escapeHtml(p.title[l] || '')}">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14z" />
          <path d="M8.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          <path d="M6 18h12l-4.2-5.6a1 1 0 0 0-1.6 0l-2.2 2.9-1.3-1.7a1 1 0 0 0-1.6 0L6 18z" />
        </svg>
      </button>
    `;

    card.innerHTML = `
      <div class="elite-header">
        <div class="elite-header-content">
          <h3 class="elite-title">${escapeHtml(p.title[l] || '')}</h3>
          <div class="elite-date">${escapeHtml(dateText)}</div>
          <div class="elite-ribbon-container">
            <div class="elite-ribbon ${ribbonClass}">${escapeHtml(ribbonText)}</div>
          </div>
        </div>
        <div class="elite-header-actions">${repoIcon}${archIcon}</div>
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
      </div>
    `;

    return card;
  }

  function bindCtas(container, l) {
    container.querySelectorAll('.elite-icon-btn--arch').forEach((btn) => {
      btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project-id') || '';
        const src = btn.getAttribute('data-arch') || '';
        const caption = btn.getAttribute('data-caption') || '';

        const project = PROJECTS.find(p => p && String(p.id || '') === String(projectId || ''));
        const gallery = (project && Array.isArray(project.gallery)) ? project.gallery : [];

        const items = (gallery && gallery.length)
          ? gallery
          : (src ? [{ src: src, caption: { en: caption, fr: caption } }] : []);

        if (!items.length) return;
        ensureModal();
        if (typeof window.__openGalleryModal === 'function') {
          const title = project && project.title ? (project.title[l] || project.title.en || project.title.fr || caption) : caption;
          window.__openGalleryModal(items, title, l, 0);
          return;
        }

        if (typeof window.__openArchitectureModal === 'function') {
          window.__openArchitectureModal(src, caption, l);
        }
      });
    });

    container.querySelectorAll('.elite-icon-btn--repo').forEach((btn) => {
      btn.addEventListener('click', () => {
        const repo = btn.getAttribute('data-repo') || '';
        if (!repo) return;
        try {
          window.open(repo, '_blank', 'noopener');
        } catch (e) {
          window.location.href = repo;
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

    const featuredAll = list.filter(p => FEATURED_IDS.has(p.id));
    const featured = featuredAll.slice(0, 3);
    const overflowFeatured = featuredAll.slice(3);
    const more = [...overflowFeatured, ...list.filter(p => !FEATURED_IDS.has(p.id))];

    featured.forEach((p) => featuredGrid.appendChild(createCard(p, l, strings)));
    more.forEach((p) => moreGrid.appendChild(createCard(p, l, strings)));

    const featuredSection = root.querySelector('[data-section="featured"]');
    const moreSection = root.querySelector('[data-section="more"]');
    if (featuredSection) featuredSection.style.display = featured.length ? '' : 'none';
    if (moreSection) moreSection.style.display = (state.showMore && more.length) ? '' : 'none';

    const moreToggle = root.querySelector('#projectsMoreToggle');
    const moreRow = root.querySelector('#projectsMoreRow');
    if (moreToggle && moreRow) {
      const hasMore = more.length > 0;
      moreRow.style.display = (featured.length && hasMore) ? '' : 'none';
      moreToggle.style.display = hasMore ? '' : 'none';
      moreToggle.textContent = state.showMore ? strings.hideMore : strings.showMore;
      moreToggle.setAttribute('aria-expanded', state.showMore ? 'true' : 'false');
      moreToggle.setAttribute('aria-controls', 'projectsMoreGrid');
    }

    bindCtas(featuredGrid, l);
    if (state.showMore) bindCtas(moreGrid, l);
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

    const moreToggle = root.querySelector('#projectsMoreToggle');
    if (moreToggle && !moreToggle.__bound) {
      moreToggle.__bound = true;
      moreToggle.addEventListener('click', () => {
        state.showMore = !state.showMore;
        renderGrid();
      });
    }

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
