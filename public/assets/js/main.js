document.addEventListener('DOMContentLoaded', () => {
  try { console.log('main.js: DOMContentLoaded'); } catch (e) { }

  // Theme initialization: respect saved preference or system preference.
  (function initTheme() {
    try {
      // Determine homepage by `.hero` presence or pathname.
      const path = (location.pathname || '').replace(/\\/g, '/').toLowerCase();
      const isHome = !!document.querySelector('.hero') || path === '/' || path === '' || path.endsWith('/index.html');

      // Respect stored preference first, otherwise default homepage->dark
      const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
      if (saved === 'dark' || saved === 'light') {
        if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
      } else {
        if (isHome) document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
      }
      // cleanup any stale toggle element (we'll create a fresh control below)
      const existing = document.getElementById('themeToggle');
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    } catch (e) {
      // ignore in very old browsers
    }
  })();

  // --- Data: Projects from Resume ---
  const PROJECTS = [
    {
      id: 'aws-platform',
      shortTitle: { en: 'Scalable AWS Platform', fr: 'Plateforme AWS scalable' },
      title: 'Scalable Containerized Platform on AWS',
      date: '2025',
      type: 'Personal',
      desc: {
        en: 'Highly-available containerized multi-tier web application on AWS with CI/CD.',
        fr: 'Application web multicouche conteneurisée hautement disponible sur AWS.'
      },
      problem: {
        en: [
          'Frequent manual configuration errors and inconsistent environment states.',
          'Significant downtime during production releases.',
          'Reactive scaling causing bottlenecks and high operational costs.'
        ],
        fr: [
          'Erreurs fréquentes de configuration manuelle et environnements inconsistants.',
          'Temps d\'arrêt importants lors des mises en production.',
          'Scaling réactif entraînant des goulots d\'étranglement.'
        ]
      },
      impact: {
        en: [
          '**100%** Automated Deployment Cycle',
          '**99.9%** Infrastructure Availability',
          '**70%** Reduction in Lead Time for Changes',
          '**40%** Cost reduction via Fargate right-sizing'
        ],
        fr: [
          '**100%** de déploiements automatisés.',
          'Disponibilité de **99,9%** via redondance multi-AZ.',
          'Réduction du **Lead Time** de 70%.',
          'Réduction des coûts de **40%**.'
        ]
      },
      solution: {
        en: 'Production-grade containerized infrastructure utilizing Amazon ECS (Fargate). Managed via Terraform (IaC) for environment parity. Robust CI/CD in GitHub Actions with automated security scanning (Trivy) and Blue/Green strategies.',
        fr: 'Architecture conteneurisée de niveau production via Amazon ECS (Fargate). Gérée par Terraform (IaC). Pipeline CI/CD GitHub Actions avec scans de sécurité (Trivy) et stratégies Blue/Green.'
      },
      tech: ['AWS', 'Ansible', 'Docker', 'Node.js', 'GitHub Actions', 'CloudWatch', 'EBS'],
      repo: 'https://github.com/hamzahssaini/kubernetes-K8s-nodejs-nodejs-mongodb-ci-cd',
      img: '/assets/images/kubernetes.png',
      archiCaption: {
        en: "Production-grade multi-AZ container platform with automated CI/CD and vulnerability scanning.",
        fr: "Plateforme conteneurisée multi-AZ avec CI/CD automatisé et scans de vulnérabilités."
      }
    },
    {
      id: 'azure-hybrid',
      shortTitle: { en: 'Azure Hybrid Infrastructure', fr: 'Infrastructure Hybride Azure' },
      title: 'Azure Hybrid Hub-and-Spoke Infrastructure',
      date: '2023',
      type: 'Personal',
      desc: {
        en: 'Secure hybrid connectivity between on-premises and Azure.',
        fr: 'Connectivité hybride sécurisée entre on-premises et Azure.'
      },
      problem: {
        en: [
          'Lack of secure bidirectional communication for legacy workloads.',
          'Sensitive traffic traversing public endpoints (security risk).',
          'High latencies for hybrid data transfers.'
        ],
        fr: [
          'Manque de communication bidirectionnelle sécurisée.',
          'Trafic sensible transitant par des points d\'accès publics.',
          'Latences élevées pour les transferts de données hybrides.'
        ]
      },
      impact: {
        en: [
          '**100%** Elimination of public endpoint exposures',
          '**<20ms** Guaranteed consistent latency',
          '**Zero** Security breaches since deployment',
          '**30%** Optimization of inter-service traffic costs'
        ],
        fr: [
          'Élimination de **100%** des expositions publiques.',
          'Latence constante **<20ms** garantie.',
          '**Zéro** faille de sécurité depuis le déploiement.',
          'Optimisation des coûts de **30%**.'
        ]
      },
      solution: {
        en: 'Secure Hub-and-Spoke network topology in Azure. Centralized Azure Firewall for inspection and Site-to-Site VPN for encrypted on-prem connectivity. Zero-Trust network boundary.',
        fr: 'Topologie réseau Hub-and-Spoke sécurisée dans Azure. Azure Firewall centralisé et VPN Site-to-Site pour la connectivité on-prem cryptée.'
      },
      tech: ['Azure', 'VPN Gateway', 'VNet', 'NSG', 'Azure Firewall', 'Routing'],
      repo: 'https://github.com/hamzahssaini/azure-nginx-deployment-with-ansible',
      img: '/assets/images/archi.png',
      archiCaption: {
        en: "Zero-Trust Hub-and-Spoke topology with centralized traffic inspection and VPN tunnel.",
        fr: "Topologie Hub-and-Spoke Zero-Trust avec inspection centralisée et tunnel VPN."
      }
    },
    {
      id: 'ansible-automation',
      shortTitle: { en: 'Ansible AWS Automation', fr: 'Automatisation Ansible AWS' },
      title: 'Ansible AWS Automation',
      date: '2024 - present',
      type: 'Personal',
      desc: {
        en: 'Automated provisioning and hardening of AWS EC2 servers.',
        fr: 'Automatisation du provisionnement et sécurisation de serveurs AWS EC2.'
      },
      tech: ['Ansible', 'AWS EC2', 'Linux', 'MySQL', 'Redis'],
      repo: 'https://github.com/hamzahssaini/ansible-aws-devops',
      img: ''
    },
    {
      id: 'azure-migration',
      shortTitle: { en: 'Azure App Service Migration', fr: 'Migration Azure App Service' },
      title: 'Migration Azure App Service',
      date: '2022 - 2023',
      type: 'Personal',
      desc: {
        en: 'Rehost and refactor migration to Azure App Service.',
        fr: 'Migration "Rehost & Refactor" vers Azure App Service.'
      },
      tech: ['Azure App Service', 'GitHub Actions', 'Node.js'],
      repo: '#',
      img: ''
    },
    {
      id: 'k8s-orchestration',
      shortTitle: { en: 'Kubernetes Orchestration', fr: 'Orchestration K8s' },
      title: 'K8s & Node.js Orchestration',
      date: '2024 - 2025',
      type: 'Personal',
      desc: {
        en: 'Containerized Node.js/MongoDB app deployed to Kubernetes.',
        fr: 'Application Node.js/MongoDB sur Kubernetes avec Ingress.'
      },
      tech: ['Kubernetes', 'Docker', 'MongoDB', 'Ingress'],
      repo: '#',
      img: ''
    }
  ];

  // --- Render Projects ---
  // --- Render Projects (Legacy check disabled) ---
  const grid = document.getElementById('projectsGrid');
  // Note: some pages use other project containers (e.g. projects.js) and won't
  // have `#projectsGrid`. Do not exit early here, otherwise global features
  // like theme + language controls won't initialize.
  const searchInput = document.getElementById('projectSearch');
  const searchClear = document.getElementById('searchClear');

  // helper: truncate long text for compact cards
  function truncate(text, max) {
    if (!text) return '';
    const s = String(text);
    return s.length <= max ? s : s.slice(0, max - 1).trim() + '…';
  }

  function createCard(p, index) {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.style.transitionDelay = `${index * 100}ms`; // slightly slower stagger

    // Card visuals are controlled via CSS variables so theme switching works.
    // Avoid forcing inline colors here which would prevent dark mode from applying.

    const hasGallery = Array.isArray(p.gallery) && p.gallery.length > 0;
    const imgSrc = (hasGallery ? p.gallery[0] : (p.img || '')) || '';
    const hasImage = !!(imgSrc && String(imgSrc).trim());
    const hasRepo = p.repo && p.repo.trim() !== '' && p.repo !== '#' && /^https?:\/\//i.test(p.repo);

    // short text versions for compact cards
    // Support localized fields: p.title and p.desc can be either strings
    // or objects like { en: '...', fr: '...' }.
    const lang = localStorage.getItem('lang') || 'fr';
    function loc(field) {
      const v = p[field];
      if (!v) return '';
      if (typeof v === 'string') return v;
      if (typeof v === 'object') return v[lang] || v.en || v.fr || '';
      return '';
    }

    // Prefer an explicit shortTitle if provided (localized), otherwise use localized title
    const rawTitle = (loc('shortTitle') || loc('title') || p.title || '');
    const shortTitle = truncate(rawTitle, 60);

    // Full description (localized) and a short preview for cards
    const fullDesc = loc('desc') || p.desc || '';
    const shortDesc = truncate(fullDesc, 220);
    const shortLongDesc = p.longDesc ? truncate(p.longDesc, 150) : '';

    const linkIcon = `
      <button class="ref-icon-btn link-trigger${hasRepo ? '' : ' is-disabled'}" aria-label="Open GitHub repo" title="${hasRepo ? 'Open GitHub repo' : 'Add GitHub repo URL'}" ${hasRepo ? '' : 'disabled'}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </button>
    `;

    const imageIcon = `
      <button class="ref-icon-btn primary image-trigger${hasImage ? '' : ' is-disabled'}" aria-label="Open image preview" title="${hasImage ? 'Open image preview' : 'Add image / gallery'}" ${hasImage ? '' : 'disabled'}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 13l2.5-2.5L15 15l2-2 4 4" />
          <circle cx="9" cy="10" r="1" />
        </svg>
      </button>
    `;


    const isWork = p.type && p.type.toLowerCase() === 'work';
    const ribbonText = p.type || (isWork ? 'Work' : 'Personal');
    const ribbonClass = isWork ? 'ref-ribbon work' : 'ref-ribbon personal';

    card.className = 'card reveal reference-style'; // update class here to be safe

    card.innerHTML = `
      <div class="ref-card-header">
        <div class="ref-header-content">
          <h3 class="ref-title">${escapeHtml(shortTitle)}</h3>
          <span class="ref-date">${escapeHtml(p.date || '')}</span>
          <div class="ref-ribbon-container">
             <div class="${ribbonClass}">${ribbonText}</div>
          </div>
        </div>
        <div class="ref-icons">${linkIcon}${imageIcon}</div>
      </div>

      <div class="ref-body">
        <div class="ref-description">
          <p class="ref-desc-text">${escapeHtml(shortDesc)}</p>
          ${shortLongDesc ? `<p class="ref-long-desc">${escapeHtml(shortLongDesc)}</p>` : ''}
        </div>
      </div>

      <div class="ref-footer">
        <div class="ref-tags">
          ${(p.tech || []).map(t => `<span class="ref-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
    `;

    // Card Click Trigger: Open briefing modal
    card.addEventListener('click', () => {
      openBriefModal(p.id);
    });

    // Repo link click: open GitHub (or repo URL) in a new tab
    {
      const lbtn = card.querySelector('.link-trigger');
      if (lbtn && hasRepo) {
        lbtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          try {
            window.open(p.repo, '_blank', 'noopener');
          } catch (e) {
            // fallback: set location
            window.location.href = p.repo;
          }
        });
      }
    }

    // Image click: open lightbox directly (without opening the brief modal)
    {
      const ibtn = card.querySelector('.image-trigger');
      if (ibtn && hasImage) {
        ibtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          openLightbox(imgSrc, rawTitle);
        });
      }
    }

    return card;
  }

  function renderProjects(list, lang) {
    if (!grid) return;
    grid.innerHTML = '';
    // ensure localStorage lang is up-to-date for createCard's loc helper
    if (lang) localStorage.setItem('lang', lang);
    list.forEach((p, i) => {
      const card = createCard(p, i);
      grid.appendChild(card);

      // After the card is in the DOM, detect if the description overflows
      requestAnimationFrame(() => {
        try {
          const descEl = card.querySelector('.ref-desc-text');
          if (!descEl) return;
          // If the rendered content is taller than the visible box, add toggle
          if (descEl.scrollHeight > descEl.clientHeight) {
            const langCode = localStorage.getItem('lang') || 'fr';
            const labels = (I18N[langCode] && I18N[langCode].more) ? { more: I18N[langCode].more, less: I18N[langCode].less } : { more: 'More', less: 'Less' };
            const plain = String((typeof p.desc === 'object') ? (p.desc[langCode] || p.desc.en || p.desc.fr) : (p.desc || ''));

            const moreBtn = document.createElement('button');
            moreBtn.type = 'button';
            moreBtn.className = 'ref-more';
            moreBtn.setAttribute('aria-label', labels.more);
            moreBtn.textContent = labels.more;

            moreBtn.addEventListener('click', (ev) => {
              ev.stopPropagation();
              const descWrap = card.querySelector('.ref-description');
              const isExpanded = descWrap.classList.toggle('expanded');
              moreBtn.textContent = isExpanded ? labels.less : labels.more;
              const descText = card.querySelector('.ref-desc-text');
              if (descText) descText.textContent = isExpanded ? plain : truncate(plain, 220);
            });

            const footer = card.querySelector('.ref-footer');
            if (footer) footer.parentNode.insertBefore(moreBtn, footer);
            else card.appendChild(moreBtn);
          }
        } catch (e) { /* silent */ }
      });
    });
    try { console.log('renderProjects: rendered', grid ? grid.children.length : 0, 'cards'); } catch (e) { }
  }

  // Filtering logic (search input only)
  function applyFilters() {
    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    const filtered = PROJECTS.filter(p => {
      if (!q) return true;
      const inTitle = p.title && p.title.toLowerCase().includes(q);
      const inDesc = p.desc && p.desc.toLowerCase().includes(q);
      const inTech = (p.tech || []).some(t => t.toLowerCase().includes(q));
      return inTitle || inDesc || inTech;
    });
    // renderProjects(filtered);
  }


  // --- Education Data ---
  const EDUCATION = [
    {
      period: { fr: 'Oct 2025 – En cours', en: 'Oct 2025 – Present' },
      degree: { fr: 'Licence Professionnelle en Réseaux et Cybersécurité', en: 'Professional License in Networks & Cybersecurity' },
      school: 'Supemir | Casablanca',
      icon: '🎓'
    },
    {
      period: { fr: 'Sept 2025 – Jan 2026', en: 'Sept 2025 – Jan 2026' },
      degree: { fr: 'Formation Cloud Azure', en: 'Azure Cloud Training' },
      school: 'Université Internationale Averroès | Casablanca',
      icon: '☁️'
    },
    {
      period: { fr: '2023 - 2025', en: '2023 - 2025' },
      degree: { fr: 'Diplôme de Technicien Spécialisé en Cloud Computing', en: 'Specialized Technician Diploma in Cloud Computing' },
      school: 'IFMOTICA | Fès',
      icon: '💻'
    },
    {
      period: { fr: '2020 - 2021', en: '2020 - 2021' },
      degree: { fr: 'Baccalauréat Science Physique', en: 'High School Diploma in Physical Sciences' },
      school: 'Lycée Moley Ismail | Kasbah Tadla',
      icon: '🏫'
    }
  ];

  const eduContainer = document.querySelector('.timeline');

  function renderEducation(lang) {
    if (!eduContainer) return;
    eduContainer.innerHTML = '';

    EDUCATION.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'edu-card reveal';
      card.style.transitionDelay = `${index * 100}ms`;

      const period = item.period[lang] || item.period.fr;
      const degree = item.degree[lang] || item.degree.fr;

      card.innerHTML = `
        <div class="edu-icon">${item.icon}</div>
        <div class="edu-content">
           <span class="edu-date">${escapeHtml(period)}</span>
           <h3 class="edu-degree">${escapeHtml(degree)}</h3>
           <span class="edu-school">${escapeHtml(item.school)}</span>
        </div>
      `;

      eduContainer.appendChild(card);
      // Do not reference `observer` here because it is declared later with
      // `const` (temporal dead zone). The global `.reveal` pass after the
      // observer is created will register all `.reveal` elements for animation.
    });
  }

  // --- Controls: Theme + Language ---
  const I18N = {
    en: {
      nav_about: 'About',
      nav_projects: 'Projects',
      nav_education: 'Education',
      nav_contact: 'Let\'s Talk',
      hero_role: 'Cloud & DevOps Specialist',
      hero_title: 'Cloud & DevOps Specialist | Azure & AWS',
      hero_value: 'I design and automate scalable, production-ready cloud infrastructures using Azure, AWS, Kubernetes, and CI/CD pipelines.',
      btn_projects: 'View Projects',
      btn_github_short: 'GitHub',
      btn_download_cv: 'Download CV',
      btn_contact: 'Get in touch',
      btn_cv: 'Download CV',
      cv_cloud: 'Cloud/DevOps Resume',
      cv_data: 'Data/Analytics Resume',
      cv_support: 'IT Support & Systems Resume',
      btn_github: 'View Source Code',
      about_title: 'About Me',
      projects_title: 'Project Highlights',
      contact_title: 'Let\'s start a project together',
      brief_label_problem: 'PROBLEM',
      brief_label_impact: 'IMPACT / RESULTS',
      brief_label_solution: 'SOLUTION + TECHNOLOGIES',
      brief_label_archi: 'ARCHITECTURE',
      archi_zoom_hint: 'Click to zoom',
      contact_sub: 'Interested in working together? We should queue up a time to chat. I’ll buy the coffee.',
      hero_scroll: 'Scroll to find out more',
      footer_text: '&copy; <span class="footer-highlight-pink">2026</span> Hamza Hssaini. <span class="footer-highlight-blue">All</span> rights reserved.<br>Built <span class="footer-highlight-blue">with</span> Node.js · CI/CD via GitHub Actions.',
      search_placeholder: 'Search by keywords',
      btn_see_all: 'See all projects',
      form_success_title: 'Message Sent!',
      form_success_msg: 'Thank you for reaching out. Your message has been sent successfully.',
      form_error_title: 'Submission Failed',
      form_error_msg: 'There was an error sending your message. Please try again later or contact me via LinkedIn.',
      form_sending: 'Sending...',
      about_text: `
        <p>
          Hi! I'm Hamza, a Cloud & DevOps Specialist with a strong foundation in systems, networks, Azure
          environments, and Microsoft 365 administration. I work on concrete projects involving cloud migration,
          deploying hybrid Azure architectures, automating infrastructures with Terraform and Ansible, and
          implementing resilient CI/CD pipelines.
        </p>
        <p>
          Passionate about problem-solving and the DevOps culture, I strive to deliver reliable and
          high-performance solutions.
        </p>
        <p>
          When I'm not working on cloud projects, I enjoy exploring new technologies, contributing to open-source
          projects, and enhancing my skills in cloud security and infrastructure automation.
        </p>
        <p>
          My current expertise targets Amazon Web Services, Azure, and cloud-native architectures.
        </p>
      `,
      more: 'More',
      less: 'Less',
      form_name: 'Full Name',
      contact_mail_label: 'Mail me',
      email_copied: 'Copied!',
      phone_copied: 'Copied!',

      // Section 2 — Proof of Engineering
      mindset_title: 'How I Work: DevOps Operating Model',
      mindset_subtitle: 'Production-grade delivery with clear standards and measurable outcomes.',
      mindset_pillar_1_title: 'Infrastructure as Code',
      mindset_pillar_1_desc: 'Terraform & Ansible for reproducible, versioned environments',
      mindset_pillar_2_title: 'CI/CD First Approach',
      mindset_pillar_2_desc: 'Automated build, test, and deploy with GitHub Actions / GitLab CI',
      mindset_pillar_3_title: 'Secure by Design',
      mindset_pillar_3_desc: 'IAM, network segmentation, VPNs, and least-privilege access',
      mindset_pillar_4_title: 'Cost & Performance Optimization',
      mindset_pillar_4_desc: 'Right-sizing, monitoring, and cloud cost awareness',
      mindset_pillar_5_title: 'Production-Ready Documentation',
      mindset_pillar_5_desc: 'Clear READMEs, diagrams, and operational notes'
    },
    fr: {
      nav_about: 'À propos',
      nav_projects: 'Projets',
      nav_education: 'Formation',
      nav_contact: 'Contact',
      hero_role: "Cloud & DevOps Spécialiste",
      hero_title: 'Spécialiste Cloud & DevOps | Azure & AWS',
      hero_value: 'Je conçois et j’automatise des infrastructures cloud évolutives, prêtes pour la production, avec Azure, AWS, Kubernetes et des pipelines CI/CD.',
      btn_projects: 'Voir les projets',
      btn_github_short: 'GitHub',
      btn_download_cv: 'Télécharger CV',
      btn_contact: 'Me contacter',
      btn_cv: 'Télécharger CV',
      cv_cloud: 'CV Cloud/DevOps',
      cv_data: 'CV Data/Analytics',
      cv_support: 'CV Support IT & Systèmes',
      btn_github: 'Voir Code Source',
      about_title: 'À propos de moi',
      projects_title: 'Projets en vedette',
      contact_title: 'Commençons un projet ensemble',
      brief_label_problem: 'PROBLÉMATIQUE',
      brief_label_impact: 'IMPACT / RÉSULTATS',
      brief_label_solution: 'SOLUTION + TECHNOLOGIES',
      brief_label_archi: 'ARCHITECTURE',
      archi_zoom_hint: 'Cliquer pour zoomer',
      contact_sub: 'Intéressé à travailler ensemble ? Discutons-en. Je paie le café.',
      hero_scroll: 'Faites défiler pour en savoir plus',
      footer_text: '&copy; <span class="footer-highlight-pink">2026</span> Hamza Hssaini. <span class="footer-highlight-blue">All</span> rights reserved.<br>Construit <span class="footer-highlight-blue">avec</span> Node.js · CI/CD via GitHub Actions.',
      search_placeholder: 'Rechercher par mots-clés',
      btn_see_all: 'Voir tous les projets',
      form_success_title: 'Message Envoyé !',
      form_success_msg: 'Merci de m\'avoir contacté. Votre message a été envoyé avec succès.',
      form_error_title: 'Échec de l\'envoi',
      form_error_msg: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard ou me contacter via LinkedIn.',
      form_sending: 'Envoi en cours...',
      about_text: `
        <p>
          Bonjour ! Je suis Hamza, spécialiste Cloud & DevOps avec une solide expérience en systèmes, réseaux,
          environnements Azure et administration Microsoft 365. Je travaille sur des projets concrets de migration
          vers le cloud, le déploiement d'architectures hybrides Azure, l'automatisation d'infrastructures avec
          Terraform et Ansible, et la mise en place de pipelines CI/CD résilients.
        </p>
        <p>
          Passionné par la résolution de problèmes et la culture DevOps, je m'efforce de fournir des solutions
          fiables et performantes.
        </p>
        <p>
          En dehors des projets cloud, j'aime explorer de nouvelles technologies, contribuer à l'open-source et
          développer mes compétences en sécurité cloud et automatisation d'infrastructures.
        </p>
        <p>
          Mon expertise actuelle porte sur Amazon Web Services, Azure et les architectures cloud-native.
        </p>
      `,
      more: 'Voir plus',
      less: 'Réduire',
      form_name: 'Nom Complet',
      contact_mail_label: 'M\'envoyer un mail',
      email_copied: 'Copié !',
      phone_copied: 'Copié !',

      // Section 2 — Proof of Engineering
      mindset_title: 'Ma façon de travailler : mode opératoire DevOps',
      mindset_subtitle: 'Livraison de niveau production, avec des standards clairs et des résultats mesurables.',
      mindset_pillar_1_title: 'Infrastructure as Code',
      mindset_pillar_1_desc: 'Terraform & Ansible pour des environnements reproductibles et versionnés',
      mindset_pillar_2_title: 'Approche CI/CD d’abord',
      mindset_pillar_2_desc: 'Build, tests et déploiements automatisés avec GitHub Actions / GitLab CI',
      mindset_pillar_3_title: 'Sécurité par conception',
      mindset_pillar_3_desc: 'IAM, segmentation réseau, VPN et accès au moindre privilège',
      mindset_pillar_4_title: 'Optimisation coûts & performance',
      mindset_pillar_4_desc: 'Right-sizing, monitoring et maîtrise des coûts cloud',
      mindset_pillar_5_title: 'Documentation prête pour la production',
      mindset_pillar_5_desc: 'READMEs clairs, schémas et notes opérationnelles'
    }
  };

  // --- CV Dropdown (3 resume versions) ---
  (function bindCvDropdown() {
    const button = document.getElementById('cvMenuButton');
    const menu = document.getElementById('cvMenu');
    if (!button || !menu) return;

    function closeMenu() {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');

      // Smart positioning: keep the menu visible in the viewport.
      // Default CSS opens to the right; if it would overflow, flip to the left.
      try {
        menu.classList.remove('is-left');
        if (window.matchMedia && window.matchMedia('(max-width: 520px)').matches) return;
        const rect = menu.getBoundingClientRect();
        const padding = 12;
        if (rect.right > (window.innerWidth - padding)) {
          menu.classList.add('is-left');
        }
      } catch (e) { }
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menu.hidden === false;
      if (isOpen) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', (e) => {
      if (menu.hidden) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (button.contains(target) || menu.contains(target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (menu.hidden) return;
      closeMenu();
      button.focus();
    });

    // Close after selecting an option
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => closeMenu());
    });
  })();

  function applyLanguage(lang) {
    const map = I18N[lang] || I18N.fr;

    // Also support lightweight bilingual blocks (data-en/data-fr) used in the new Projects + Gallery.
    function applyBilingualBlocks(code) {
      const normalized = code === 'en' ? 'en' : 'fr';
      const attr = normalized === 'en' ? 'data-en' : 'data-fr';
      document.querySelectorAll('[' + attr + ']').forEach(el => {
        const val = el.getAttribute(attr);
        if (val == null) return;
        // Only set textContent (captions/titles are plain text).
        el.textContent = val;
      });
    }

    // Keep the document language in sync for accessibility/SEO.
    try {
      document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'fr');
    } catch (e) { }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!map[key]) return;
      const val = map[key];
      if (key === 'about_text' || key === 'footer_text') {
        el.innerHTML = val;
        return;
      }
      if (String(val).includes('{year}')) {
        const html = String(val).replace('{year}', new Date().getFullYear());
        el.innerHTML = html;
      } else {
        el.textContent = val;
      }
    });
    const search = document.getElementById('projectSearch');
    if (search) search.placeholder = map.search_placeholder || '';

    // Re-render education
    renderEducation(lang);
    // Re-render projects with selected language
    if (typeof window.updateProjectsLanguage === 'function') {
      window.updateProjectsLanguage(lang);
    }
    // Update any 'More/Less' toggles to use the current language labels
    try {
      const moreLabel = (map.more) ? map.more : 'More';
      const lessLabel = (map.less) ? map.less : 'Less';
      document.querySelectorAll('.ref-more').forEach(btn => {
        const descWrap = btn.closest('.card') ? btn.closest('.card').querySelector('.ref-description') : null;
        const isExpanded = descWrap && descWrap.classList && descWrap.classList.contains('expanded');
        btn.textContent = isExpanded ? lessLabel : moreLabel;
        btn.setAttribute('aria-label', isExpanded ? lessLabel : moreLabel);
      });
    } catch (e) { }

    // Apply bilingual (data-en/data-fr) blocks after normal i18n.
    try { applyBilingualBlocks(lang); } catch (e) { }

    // If a screenshot viewer is open, refresh its caption.
    try {
      if (typeof window.updateRwViewerCaption === 'function') {
        window.updateRwViewerCaption();
      }
    } catch (e) { }

  }

  // One-time micro "spark" on first interaction with proof buttons (per session).
  // Keeps it subtle and disables automatically for reduced-motion.
  function initProjectsProofSpark() {
    try {
      if (!document.querySelector('#projects .rw-btn')) return;

      const reduceMotion = (() => {
        try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
        catch (e) { return false; }
      })();
      if (reduceMotion) return;

      const key = 'rwProofSparkSeen';
      try {
        if (sessionStorage.getItem(key) === '1') return;
      } catch (e) { /* ignore */ }

      let done = false;
      document.addEventListener('pointerover', (ev) => {
        if (done) return;
        const target = ev.target;
        if (!(target instanceof Element)) return;
        const btn = target.closest('#projects .rw-btn');
        if (!btn) return;

        done = true;
        try { sessionStorage.setItem(key, '1'); } catch (e) { }

        btn.classList.add('rw-btn--spark');
        window.setTimeout(() => {
          try { btn.classList.remove('rw-btn--spark'); } catch (e) { }
        }, 950);
      }, { passive: true });
    } catch (e) { /* silent */ }
  }

  // Projects galleries: open screenshots inside the same window (no new tab)
  // with a dedicated viewer overlay that shows full image + caption.
  function initRwGalleryViewer() {
    try {
      const viewer = document.getElementById('rw-viewer');
      if (!viewer) return;

      const surface = viewer.querySelector('.rw-viewer-surface');
      const img = viewer.querySelector('.rw-viewer-img');
      const cap = viewer.querySelector('.rw-viewer-cap');
      const closeBtn = viewer.querySelector('.rw-viewer-close');
      if (!surface || !img || !cap || !closeBtn) return;

      let lastCaptionEl = null;

      function isOpen() {
        return viewer.classList.contains('is-open');
      }

      function setCaptionFromEl(captionEl) {
        lastCaptionEl = captionEl;
        const txt = captionEl ? (captionEl.textContent || '') : '';
        cap.textContent = txt;
      }

      function openViewer(fullSrc, captionEl) {
        if (fullSrc) img.src = fullSrc;
        img.alt = '';
        setCaptionFromEl(captionEl);
        viewer.classList.add('is-open');
        viewer.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
      }

      function closeViewer() {
        viewer.classList.remove('is-open');
        viewer.setAttribute('aria-hidden', 'true');
        try { img.removeAttribute('src'); } catch (e) { }
        lastCaptionEl = null;
      }

      // Expose a hook so language switching can refresh caption text
      window.updateRwViewerCaption = function () {
        try {
          if (!isOpen()) return;
          if (!lastCaptionEl) return;
          cap.textContent = lastCaptionEl.textContent || '';
        } catch (e) { }
      };

      // Close interactions
      closeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        closeViewer();
      });
      viewer.addEventListener('click', (ev) => {
        // click outside surface closes
        const target = ev.target;
        if (!(target instanceof Node)) return;
        if (surface.contains(target)) return;
        closeViewer();
      });
      document.addEventListener('keydown', (ev) => {
        if (!isOpen()) return;
        if (ev.key === 'Escape') closeViewer();
      });

      // Intercept gallery screenshot clicks
      document.addEventListener('click', (ev) => {
        const target = ev.target;
        if (!(target instanceof Element)) return;
        const link = target.closest('a.rw-shot-link');
        if (!link) return;
        ev.preventDefault();

        const figure = link.closest('figure.rw-shot');
        const captionEl = figure ? figure.querySelector('.rw-cap') : null;
        const fullSrc = link.getAttribute('href') || '';
        openViewer(fullSrc, captionEl);
      });
    } catch (e) {
      // silent
    }
  }

  // Projects proof modals (Gallery / CI-CD / Architecture) are implemented as CSS :target.
  // The close button currently points to #projects which causes an unwanted scroll jump.
  // Fix: intercept close + Esc/backdrop and clear the hash via history.replaceState (no scroll).
  function initRwTargetModals() {
    try {
      function getActiveRwModalFromHash() {
        try {
          const hash = String(window.location.hash || '');
          if (!hash || hash.length < 2) return null;
          const el = document.querySelector(hash);
          if (!el || !(el instanceof Element)) return null;
          if (!el.classList.contains('rw-modal')) return null;
          return el;
        } catch (e) {
          return null;
        }
      }

      function closeTargetModalKeepScroll() {
        const y = window.scrollY || 0;
        const x = window.scrollX || 0;

        const activeModal = getActiveRwModalFromHash();
        if (!activeModal) return;

        try {
          // 1) Change the hash so CSS :target updates and the modal closes.
          // Use a non-existent id to avoid scrolling.
          window.location.hash = 'rw-closed';
        } catch (e) { /* ignore */ }

        try {
          // 2) Remove the hash from the URL (optional, keeps URL clean).
          const base = String(window.location.href || '').split('#')[0];
          if (window.history && typeof window.history.replaceState === 'function') {
            window.history.replaceState(null, '', base);
          }
        } catch (e) { /* ignore */ }

        // Extra safety: restore scroll position in case the browser tries to jump.
        try {
          window.requestAnimationFrame(() => {
            try { window.scrollTo(x, y); } catch (e) { }
          });
        } catch (e) { }
      }

      document.addEventListener('click', (ev) => {
        const rawTarget = ev.target;
        const target = (rawTarget instanceof Element)
          ? rawTarget
          : (rawTarget && rawTarget.parentElement ? rawTarget.parentElement : null);
        if (!target) return;

        // Close button (X)
        const closeLink = target.closest('a.rw-modal-close');
        if (closeLink) {
          ev.preventDefault();
          closeTargetModalKeepScroll();
          return;
        }

        // Backdrop click (click outside the modal surface)
        const modal = target.closest('.rw-modal');
        if (!modal) return;
        if (typeof modal.matches === 'function' && !modal.matches(':target')) return;

        const surface = modal.querySelector('.rw-modal-surface');
        if (surface && surface.contains(target)) return;
        ev.preventDefault();
        closeTargetModalKeepScroll();
      });

      document.addEventListener('keydown', (ev) => {
        if (ev.key !== 'Escape') return;
        if (!getActiveRwModalFromHash()) return;
        ev.preventDefault();
        closeTargetModalKeepScroll();
      });
    } catch (e) {
      // silent
    }
  }

  function createControls() {
    try { console.log('createControls: initializing'); } catch (e) { }
    if (document.getElementById('controlsRoot')) return;
    const controlsRoot = document.createElement('div');
    controlsRoot.id = 'controlsRoot';
    const headerInner = document.querySelector('.header-inner');

    // Theme button (will render polished SVG icons)
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggle';
    themeBtn.className = 'control-btn theme-btn';
    themeBtn.type = 'button';
    themeBtn.setAttribute('aria-label', 'Toggle theme');
    themeBtn.innerHTML = '<span class="control-icon svg-icon" aria-hidden="true"></span>';

    // Language button (compact neutral flag icons for EN / FR)
    const langBtn = document.createElement('div');
    langBtn.id = 'langToggle';
    langBtn.className = 'lang-btn';
    // Inline SVG flags (compact, professional). Keep a visually-hidden text label for screen readers.
    // Flag SVGs replaced by text as per user request.
    langBtn.innerHTML = `
      <button class="flag text-mode" data-lang="en" aria-label="Switch to English" title="English" style="font-size: 0.75rem; font-weight: 800; font-family: sans-serif;">
        EN
      </button>
      <button class="flag text-mode" data-lang="fr" aria-label="Passer en Français" title="Français" style="font-size: 0.75rem; font-weight: 800; font-family: sans-serif;">
        FR
      </button>
    `;

    // Attach handlers
    // helper: SVG icons as strings
    function themeSvg(isDark) {
      if (isDark) {
        // moon (dark)
        return `
          <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      }
      // sun (light)
      return `
        <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
          <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M4.93 4.93l1.41 1.41"></path>
            <path d="M17.66 17.66l1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="M4.93 19.07l1.41-1.41"></path>
            <path d="M17.66 6.34l1.41-1.41"></path>
          </g>
        </svg>`;
    }

    // language badges click handling (EN / FR)
    langBtn.querySelectorAll('.flag').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = btn.getAttribute('data-lang');
        if (!code) return;
        localStorage.setItem('lang', code);
        // visual active state
        langBtn.querySelectorAll('.flag').forEach(f => f.classList.remove('active'));
        btn.classList.add('active');
        applyLanguage(code);
      });
      // keyboard: space/enter
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
      // add a visually-hidden label for screen readers (helps when using icon-only buttons)
      const label = document.createElement('span');
      label.className = 'visually-hidden';
      label.textContent = btn.getAttribute('title') || btn.getAttribute('aria-label') || '';
      btn.appendChild(label);
    });

    const langContainer = document.createElement('div');
    langContainer.className = 'controls-language';
    langContainer.appendChild(langBtn);
    controlsRoot.appendChild(themeBtn);
    controlsRoot.appendChild(langContainer);

    if (headerInner) {
      const holder = headerInner.querySelector('.controls');
      try { console.log('createControls: headerInner found, appending controls'); } catch (e) { }
      if (holder) holder.appendChild(controlsRoot);
      else headerInner.appendChild(controlsRoot);
    } else {
      try { console.log('createControls: headerInner not found, attaching fixed'); } catch (e) { }
      controlsRoot.classList.add('fixed');
      document.body.appendChild(controlsRoot);
    }

    // Initialize visual state
    const savedLang = localStorage.getItem('lang') || 'fr';
    // set active badge according to saved language
    langBtn.querySelectorAll('.flag').forEach(f => {
      if (f.getAttribute('data-lang') === savedLang) f.classList.add('active');
      else f.classList.remove('active');
    });
    applyLanguage(savedLang);
    const savedTheme = localStorage.getItem('theme');
    const isDarkNow = document.documentElement.getAttribute('data-theme') === 'dark';
    const themeIconHolder = themeBtn.querySelector('.svg-icon');
    if (themeIconHolder) themeIconHolder.innerHTML = themeSvg(isDarkNow);

    // update theme icon when toggled
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextDark = !isDark;
      if (nextDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
      if (themeIconHolder) themeIconHolder.innerHTML = themeSvg(nextDark);
    });
  }

  // Create controls after rendering.
  createControls();

  // --- Contact Form Handling ---
  const contactForm = document.querySelector('.clean-form');
  if (contactForm) {
    const originalFormHTML = contactForm.innerHTML;

    contactForm.addEventListener('submit', async function handleSubmit(e) {
      e.preventDefault();

      const lang = localStorage.getItem('lang') || 'fr';
      const map = I18N[lang] || I18N.fr;

      // Disable button and show sending state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `< span > ${map.form_sending}</span > `;

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Show success state UI
          const successHTML = `
      < div class="form-success reveal visible" >
               <div class="success-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
               </div>
               <h3>${map.form_success_title}</h3>
               <p>${map.form_success_msg}</p>
            </div >
      `;
          contactForm.innerHTML = successHTML;

          // Revert to fresh form and scroll to top after 5 seconds
          setTimeout(() => {
            contactForm.innerHTML = originalFormHTML;
            // Clear any potential leftover values (though re-injecting HTML should do it)
            contactForm.reset?.();

            applyLanguage(localStorage.getItem('lang') || 'fr');
            contactForm.addEventListener('submit', handleSubmit);

            // "back to the page principal show clean"
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 5000);
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        // Show error state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-msg';
        errorDiv.style.color = 'var(--accent-red, #ff4d4d)';
        errorDiv.style.marginTop = '1rem';
        errorDiv.textContent = map.form_error_msg;

        // Remove existing error if any
        const existingError = contactForm.querySelector('.form-error-msg');
        if (existingError) existingError.remove();

        contactForm.appendChild(errorDiv);

        setTimeout(() => { if (errorDiv) errorDiv.remove(); }, 6000);
      }
    });

    // Email Copy Logic
    const emailCard = document.getElementById('emailCard');
    if (emailCard) {
      emailCard.addEventListener('click', () => {
        const email = "hamzahssaini0@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
          const feedback = emailCard.querySelector('.copy-feedback');
          const value = emailCard.querySelector('.detail-value');
          if (feedback && value) {
            value.style.display = 'none';
            feedback.style.display = 'inline';
            setTimeout(() => {
              feedback.style.display = 'none';
              value.style.display = 'inline';
            }, 2000);
          }
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    }

    // Phone Copy Logic
    const phoneCard = document.getElementById('phoneCard');
    if (phoneCard) {
      phoneCard.addEventListener('click', async () => {
        const valueEl = phoneCard.querySelector('.detail-value');
        const feedbackEl = phoneCard.querySelector('.copy-feedback');
        const phone = valueEl ? String(valueEl.textContent || '').trim() : '';
        if (!phone) return;

        try {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(phone);
          } else {
            const ta = document.createElement('textarea');
            ta.value = phone;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '-1000px';
            ta.style.left = '-1000px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }

          if (feedbackEl && valueEl) {
            valueEl.style.display = 'none';
            feedbackEl.style.display = 'inline';
            setTimeout(() => {
              feedbackEl.style.display = 'none';
              valueEl.style.display = 'inline';
            }, 2000);
          }
        } catch (err) {
          console.error('Failed to copy phone: ', err);
        }
      });
    }
  }

  // --- Final CTA: Copy email / phone ---
  (function initFinalCtaCopy() {
    const root = document.getElementById('contact');
    if (!root) return;

    const emailBtn = document.getElementById('ctaEmailCopy');
    const phoneBtn = document.getElementById('ctaPhoneCopy');

    async function copyText(text) {
      const value = String(text || '').trim();
      if (!value) return false;

      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(value);
          return true;
        }

        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.left = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return true;
      } catch (err) {
        try { console.error('Copy failed:', err); } catch (e) { }
        return false;
      }
    }

    function flashCopied(el) {
      if (!el) return;
      el.classList.add('is-copied');
      window.setTimeout(() => el.classList.remove('is-copied'), 1600);
    }

    function attachCopyAndLongPress(el, opts) {
      if (!el) return;
      const copySelector = opts.copySelector || '[data-copy-value]';
      const longPressHref = opts.longPressHref || '';
      const longPressMs = typeof opts.longPressMs === 'number' ? opts.longPressMs : 650;

      let longPressTimer = null;
      let didLongPress = false;

      function clearTimer() {
        if (longPressTimer) {
          window.clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      }

      function startLongPress(e) {
        didLongPress = false;
        clearTimer();

        // Only enable long-press behavior on touch.
        // Pointer Events: pointerType === 'touch'.
        // Touch Events fallback: touchstart has no pointerType.
        const isTouch = (e && e.pointerType === 'touch') || (e && e.type === 'touchstart');
        if (!isTouch || !longPressHref) return;

        longPressTimer = window.setTimeout(() => {
          didLongPress = true;
          try {
            window.location.href = longPressHref;
          } catch (err) {
            // no-op
          }
        }, longPressMs);
      }

      function cancelLongPress() {
        clearTimer();
      }

      el.addEventListener('pointerdown', startLongPress);
      el.addEventListener('pointerup', cancelLongPress);
      el.addEventListener('pointercancel', cancelLongPress);
      el.addEventListener('pointerleave', cancelLongPress);
      el.addEventListener('touchstart', startLongPress, { passive: true });
      el.addEventListener('touchend', cancelLongPress);

      el.addEventListener('click', async (e) => {
        if (didLongPress) {
          // Avoid copying after the long-press already opened the app.
          didLongPress = false;
          return;
        }
        const valueEl = el.querySelector(copySelector);
        const ok = await copyText(valueEl ? valueEl.getAttribute('data-copy-value') : '');
        if (ok) flashCopied(el);
      });
    }

    attachCopyAndLongPress(emailBtn, {
      longPressHref: 'mailto:hamzahssaini0@gmail.com',
      copySelector: '[data-copy-value]',
      longPressMs: 650,
    });

    attachCopyAndLongPress(phoneBtn, {
      longPressHref: 'tel:+212766991541',
      copySelector: '[data-copy-value]',
      longPressMs: 650,
    });
  })();

  // debounce helper
  function debounce(fn, ms = 200) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  if (searchInput) {
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => applyFilters(), 180));
    }
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => { if (searchInput) searchInput.value = ''; applyFilters(); });
  }

  // Build images list for lightbox navigation
  const IMAGES = PROJECTS.filter(p => p.img && !(p.gallery && p.gallery.length > 0)).map(p => ({ src: p.img, alt: p.title }));
  let currentIndex = -1;
  // when opening a project's gallery, store it here
  let currentGallery = null;

  // --- Senior Engineering Review Panel & Advanced Lightbox Logic ---
  const briefModal = document.getElementById('briefModal');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxContainer = document.getElementById('lightboxContainer');

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX, startY;

  function openBriefModal(id) {
    const p = PROJECTS.find(proj => proj.id === id);
    if (!p || !briefModal) return;

    const lang = localStorage.getItem('lang') || 'fr';
    const loc = (f) => {
      if (!f) return '';
      if (typeof f === 'object' && !Array.isArray(f)) return f[lang] || f.en || '';
      if (Array.isArray(f)) return f; // Pass through arrays for list helpers
      return f;
    };

    // Helper to render lists consistently
    const renderList = (data, elementId) => {
      const el = document.getElementById(elementId);
      if (!el) return;
      let content = loc(data);
      if (!content || (Array.isArray(content) && content.length === 0)) {
        const labels = {
          en: "Details available in project documentation.",
          fr: "Détails disponibles dans la documentation du projet."
        };
        content = [labels[lang] || labels.en];
      }
      if (!Array.isArray(content)) content = [content];
      const html = content.map(item => {
        let text = escapeHtml(loc(item));
        // Handle basic bolding **text**
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `< li > ${text}</li > `;
      }).join('');
      el.innerHTML = `< ul > ${html}</ul > `;
    };

    // Populate Header
    const titleEl = document.getElementById('briefModalTitle');
    if (titleEl) titleEl.textContent = loc(p.title) || "Project Review";

    // 1. Problem Statement (2-3 bullets)
    renderList(p.problem, 'briefModalProblem');

    // 2. Impact & Results (Quantified metrics only)
    renderList(p.impact, 'briefModalImpact');

    // 4. Solution + Technologies
    const solEl = document.getElementById('briefModalSolution');
    if (solEl) solEl.textContent = loc(p.solution) || loc(p.desc);

    // Populate Tech stack inside solution quadrant
    const techEl = document.getElementById('briefModalTech');
    if (techEl) {
      const tech = p.tech || [];
      techEl.innerHTML = tech.length > 0
        ? tech.map(t => `< span class="brief-badge" > ${escapeHtml(t)}</span > `).join('')
        : `< span class="brief-badge" > Cloud Native</span > `;
    }

    // Populate Architecture Image & Caption
    const archiImg = document.getElementById('briefModalArchiImg');
    const archiCaption = document.getElementById('briefModalArchiCaption');
    const archiPreview = document.querySelector('.brief-archi-preview');
    const expandArchi = document.getElementById('briefExpandArchi');
    const downArchi = document.getElementById('briefDownloadArchi');
    const imgUrl = p.img || (Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery[0] : '');

    if (archiImg && archiPreview) {
      const existingMsg = archiPreview.querySelector('.no-diag-msg');
      if (existingMsg) existingMsg.remove();

      if (imgUrl) {
        archiImg.src = imgUrl;
        archiImg.style.display = 'block';
        archiPreview.style.cursor = 'zoom-in';
        archiPreview.onclick = () => openLightbox(imgUrl, loc(p.title));

        if (expandArchi) {
          expandArchi.style.display = 'flex';
          expandArchi.onclick = (e) => {
            e.stopPropagation();
            openLightbox(imgUrl, loc(p.title));
          };
        }

        if (downArchi) {
          downArchi.style.display = 'flex';
          downArchi.onclick = (e) => {
            e.stopPropagation();
            const link = document.createElement('a');
            link.href = imgUrl;
            link.download = imgUrl.split('/').pop() || 'architecture.png';
            link.click();
          };
        }
      } else {
        archiImg.style.display = 'none';
        archiPreview.style.cursor = 'default';
        archiPreview.onclick = null;
        if (expandArchi) expandArchi.style.display = 'none';
        if (downArchi) downArchi.style.display = 'none';

        const msg = document.createElement('div');
        msg.className = 'no-diag-msg';
        msg.style.color = 'var(--text-secondary)';
        msg.style.fontSize = '0.75rem';
        msg.style.textAlign = 'center';
        msg.style.padding = '20px';
        msg.textContent = (lang === 'en')
          ? 'Architecture diagram available in technical documentation.'
          : 'Schéma d\'architecture disponible dans la documentation technique.';
        archiPreview.appendChild(msg);
      }
      archiImg.alt = loc(p.title);
    }

    if (archiCaption) {
      const cap = loc(p.archiCaption);
      archiCaption.textContent = cap || "";
      archiCaption.style.display = cap ? 'block' : 'none';
    }

    // GitHub Link
    const ghLink = document.getElementById('briefGithubLink');
    if (ghLink) {
      if (p.repo && p.repo !== '#') {
        ghLink.href = p.repo;
        ghLink.style.display = 'flex';
      } else {
        ghLink.style.display = 'none';
      }
    }

    briefModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBriefModal() {
    if (briefModal) briefModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openLightbox(src, title) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    const titleEl = document.getElementById('lightboxProjectTitle');
    if (titleEl) titleEl.textContent = title || 'Architecture Review';

    const downLink = document.getElementById('lightboxDownload');
    if (downLink) {
      downLink.href = src;
      downLink.download = src.split('/').pop() || 'diagram.png';
    }

    // Reset transform
    scale = 1; translateX = 0; translateY = 0;
    applyTransform();

    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  function applyTransform() {
    if (scale <= 1) { scale = 1; translateX = 0; translateY = 0; }
    lightboxContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  // Zooming
  const updateZoom = (dir) => {
    const prevScale = scale;
    scale = Math.min(4, Math.max(1, scale + dir * 0.4));
    applyTransform();
  };

  document.getElementById('lightboxZoomIn')?.addEventListener('click', () => updateZoom(1));
  document.getElementById('lightboxZoomOut')?.addEventListener('click', () => updateZoom(-1));
  document.getElementById('closeLightbox')?.addEventListener('click', closeLightbox);
  document.getElementById('closeBriefModal')?.addEventListener('click', closeBriefModal);

  // Panning with Momentum (Inertia)
  let velocityX = 0, velocityY = 0;
  let lastX = 0, lastY = 0;
  let lastTime = 0;

  const startPan = (x, y) => {
    if (scale > 1) {
      isDragging = true;
      startX = x - translateX;
      startY = y - translateY;
      lastX = x;
      lastY = y;
      lastTime = performance.now();
      velocityX = 0;
      velocityY = 0;
      lightboxContainer.style.transition = 'none';
    }
  };

  const movePan = (x, y) => {
    if (isDragging) {
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocityX = (x - lastX) / dt;
        velocityY = (y - lastY) / dt;
      }
      lastX = x;
      lastY = y;
      lastTime = now;

      translateX = x - startX;
      translateY = y - startY;
      applyTransform();
    }
  };

  const endPan = () => {
    if (!isDragging) return;
    isDragging = false;

    // Simple momentum simulation
    if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
      const decay = 0.95;
      const step = () => {
        if (isDragging) return;
        translateX += velocityX * 16;
        translateY += velocityY * 16;
        velocityX *= decay;
        velocityY *= decay;
        applyTransform();
        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
    lightboxContainer.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
  };

  // Attach events
  lightboxContainer?.addEventListener('mousedown', (e) => startPan(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => movePan(e.clientX, e.clientY));
  window.addEventListener('mouseup', endPan);

  // Touch Support
  lightboxContainer?.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startPan(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) movePan(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchend', endPan);

  // Mouse Wheel Zoom
  lightboxModal?.addEventListener('wheel', (e) => {
    if (lightboxModal.classList.contains('active')) {
      e.preventDefault();
      updateZoom(e.deltaY < 0 ? 1 : -1);
    }
  }, { passive: false });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); closeBriefModal(); }
    if (lightboxModal?.classList.contains('active')) {
      if (e.key === '+' || e.key === '=') updateZoom(1);
      if (e.key === '-') updateZoom(-1);
    }
  });

  // Handle Backdrop clicks
  briefModal?.addEventListener('click', (e) => { if (e.target === briefModal) closeBriefModal(); });
  lightboxModal?.addEventListener('click', (e) => {
    // Close only if clicking the overlay itself (not the window content)
    if (e.target === lightboxModal) closeLightbox();
  });

  // --- Scroll Reveal Animation ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When visible, remove the hidden class and add visible
        entry.target.classList.remove('hero-hidden');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    // Progressive enhancement: Hide elements via JS so they can animate in.
    // If JS is blocked, they remain visible (CSS default).
    el.classList.add('hero-hidden');
    observer.observe(el);
  });

  // --- Metrics (Impact) Count-Up Animation ---
  // Subtle: triggers once per metric when it enters viewport.
  // If reduced motion is enabled, values stay static.
  (function initImpactMetricsCountUp() {
    try {
      const section = document.getElementById('metrics-impact');
      if (!section) return;

      const numbers = Array.from(section.querySelectorAll('.impact-metric-number[data-target]'));
      if (!numbers.length) return;

      const reduceMotion = (() => {
        try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
        catch (e) { return false; }
      })();

      function formatMetric(target, suffix, forcePlus) {
        const n = Number(target);
        const abs = Math.abs(Math.round(n));
        const isNeg = n < 0;
        const prefix = isNeg ? '−' : (forcePlus ? '+' : '');
        return prefix + String(abs) + (suffix || '');
      }

      // Ensure default text is the real value (not placeholders).
      numbers.forEach((el) => {
        const target = Number(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const forcePlus = el.getAttribute('data-plus') === '1';
        const finalText = formatMetric(target, suffix, forcePlus);
        el.setAttribute('data-final', finalText);
        // Keep what's in HTML if already correct; otherwise enforce.
        if (!el.textContent || el.textContent.trim() === '0%' || el.textContent.trim() === '0') {
          el.textContent = finalText;
        }
      });

      if (reduceMotion) return;

      function animateToTarget(el) {
        const target = Number(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const forcePlus = el.getAttribute('data-plus') === '1';
        const durationMs = 900;

        const startValue = 0;
        const endValue = target;

        // Reset to 0 right before animation (element is visible now).
        el.textContent = (forcePlus ? '+' : '') + '0' + suffix;

        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / durationMs);
          // Ease-out (cubic)
          const eased = 1 - Math.pow(1 - t, 3);
          const current = startValue + (endValue - startValue) * eased;
          const text = formatMetric(current, suffix, forcePlus);
          el.textContent = text;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = formatMetric(endValue, suffix, forcePlus);
        }
        requestAnimationFrame(tick);
      }

      let ran = false;
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (ran) return;
          ran = true;
          sectionObserver.disconnect();
          numbers.forEach(el => animateToTarget(el));
        });
      }, {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px'
      });

      sectionObserver.observe(section);
    } catch (e) {
      // silent fail
    }
  })();

  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (window.scrollY > 50) {
      if (isDark) {
        header.style.background = 'rgba(10, 10, 10, 0.85)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      }
    } else {
      if (isDark) {
        header.style.background = 'rgba(10, 10, 10, 0.65)';
        header.style.boxShadow = 'none';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.85)';
        header.style.boxShadow = 'none';
      }
    }
  });

  // --- Utils ---
  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Set current year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Initial render & Localization
  const initialLang = localStorage.getItem('lang') || 'fr';
  applyLanguage(initialLang);

  // Enhance Projects proof links after language is applied.
  initProjectsProofSpark();

  // Enable in-page screenshot viewer for Projects galleries.
  initRwGalleryViewer();

  // Prevent "close" from scrolling to #projects.
  initRwTargetModals();

});