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
      shortTitle: { en: 'Scalable AWS Platform', fr: 'Plateforme AWS scalable' },
      title: 'Scalable Containerized Platform on AWS',
      date: '2025',
      type: 'Personal',
      desc: {
        en: 'Deployed a highly-available containerized multi-tier web application on AWS with CI/CD, secure secret management and centralized observability using CloudWatch and EBS-backed storage.',
        fr: 'Déploiement d\'une application web multicouche conteneurisée hautement disponible sur AWS, avec CI/CD, gestion sécurisée des secrets et observabilité centralisée.'
      },
      tech: ['AWS', 'Ansible', 'Docker', 'Node.js', 'GitHub Actions', 'CloudWatch', 'EBS'],
      repo: 'https://github.com/hamzahssaini/kubernetes-K8s-nodejs-mongodb-ci-cd',
      img: '/assets/images/kubernetes.png',
      gallery: ['/assets/images/kubernetes.png', '/assets/images/archi.png']
    },
    {
      shortTitle: { en: 'Azure Hybrid Infrastructure', fr: 'Infrastructure Hybride Azure' },
      title: 'Azure Hybrid Hub-and-Spoke Infrastructure',
      date: '2023',
      type: 'Personal',
      desc: {
        en: 'Designed and implemented secure hybrid connectivity between on-premises datacenters and Azure using Site-to-Site VPN, Hub-and-Spoke networking, and NSG-based segmentation.',
        fr: 'Conception et mise en œuvre d\'une connectivité hybride sécurisée entre sites et Azure via VPN site-à-site, architecture Hub-and-Spoke et segmentation NSG.'
      },
      tech: ['Azure', 'VPN Gateway', 'VNet', 'NSG', 'Azure Firewall', 'Routing'],
      repo: 'https://github.com/hamzahssaini/azure-nginx-deployment-with-ansible',
      img: '/assets/images/archi.png'
    },
    {
      shortTitle: { en: 'Ansible AWS Automation', fr: 'Automatisation Ansible AWS' },
      title: 'Ansible AWS Automation',
      date: '2024 - present',
      type: 'Personal',
      desc: {
        en: 'Automated provisioning and hardening of AWS EC2 servers using Ansible with dynamic inventories and secrets managed via Ansible Vault. Includes services like Nginx, Docker, MySQL and Redis.',
        fr: 'Automatisation du provisionnement et sécurisation de serveurs AWS EC2 avec Ansible, inventaire dynamique et gestion des secrets via Ansible Vault (Nginx, Docker, MySQL, Redis).'
      },
      tech: ['Ansible', 'AWS EC2', 'Linux', 'MySQL', 'Redis'],
      repo: 'https://github.com/hamzahssaini/ansible-aws-devops',
      img: ''
    },
    {
      shortTitle: { en: 'Azure App Service Migration', fr: 'Migration Azure App Service' },
      title: 'Migration Azure App Service',
      date: '2022 - 2023',
      type: 'Personal',
      desc: {
        en: 'Rehost and refactor migration to Azure App Service delivering +30% performance and -20% cost savings through optimized pipelines and application tuning.',
        fr: 'Migration "Rehost & Refactor" vers Azure App Service avec +30% de performance et -20% de coût via pipelines optimisés et tuning applicatif.'
      },
      tech: ['Azure App Service', 'GitHub Actions', 'Node.js'],
      repo: '#',
      img: ''
    },
    {
      shortTitle: { en: 'Kubernetes Orchestration', fr: 'Orchestration K8s' },
      title: 'K8s & Node.js Orchestration',
      date: '2024 - 2025',
      type: 'Personal',
      desc: {
        en: 'Containerized a Node.js/MongoDB app and deployed it to Kubernetes with Ingress, readiness/liveness probes and high-availability configuration as part of end-of-study internship.',
        fr: 'Conteneurisation d\'une application Node.js/MongoDB et déploiement sur Kubernetes avec Ingress, sondes et configuration haute disponibilité (stage de fin d\'études).'
      },
      tech: ['Kubernetes', 'Docker', 'MongoDB', 'Ingress'],
      repo: '#',
      img: ''
    }
  ];

  // --- Render Projects ---
  const grid = document.getElementById('projectsGrid');
  if (!grid) {
    try {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const err = document.createElement('div');
        err.style.padding = '12px';
        err.style.background = '#fff3cd';
        err.style.color = '#664d03';
        err.style.border = '1px solid #ffeeba';
        err.style.borderRadius = '6px';
        err.textContent = 'projectsGrid not found: projects will not render. Check DOM id `projectsGrid`.';
        projectsSection.insertBefore(err, projectsSection.firstChild);
      }
    } catch (e) { }
  }
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

    const linkIcon = hasRepo
      ? `<button class="ref-icon-btn link-trigger" aria-label="View Project" title="View Project">
           <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"></path></svg>
         </button>`
      : '';

    const showGalleryIcon = hasGallery || hasImage;
    const galleryIcon = showGalleryIcon
      ? `<button class="ref-icon-btn gallery-trigger" aria-label="View Screenshots" title="View Screenshots">
           <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
         </button>`
      : '';

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
        <div class="ref-icons">
          ${linkIcon}
          ${galleryIcon}
        </div>
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

    // Event listeners
    if (hasRepo) {
      // Make the title clickable or whole card? specific areas pref to avoid conflicts
      // We'll trust the overlay button for the repo link
    }

    // Gallery click
    if (showGalleryIcon) {
      const gbtn = card.querySelector('.gallery-trigger');
      if (gbtn) {
        gbtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const lightboxTarget = (hasGallery ? p.gallery[0] : p.img);
          const gallerySet = hasGallery ? p.gallery : (p.img ? [p.img] : []);
          openLightbox(lightboxTarget, p.title, gallerySet);
        });
      }
    }
    // Repo link click: open GitHub (or repo URL) in a new tab
    if (hasRepo) {
      const lbtn = card.querySelector('.link-trigger');
      if (lbtn) {
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

    // NOTE: overflow detection & 'More' toggle are added by renderProjects
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
    renderProjects(filtered);
  }

  // initialize search UI
  renderProjects(PROJECTS);

  // --- Education Data ---
  const EDUCATION = [
    {
      period: { fr: 'Oct 2025 – En cours', en: 'Oct 2025 – Present' },
      degree: { fr: 'Licence Professionnelle en Réseaux et Cybersécurité', en: 'Professional License in Networks & Cybersecurity' },
      school: 'Supemir | Casablanca',
      icon: '🎓'
    },
    {
      period: { fr: 'Sept 2025 – En cours', en: 'Sept 2025 – Present' },
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
      nav_contact: 'Contact',
      hero_role: 'Cloud & DevOps Specialist',
      btn_contact: 'Get in touch',
      btn_cv: 'Download CV',
      about_title: 'About Myself',
      projects_title: 'Project Highlights',
      contact_title: 'Let\'s start a project together',
      contact_sub: 'Interested in working together? We should queue up a time to chat. I’ll buy the coffee.',
      hero_scroll: 'Scroll to find out more',
      footer_text: '&copy; {year} Hamza Hssaini. Built with Node.js & GitHub Actions.',
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
      email_copied: 'Copied!'
    },
    fr: {
      nav_about: 'À propos',
      nav_projects: 'Projets',
      nav_education: 'Formation',
      nav_contact: 'Contact',
      hero_role: "Cloud & DevOps Spécialiste",
      btn_contact: 'Me contacter',
      btn_cv: 'Télécharger CV',
      about_title: 'À propos de moi',
      projects_title: 'Projets en vedette',
      contact_title: 'Commençons un projet ensemble',
      contact_sub: 'Intéressé à travailler ensemble ? Discutons-en. Je paie le café.',
      hero_scroll: 'Faites défiler pour en savoir plus',
      footer_text: '&copy; {year} Hamza Hssaini. Construit avec Node.js & GitHub Actions.',
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
      email_copied: 'Copié !'
    }
  };

  function applyLanguage(lang) {
    const map = I18N[lang] || I18N.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!map[key]) return;
      const val = map[key];
      if (key === 'about_text') {
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
    // Re-render projects with selected language so descriptions/titles update
    renderProjects(PROJECTS, lang);
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
    const flagEn = `
      <!-- Union Jack (simplified, high-contrast) -->
      <svg class="flag-icon" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect width="60" height="30" fill="#012169" />
        <!-- White diagonals -->
        <g stroke="#fff" stroke-width="6" stroke-linecap="square">
          <path d="M0 0 L60 30" />
          <path d="M60 0 L0 30" />
        </g>
        <!-- Red diagonals -->
        <g stroke="#C8102E" stroke-width="3" stroke-linecap="square">
          <path d="M0 0 L60 30" />
          <path d="M60 0 L0 30" />
        </g>
        <!-- White cross -->
        <rect x="25" y="0" width="10" height="30" fill="#fff" />
        <rect x="0" y="10" width="60" height="10" fill="#fff" />
        <!-- Red cross overlay -->
        <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
        <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
      </svg>`;

    const flagFr = `
      <svg class="flag-icon" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <rect width="8" height="16" x="0" fill="#0055A4" />
        <rect width="8" height="16" x="8" fill="#FFFFFF" />
        <rect width="8" height="16" x="16" fill="#EF4135" />
      </svg>`;

    langBtn.innerHTML = `
      <button class="flag" data-lang="en" aria-label="Switch to English" title="English">
        ${flagEn}
        <span class="visually-hidden">English</span>
      </button>
      <button class="flag" data-lang="fr" aria-label="Passer en Français" title="Français">
        ${flagFr}
        <span class="visually-hidden">Français</span>
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
      submitBtn.innerHTML = `<span>${map.form_sending}</span>`;

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
            <div class="form-success reveal visible">
               <div class="success-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
               </div>
               <h3>${map.form_success_title}</h3>
               <p>${map.form_success_msg}</p>
            </div>
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
  }

  // debounce helper
  function debounce(fn, ms = 200) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => applyFilters(), 180));
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => { if (searchInput) searchInput.value = ''; applyFilters(); });
  }

  // Build images list for lightbox navigation
  const IMAGES = PROJECTS.filter(p => p.img && !(p.gallery && p.gallery.length > 0)).map(p => ({ src: p.img, alt: p.title }));
  let currentIndex = -1;
  // when opening a project's gallery, store it here
  let currentGallery = null;

  // --- Lightbox / Modal wiring ---
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');

  function openLightbox(src, alt, gallery) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || '';
    // set current index for navigation
    if (gallery && Array.isArray(gallery) && gallery.length) {
      currentGallery = gallery.slice();
      currentIndex = currentGallery.findIndex(s => s === src);
    } else {
      currentGallery = null;
      currentIndex = IMAGES.findIndex(i => i.src === src);
    }
    // set caption text
    const cap = document.getElementById('lightboxCaption');
    if (cap) cap.textContent = alt || '';
    // set download link
    const down = document.getElementById('lightboxDownload');
    if (down) {
      down.href = src;
      // try to set a sensible filename
      try { down.download = src.split('/').pop() || 'image.png'; } catch (e) { down.download = 'image.png'; }
    }
    // set open-in-new-tab link
    const openLink = document.getElementById('lightboxOpen');
    if (openLink) { openLink.href = src; }

    // show images at 50% width by default to keep footer and controls visible
    try {
      modalImg.classList.add('small-img');
      modalImg.style.maxWidth = '50%';
    } catch (e) { }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!modal || !modalImg) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    modalImg.classList.remove('small-img');
    modalImg.style.maxWidth = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches && t.matches('.card-img-clickable')) {
      openLightbox(t.src, t.alt);
      return;
    }
    if (t && (t.id === 'lightboxModal' || t.classList && t.classList.contains('modal-close'))) {
      closeLightbox();
    }
  });

  // prev/next controls
  const btnPrev = document.querySelector('.modal-nav.prev');
  const btnNext = document.querySelector('.modal-nav.next');
  function showAtIndex(i) {
    // prefer currentGallery when present
    if (currentGallery && currentGallery.length) {
      const idx = (i + currentGallery.length) % currentGallery.length;
      const src = currentGallery[idx];
      if (src) openLightbox(src, '', currentGallery);
      return;
    }
    if (!IMAGES.length) return;
    const idx = (i + IMAGES.length) % IMAGES.length;
    const it = IMAGES[idx];
    if (it) openLightbox(it.src, it.alt);
  }
  if (btnPrev) btnPrev.addEventListener('click', (ev) => { ev.stopPropagation(); if (currentIndex === -1) return; showAtIndex(currentIndex - 1); });
  if (btnNext) btnNext.addEventListener('click', (ev) => { ev.stopPropagation(); if (currentIndex === -1) return; showAtIndex(currentIndex + 1); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); return; }
    if (e.key === 'ArrowLeft') { if (currentIndex !== -1) showAtIndex(currentIndex - 1); }
    if (e.key === 'ArrowRight') { if (currentIndex !== -1) showAtIndex(currentIndex + 1); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
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

});