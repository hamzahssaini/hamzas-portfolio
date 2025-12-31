/**
 * Projects Section Logic (Vanilla JS)
 * Replaces the React widget for production.
 */

// --- Data ---
const projectsData = [
    {
        id: "mission-devops",
        title: "Mission DevOps",
        role: "Collaboration professionnelle Application microservices",
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: "Need for automated deployment workflows for a microservices application comprising .NET Auth and React Frontend components.",
        solution: "Created GitLab CI Pipelines for Auth (.NET) & Frontend (React) including build, test, and automated deployment to Azure Web App.",
        impact: "Streamlined deployment process, ensuring consistent builds and faster release cycles.",
        architecture: "GitLab CI -> Build Stages -> Test Stages -> Deploy to Azure Web App",
        technologies: ["GitLab CI", ".NET", "React", "Azure Web App"],
        tags: ["DevOps", "CI/CD", "Cloud Azure"],
        architectureImage: "/images/mission-devops-arch.png"
    },
    {
        id: "ansible-project",
        title: "Administrateur Cloud & DevOps",
        role: "Projet Ansible – Orange Digital Center",
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: "Manual configuration of AWS EC2 servers was time-consuming and prone to errors.",
        solution: "Automated AWS EC2 server management with Ansible (dynamic inventory aws_ec2). Deployed and secured Nginx, Docker, MySQL, Redis via roles and Ansible Vault.",
        impact: "Standardized server configuration and improved security with encrypted secrets.",
        architecture: "Ansible Control Node -> AWS API -> EC2 Instances (Nginx, Docker, DBs)",
        technologies: ["Ansible", "AWS EC2", "IAM", "Linux", "MySQL", "Redis", "Nginx"],
        tags: ["Cloud AWS", "DevOps", "Infrastructure"],
        architectureImage: "/images/ansible-project-arch.png"
    },
    {
        id: "azure-hub-spoke",
        title: "Administrateur Cloud & DevOps",
        role: "Projet Collaboratif",
        location: "Casablanca, Maroc",
        date: "Oct 2025 – Nov 2025",
        problem: "Requirement for a secure, scalable network architecture for hybrid cloud connectivity.",
        solution: "Deployed a secure Azure Hub & Spoke architecture via VPN IPSec. Implemented IaC with Terraform and CI/CD pipelines.",
        impact: "Reduced delivery times by 50% through automation and established secure hybrid connectivity.",
        architecture: "On-Premises -> VPN IPSec -> Azure Hub VNet -> Spoke VNets",
        technologies: ["Azure", "Terraform", "Azure DevOps", "Active Directory", "Sécurité Réseau"],
        tags: ["Cloud Azure", "DevOps", "Infrastructure", "CI/CD"],
        architectureImage: "/images/hub-spoke-arch.png"
    },
    {
        id: "azure-migration",
        title: "Administrateur Cloud / Migration",
        role: "Projet Collaboratif",
        location: "Casablanca, Maroc",
        date: "Août 2025 – Oct 2025",
        problem: "Legacy application needed modernization and migration to the cloud to improve performance and reduce costs.",
        solution: "Performed Rehost & Refactor migration to Azure App Service. Implemented CI/CD with GitHub Actions.",
        impact: "+30% performance increase, −20% cost reduction.",
        architecture: "GitHub Actions -> Build -> Deploy -> Azure App Service + Azure DB for MySQL",
        technologies: ["Azure App Service", "GitHub Actions", "Azure Database for MySQL", "Node.js"],
        tags: ["Cloud Azure", "DevOps", "CI/CD", "Infrastructure"],
        architectureImage: "/images/migration-arch.png"
    },
    {
        id: "pfe-bairoutech",
        title: "Stagiaire DevOps (Projet de Fin d'Études)",
        role: "BAIROUTECH",
        location: "Fès, Maroc",
        date: "Févr 2025 – Juin 2025",
        problem: "Application faced scalability and deployment downtime issues.",
        solution: "Containerized Node.js/MongoDB application. Orchestrated with Kubernetes (Ingress, PVC, probes).",
        impact: "−40% deployment time, achieved high availability.",
        architecture: "Kubernetes Cluster -> Ingress -> Service -> Pods (Node.js) -> PVC (MongoDB)",
        technologies: ["Kubernetes", "Docker", "Node.js", "MongoDB"],
        tags: ["Kubernetes", "DevOps", "Infrastructure"],
        architectureImage: "/images/k8s-arch.png"
    },
    {
        id: "rag-chatbot",
        title: "Chatbot Intelligent RAG",
        role: "Azure OpenAI & Azure AI Search",
        location: "Casablanca, Maroc",
        date: "Déc 2025",
        problem: "Need to effectively index and query internal documents (PDF/DOCX) using AI.",
        solution: "Built complete RAG pipeline: Blob Storage, chunking, embeddings, vector indexing. Backend Node.js orchestrating Azure AI Search & Azure OpenAI.",
        impact: "Enabled intelligent document querying and data extraction.",
        architecture: "Documents -> Blob -> Azure AI Search (Index) <-> Backend <-> Azure OpenAI",
        technologies: ["Azure OpenAI", "Azure AI Search", "Node.js", "Bootstrap"],
        tags: ["AI / RAG", "Cloud Azure"],
        architectureImage: "/images/rag-arch.png"
    },
    {
        id: "bairoutech-admin",
        title: "Administration Infrastructure & Support Microsoft 365",
        role: "BAIROUTECH",
        location: "",
        date: "",
        problem: "Managing corporate infrastructure and user support required structured administration.",
        solution: "Managed Active Directory, DNS, DHCP, GPO. Configured Site-to-Site VPN and MFA security.",
        impact: "Ensured secure and stable infrastructure and user productivity.",
        architecture: "Active Directory + Microsoft 365 Environment",
        technologies: ["Active Directory", "DNS", "DHCP", "GPO", "VPN", "Microsoft 365"],
        tags: ["Systems & Support", "Infrastructure"],
        architectureImage: "/images/admin-arch.png"
    },
    {
        id: "ifmotica-network",
        title: "Déploiement Réseau & Installation Postes",
        role: "IFMOTICA",
        location: "",
        date: "",
        problem: "New office setup required network deployment and workstation configuration.",
        solution: "Deployed Windows 10/11, configured Routers/Switches. Created PowerShell GUI for Active Directory management.",
        impact: "Operational network application and efficient user workstation setup.",
        architecture: "Physical Network Topology + Windows Domain",
        technologies: ["Windows 10/11", "Réseau (Routeurs, Switches)", "PowerShell", "Support N1/N2"],
        tags: ["Systems & Support", "Infrastructure"],
        architectureImage: "/images/network-arch.png"
    }
];

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
let currentModalProject = null;
let currentScale = 1;

