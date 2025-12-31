/**
 * Projects Section Logic (Vanilla JS)
 * Production-ready, accessible, i18n-enabled.
 */

// --- Data (i18n enabled) ---
const projectsData = [
    {
        id: "mission-devops",
        title: {
            en: "Mission DevOps - Microservices App",
            fr: "Mission DevOps - App Microservices"
        },
        role: {
            en: "Professional Collaboration",
            fr: "Collaboration Professionnelle"
        },
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: {
            en: "Need for updated and automated deployment workflows for a microservices application (.NET Auth + React Frontend).",
            fr: "Besoin de workflows de déploiement automatisés pour une application microservices (.NET Auth + React Frontend)."
        },
        solution: {
            en: "Created GitLab CI Pipelines for Auth (.NET) & Frontend (React) including build, test, and automated deployment to Azure Web App.",
            fr: "Création de pipelines GitLab CI pour Auth (.NET) & Frontend (React) incluant build, test et déploiement automatisé sur Azure Web App."
        },
        impact: {
            en: "Streamlined deployment process, ensuring consistent builds and faster release cycles.",
            fr: "Processus de déploiement rationalisé, garantissant des builds cohérents et des cycles de release plus rapides."
        },
        architecture: "GitLab CI -> Build -> Test -> Deploy (Azure Web App)",
        technologies: ["GitLab CI", ".NET", "React", "Azure Web App"],
        tags: ["DevOps", "CI/CD", "Cloud Azure"],
        architectureImage: "/images/mission-devops-arch.png"
    },
    {
        id: "ansible-project",
        title: {
            en: "Ansible Cloud Automation",
            fr: "Automatisation Cloud Ansible"
        },
        role: {
            en: "Orange Digital Center Project",
            fr: "Projet Orange Digital Center"
        },
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: {
            en: "Manual configuration of AWS EC2 servers was time-consuming, inconsistent, and prone to human errors.",
            fr: "La configuration manuelle des serveurs AWS EC2 était longue, incohérente et sujette aux erreurs humaines."
        },
        solution: {
            en: "Automated AWS EC2 management with Ansible (dynamic inventory). Secured Nginx, Docker, MySQL, Redis via roles and Ansible Vault.",
            fr: "Automatisation de la gestion AWS EC2 avec Ansible (inventaire dynamique). Sécurisation de Nginx, Docker, MySQL, Redis via rôles et Ansible Vault."
        },
        impact: {
            en: "Standardized server configuration and improved security with encrypted secrets.",
            fr: "Configuration serveur standardisée et sécurité améliorée avec secrets chiffrés."
        },
        architecture: "Ansible Node -> AWS API -> EC2 (Nginx, Docker, DBs)",
        technologies: ["Ansible", "AWS EC2", "IAM", "Linux", "MySQL", "Redis", "Nginx"],
        tags: ["Cloud AWS", "DevOps", "Infrastructure"],
        architectureImage: "/images/ansible-project-arch.png"
    },
    {
        id: "azure-hub-spoke",
        title: {
            en: "Azure Hub & Spoke Architecture",
            fr: "Architecture Azure Hub & Spoke"
        },
        role: {
            en: "Collaborative Project",
            fr: "Projet Collaboratif"
        },
        location: "Casablanca, Maroc",
        date: "Oct 2025 – Nov 2025",
        problem: {
            en: "Requirement for a secure, scalable network architecture to manage hybrid cloud connectivity effectively.",
            fr: "Besoin d'une architecture réseau sécurisée et évolutive pour gérer efficacement la connectivité cloud hybride."
        },
        solution: {
            en: "Deployed secure Azure Hub & Spoke topology via VPN IPSec. Implemented IaC with Terraform and CI/CD pipelines.",
            fr: "Déploiement d'une topologie Azure Hub & Spoke sécurisée via VPN IPSec. Implémentation IaC avec Terraform et pipelines CI/CD."
        },
        impact: {
            en: "Reduced delivery times by 50% through automation and established secure hybrid connectivity.",
            fr: "Réduction des délais de livraison de 50% grâce à l'automatisation et connectivité hybride sécurisée établie."
        },
        architecture: "On-Prem -> VPN -> Azure Hub VNet -> Spokes",
        technologies: ["Azure", "Terraform", "Azure DevOps", "Active Directory", "Network Security"],
        tags: ["Cloud Azure", "DevOps", "Infrastructure", "CI/CD"],
        architectureImage: "/images/hub-spoke-arch.png"
    },
    {
        id: "azure-migration",
        title: {
            en: "Azure App Service Migration",
            fr: "Migration Azure App Service"
        },
        role: {
            en: "Migration Project",
            fr: "Projet de Migration"
        },
        location: "Casablanca, Maroc",
        date: "Août 2025 – Oct 2025",
        problem: {
            en: "Legacy application needed modernization and migration to cloud to improve performance and reduce maintenance costs.",
            fr: "L'application existante nécessitait une modernisation et une migration vers le cloud pour améliorer les performances."
        },
        solution: {
            en: "Performed Rehost & Refactor migration to Azure App Service. Implemented CI/CD with GitHub Actions.",
            fr: "Migration Rehost & Refactor vers Azure App Service. Mise en place de CI/CD avec GitHub Actions."
        },
        impact: {
            en: "+30% performance increase, −20% cost reduction.",
            fr: "Augmentation de +30% des performances, réduction de coût de −20%."
        },
        architecture: "GitHub Actions -> Azure App Service + MySQL",
        technologies: ["Azure App Service", "GitHub Actions", "Azure MySQL", "Node.js"],
        tags: ["Cloud Azure", "DevOps", "CI/CD", "Infrastructure"],
        architectureImage: "/images/migration-arch.png"
    },
    {
        id: "pfe-bairoutech",
        title: {
            en: "Kubernetes Orchestration (PFE)",
            fr: "Orchestration Kubernetes (PFE)"
        },
        role: {
            en: "DevOps Intern @ BAIROUTECH",
            fr: "Stagiaire DevOps @ BAIROUTECH"
        },
        location: "Fès, Maroc",
        date: "Févr 2025 – Juin 2025",
        problem: {
            en: "Application faced scalability limits and deployment downtime issues during high traffic.",
            fr: "L'application rencontrait des limites de scalabilité et des temps d'arrêt lors des déploiements."
        },
        solution: {
            en: "Containerized Node.js/MongoDB app. Orchestrated with Kubernetes (Ingress, PVC, Liveness/Readiness probes).",
            fr: "Conteneurisation Node.js/MongoDB. Orchestration avec Kubernetes (Ingress, PVC, sondes)."
        },
        impact: {
            en: "−40% deployment time, achieved high availability.",
            fr: "−40% de temps de déploiement, haute disponibilité atteinte."
        },
        architecture: "K8s Cluster -> Ingress -> Svc -> Pods -> PVC",
        technologies: ["Kubernetes", "Docker", "Node.js", "MongoDB"],
        tags: ["Kubernetes", "DevOps", "Infrastructure"],
        architectureImage: "/images/k8s-arch.png"
    },
    {
        id: "rag-chatbot",
        title: {
            en: "Intelligent RAG Chatbot",
            fr: "Chatbot RAG Intelligent"
        },
        role: {
            en: "Azure OpenAI & AI Search",
            fr: "Azure OpenAI & AI Search"
        },
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: {
            en: "Need to effectively index and query internal documents (PDF/DOCX) using AI for rapid info retrieval.",
            fr: "Besoin d'indexer et d'interroger efficacement des documents internes (PDF/DOCX) via l'IA."
        },
        solution: {
            en: "Built complete RAG pipeline: Blob Storage, chunking, embeddings, vector indexing. Backend Node.js orchestrating Azure AI.",
            fr: "Pipeline RAG complet : Blob Storage, chunking, embeddings, indexation vectorielle. Backend Node.js."
        },
        impact: {
            en: "Enabled intelligent document querying and data extraction.",
            fr: "A permis l'interrogation intelligente de documents et l'extraction de données."
        },
        architecture: "Docs -> Blob -> AI Search (Index) -> OpenAI",
        technologies: ["Azure OpenAI", "Azure AI Search", "Node.js", "Bootstrap"],
        tags: ["AI / RAG", "Cloud Azure"],
        architectureImage: "/images/rag-arch.png"
    },
    {
        id: "bairoutech-admin",
        title: {
            en: "Infra Admin & Support",
            fr: "Admin Infra & Support"
        },
        role: {
            en: "BAIROUTECH",
            fr: "BAIROUTECH"
        },
        location: "",
        date: "",
        problem: {
            en: "Managing corporate infrastructure and user support required structured administration and security.",
            fr: "La gestion de l'infrastructure et le support utilisateur nécessitaient une administration structurée."
        },
        solution: {
            en: "Managed Active Directory, DNS, DHCP, GPO. Configured Site-to-Site VPN and MFA security.",
            fr: "Gestion Active Directory, DNS, DHCP, GPO. Configuration VPN Site-à-Site et sécurité MFA."
        },
        impact: {
            en: "Ensured secure, stable infrastructure and user productivity.",
            fr: "Infrastructure sécurisée et stable garantie, productivité utilisateur maintenue."
        },
        architecture: "AD + Microsoft 365 Hybrid",
        technologies: ["Active Directory", "DNS/DHCP", "GPO", "VPN", "M365"],
        tags: ["Systems & Support", "Infrastructure"],
        architectureImage: "/images/admin-arch.png"
    },
    {
        id: "ifmotica-network",
        title: {
            en: "Network Deployment",
            fr: "Déploiement Réseau"
        },
        role: {
            en: "IFMOTICA",
            fr: "IFMOTICA"
        },
        location: "Fès, Maroc",
        date: "",
        problem: {
            en: "New office setup required complete physical network deployment and workstation configuration.",
            fr: "La configuration des nouveaux bureaux nécessitait un déploiement réseau physique complet."
        },
        solution: {
            en: "Deployed Windows 10/11, configured Routers/Switches. Created PowerShell tools for AD management.",
            fr: "Déploiement Windows 10/11, configuration Routeurs/Switchs. Outils PowerShell pour gestion AD."
        },
        impact: {
            en: "Operational network and efficient user workstation setup.",
            fr: "Réseau opérationnel et configuration efficace des postes utilisateurs."
        },
        architecture: "Physical Topology + Windows Domain",
        technologies: ["Windows 10/11", "Networking", "PowerShell", "Support"],
        tags: ["Systems & Support", "Infrastructure"],
        architectureImage: "/images/network-arch.png"
    }
];

const I18N_LABELS = {
    en: {
        problem: "PROBLEM",
        solution: "SOLUTION & TECH",
        impact: "IMPACT / RESULTS",
        architecture: "ARCHITECTURE",
        viewDiagram: "View Diagram",
        searchPlaceholder: "Search projects or technologies...",
        noResults: "No projects match your search.",
        clearFilter: "Clear Filter"
    },
    fr: {
        problem: "PROBLÉMATIQUE",
        solution: "SOLUTION & TECH",
        impact: "IMPACT / RÉSULTATS",
        architecture: "ARCHITECTURE",
        viewDiagram: "Voir le Diagramme",
        searchPlaceholder: "Rechercher projets ou technologies...",
        noResults: "Aucun projet ne correspond à votre recherche.",
        clearFilter: "Effacer le filtre"
    }
};

const CATEGORIES = [
    "All",
    "DevOps",
    "Cloud Azure",
    "Cloud AWS",
    "Kubernetes",
    "CI/CD",
    "Infrastructure",
    "Systems & Support",
    "AI / RAG"
];

// --- Icons (SVG Strings) ---
const icons = {
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    trending: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    layers: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
    external: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    zoomIn: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`,
    zoomOut: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
};

// --- State ---
let activeCategory = 'All';
let searchQuery = '';
let currentLang = localStorage.getItem('lang') || 'fr';
let currentModalProject = null;
let currentScale = 1;

// --- DOM Elements ---
const container = document.getElementById('projects-container');

// --- Initialization ---
function init() {
    if (!container) return; // Silent fail if not present (handled by main.js)

    // Create Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'projects-wrapper';

    // 1. Render Filters
    const filtersEl = renderFilters();
    wrapper.appendChild(filtersEl);

    // 2. Render Grid
    const gridEl = document.createElement('div');
    gridEl.className = 'projects-grid';
    gridEl.id = 'projects-grid-root';
    wrapper.appendChild(gridEl);

    container.innerHTML = '';
    container.appendChild(wrapper);

    // 3. Render Initial Projects
    renderProjects();

    // 4. Create Modal (hidden by default)
    if (!document.getElementById('project-modal')) {
        createModal();
    }

    // Expose global updater for main.js to call
    window.updateProjectsLanguage = (lang) => {
        currentLang = lang;
        updateUIForLanguage();
    };
}

// --- Rendering Functions ---

function renderFilters() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    // Search Bar
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    const labels = I18N_LABELS[currentLang] || I18N_LABELS.fr;

    searchWrapper.innerHTML = `
        <div class="search-icon">${icons.search}</div>
        <input type="text" class="search-input" id="project-search-input" placeholder="${labels.searchPlaceholder}" value="${searchQuery}">
    `;
    const input = searchWrapper.querySelector('input');
    input.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProjects();
    });

    // Categories
    const categoriesWrapper = document.createElement('div');
    categoriesWrapper.className = 'categories-wrapper';

    CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${activeCategory === cat ? 'active' : ''}`;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            activeCategory = cat;
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
    const btns = wrapper.querySelectorAll('.category-btn');
    btns.forEach(btn => {
        if (btn.textContent === activeCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateUIForLanguage() {
    // 1. Update search placeholder
    const searchInput = document.getElementById('project-search-input');
    const labels = I18N_LABELS[currentLang] || I18N_LABELS.fr;
    if (searchInput) {
        searchInput.placeholder = labels.searchPlaceholder;
    }
    // 2. Re-render projects grid
    renderProjects();
}

function getLoc(field) {
    if (typeof field === 'string') return field;
    if (typeof field === 'object') return field[currentLang] || field.en || field.fr || '';
    return '';
}

function renderProjects() {
    const gridRoot = document.getElementById('projects-grid-root');
    if (!gridRoot) return;

    const labels = I18N_LABELS[currentLang] || I18N_LABELS.fr;

    // Filter Data
    const filtered = projectsData.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.tags.includes(activeCategory);
        const query = searchQuery.toLowerCase();

        const titleVal = getLoc(project.title).toLowerCase();
        const techVal = project.technologies.some(t => t.toLowerCase().includes(query));
        const tagsVal = project.tags.some(t => t.toLowerCase().includes(query));

        const matchesSearch = titleVal.includes(query) || techVal || tagsVal;

        return matchesCategory && matchesSearch;
    });

    gridRoot.innerHTML = '';

    if (filtered.length === 0) {
        gridRoot.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <p>${labels.noResults}</p>
                <button class="clear-filter-btn" id="clear-filter">${labels.clearFilter}</button>
            </div>
        `;
        const clearBtn = gridRoot.querySelector('#clear-filter');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                activeCategory = 'All';
                searchQuery = '';
                // Update UI inputs
                const input = document.getElementById('project-search-input');
                if (input) input.value = '';
                const catWrapper = document.querySelector('.categories-wrapper');
                if (catWrapper) updateCategoryButtons(catWrapper);
                renderProjects();
            });
        }
        return;
    }

    filtered.forEach((project, index) => {
        const card = createProjectCard(project, index);
        gridRoot.appendChild(card);
        // Trigger generic fade-in
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
}

function createProjectCard(project, index) {
    const el = document.createElement('div');
    el.className = 'project-card';
    el.setAttribute('role', 'article');

    // Labels
    const labels = I18N_LABELS[currentLang] || I18N_LABELS.fr;

    // Localized values
    const title = getLoc(project.title);
    const role = getLoc(project.role);
    const problem = getLoc(project.problem);
    const solution = getLoc(project.solution);
    const impact = getLoc(project.impact);

    // Helper to extract metrics for highlighting
    const formatImpact = (text) => {
        const regex = /([+−-]?\d+\s?%)/g;
        return text.split(regex).map(part => {
            if (part.match(regex)) {
                return `<span class="metric-badge">${part}</span>`;
            }
            return part;
        }).join('');
    };

    el.innerHTML = `
        <div class="card-glow"></div>
        <div class="card-content">
            <div class="card-header-row">
                <h3 class="card-title">${title}</h3>
                <span class="card-date">${project.date}</span>
            </div>
            <div class="card-role">${role}</div>
            ${project.location ? `<div class="card-location">${project.location}</div>` : ''}
            
            <div class="card-tags">
                ${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="card-sections">
                <!-- Problem -->
                <div class="section-item">
                    <div class="section-label" style="color: #ef4444;">
                         ${icons.alert.replace('class="text-red-500"', 'style="color: #ef4444;"')} ${labels.problem}
                    </div>
                    <p class="section-text">${problem}</p>
                </div>
                
                <!-- Solution -->
                <div class="section-item">
                    <div class="section-label" style="color: #3b82f6;">
                        ${icons.check.replace('class="text-blue-500"', 'style="color: #3b82f6;"')} ${labels.solution}
                    </div>
                    <p class="section-text">${solution}</p>
                    <div class="tech-list">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Impact -->
                <div class="section-item">
                    <div class="section-label" style="color: #22c55e;">
                        ${icons.trending.replace('class="text-green-500"', 'style="color: #22c55e;"')} ${labels.impact}
                    </div>
                    <p class="section-text">${formatImpact(impact)}</p>
                </div>
                
                <!-- Architecture -->
                <div class="arch-section">
                    <div class="arch-header">
                        <div class="section-label" style="color: #a855f7;">
                            ${icons.layers.replace('class="text-purple-500"', 'style="color: #a855f7;"')} ${labels.architecture}
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                         <p class="arch-text" title="${project.architecture}">${project.architecture}</p>
                         <button class="view-diagram-btn" data-id="${project.id}">
                            ${icons.external} ${labels.viewDiagram}
                         </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listener for modal
    const viewBtn = el.querySelector('.view-diagram-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', () => openModal(project));
    }

    return el;
}

// --- Modal Logic ---
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'project-modal';

    // Ensure toolbar is visible with high contrast
    modal.innerHTML = `
        <div class="modal-controls">
            <button class="control-icon-btn" id="modal-zoom-out" title="Zoom Out" aria-label="Zoom Out">${icons.zoomOut}</button>
            <button class="control-icon-btn" id="modal-zoom-in" title="Zoom In" aria-label="Zoom In">${icons.zoomIn}</button>
            <button class="control-icon-btn" id="modal-download" title="Download Diagram" aria-label="Download Diagram">${icons.download}</button>
            <button class="control-icon-btn close-btn" id="modal-close" title="Close Modal" aria-label="Close Modal">${icons.close}</button>
        </div>
        <div class="modal-content">
            <div class="modal-image-container" id="modal-img-container">
                <img src="" alt="Architecture Diagram" class="modal-image" id="modal-img">
            </div>
            <div class="modal-caption" id="modal-title"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // Listeners
    modal.addEventListener('click', (e) => {
        // Close if clicking the overlay (and not the controls or image)
        if (e.target === modal || e.target.classList.contains('modal-content') || e.target.classList.contains('modal-image-container')) {
            closeModal();
        }
    });

    document.getElementById('modal-close').addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
    document.getElementById('modal-zoom-in').addEventListener('click', (e) => { e.stopPropagation(); updateScale(0.5); });
    document.getElementById('modal-zoom-out').addEventListener('click', (e) => { e.stopPropagation(); updateScale(-0.5); });
    document.getElementById('modal-download').addEventListener('click', (e) => { e.stopPropagation(); downloadImage(); });

    // Pan Logic
    const img = document.getElementById('modal-img');
    const container = document.getElementById('modal-img-container');

    container.addEventListener('mousedown', (e) => {
        // Only drag if scaled > 1 or if image is larger than container
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        container.style.cursor = 'grabbing';
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

function openModal(project) {
    currentModalProject = project;
    currentScale = 1;
    translateX = 0;
    translateY = 0;

    const modal = document.getElementById('project-modal');
    const img = document.getElementById('modal-img');
    const title = document.getElementById('modal-title');

    if (modal && img && title) {
        // Use architectureImage if available, else a placeholder or fallback
        img.src = project.architectureImage || '/assets/images/placeholder-arch.png';
        const projectTitle = getLoc(project.title);
        title.textContent = `${projectTitle}`;

        updateImageTransform();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        currentModalProject = null;
    }
}

function updateScale(delta) {
    const newScale = currentScale + delta;
    if (newScale >= 0.5 && newScale <= 5) { // Limit zoom range
        currentScale = newScale;
        updateImageTransform();
    }
}

function updateImageTransform() {
    const img = document.getElementById('modal-img');
    if (img) {
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
}

function downloadImage() {
    if (!currentModalProject || !currentModalProject.architectureImage) return;

    const link = document.createElement('a');
    link.href = currentModalProject.architectureImage;
    const title = getLoc(currentModalProject.title);
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-architecture.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