// --- DOM Elements ---
const container = document.getElementById('projects-container');

// --- Initialization ---
function init() {
    if (!container) {
        console.error('Projects container not found');
        return;
    }

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

    container.appendChild(wrapper);

    // 3. Render Initial Projects
    renderProjects(gridEl);

    // 4. Create Modal (hidden by default)
    createModal();
}

// --- Rendering Functions ---

function renderFilters() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    // Search Bar
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    searchWrapper.innerHTML = `
        <div class="search-icon">${icons.search}</div>
        <input type="text" class="search-input" placeholder="Search projects or technologies..." value="${searchQuery}">
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

function renderProjects(gridRoot = document.getElementById('projects-grid-root')) {
    if (!gridRoot) return;

    // Filter Data
    const filtered = projectsData.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.tags.includes(activeCategory);
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            project.title.toLowerCase().includes(query) ||
            project.technologies.some(t => t.toLowerCase().includes(query)) ||
            project.tags.some(t => t.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
    });

    gridRoot.innerHTML = '';

    if (filtered.length === 0) {
        gridRoot.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <p>No projects match your search.</p>
                <button class="clear-filter-btn" id="clear-filter">Clear Filter</button>
            </div>
        `;
        const clearBtn = gridRoot.querySelector('#clear-filter');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                activeCategory = 'All';
                searchQuery = '';
                // Update UI inputs
                const input = document.querySelector('.search-input');
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
    // Accessibility
    el.setAttribute('role', 'article');

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
                <h3 class="card-title">${project.title}</h3>
                <span class="card-date">${project.date}</span>
            </div>
            <div class="card-role">${project.role}</div>
            ${project.location ? `<div class="card-location">${project.location}</div>` : ''}
            
            <div class="card-tags">
                ${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="card-sections">
                <!-- Problem -->
                <div class="section-item">
                    <div class="section-label" style="color: #ef4444;">
                         ${icons.alert.replace('class="text-red-500"', 'style="color: #ef4444;"')} Problem
                    </div>
                    <p class="section-text">${project.problem}</p>
                </div>
                
                <!-- Solution -->
                <div class="section-item">
                    <div class="section-label" style="color: #3b82f6;">
                        ${icons.check.replace('class="text-blue-500"', 'style="color: #3b82f6;"')} Solution & Technologies
                    </div>
                    <p class="section-text">${project.solution}</p>
                    <div class="tech-list">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Impact -->
                <div class="section-item">
                    <div class="section-label" style="color: #22c55e;">
                        ${icons.trending.replace('class="text-green-500"', 'style="color: #22c55e;"')} Impact / Results
                    </div>
                    <p class="section-text">${formatImpact(project.impact)}</p>
                </div>
                
                <!-- Architecture -->
                <div class="arch-section">
                    <div class="arch-header">
                        <div class="section-label" style="color: #a855f7;">
                            ${icons.layers.replace('class="text-purple-500"', 'style="color: #a855f7;"')} Architecture
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                         <p class="arch-text" title="${project.architecture}">${project.architecture}</p>
                         <button class="view-diagram-btn" data-id="${project.id}">
                            ${icons.external} View Diagram
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

    modal.innerHTML = `
        <div class="modal-controls">
            <button class="control-icon-btn" id="modal-zoom-out" title="Zoom Out">${icons.zoomOut}</button>
            <button class="control-icon-btn" id="modal-zoom-in" title="Zoom In">${icons.zoomIn}</button>
            <button class="control-icon-btn" id="modal-download" title="Download">${icons.download}</button>
            <button class="control-icon-btn close-btn" id="modal-close" title="Close">${icons.close}</button>
        </div>
        <div class="modal-content">
            <div class="modal-image-container">
                <img src="" alt="Architecture" class="modal-image" id="modal-img">
            </div>
            <div class="modal-caption" id="modal-title"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // Listeners
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-zoom-in').addEventListener('click', () => updateScale(0.5));
    document.getElementById('modal-zoom-out').addEventListener('click', () => updateScale(-0.5));
    document.getElementById('modal-download').addEventListener('click', downloadImage);

    // Pan Logic
    const img = document.getElementById('modal-img');

    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
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
        if (img) img.style.cursor = 'grab';
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
        title.textContent = `${project.title} - Architecture Visualization`;

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
    currentScale = Math.max(0.5, Math.min(3, currentScale + delta));
    updateImageTransform();
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
    link.download = `${currentModalProject.title.replace(/\s+/g, '-').toLowerCase()}-architecture.png`;
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
