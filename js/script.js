// ===== State Management =====
let currentProjects = [...devopsProjects];
let savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
let upvotedProjects = JSON.parse(localStorage.getItem('upvotedProjects')) || [];
let submittedIdeas = JSON.parse(localStorage.getItem('submittedIdeas')) || [];

// ===== DOM Elements =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// ===== Navigation =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('href').substring(1);
        navigateToPage(targetPage);
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

function navigateToPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
        
        // Load page-specific content
        if (pageId === 'home') {
            loadHomePage();
        } else if (pageId === 'explorer') {
            loadExplorerPage();
        } else if (pageId === 'tools') {
            loadToolsPage();
        } else if (pageId === 'profile') {
            loadProfilePage();
        }
    }
}

// ===== Home Page =====
function loadHomePage() {
    renderTrendingProjects();
    renderCategories();
    renderPopularTools();
}

function renderTrendingProjects() {
    const container = document.getElementById('trending-projects');
    const trending = [...devopsProjects]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 6);
    
    container.innerHTML = trending.map(project => createProjectCard(project)).join('');
    attachProjectCardListeners();
}

function renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.name}">
            <div class="category-icon">${cat.icon}</div>
            <div class="category-name">${cat.name}</div>
            <div style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">${cat.count} projects</div>
        </div>
    `).join('');
    
    // Add click listeners to filter by category
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            navigateToPage('explorer');
            document.getElementById('filter-category').value = category.toLowerCase();
            filterProjects();
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('a[href="#explorer"]').classList.add('active');
        });
    });
}

function renderPopularTools() {
    const container = document.getElementById('popular-tools');
    const popular = devopsTools.slice(0, 6);
    
    container.innerHTML = popular.map(tool => createToolCard(tool)).join('');
}

// ===== Project Explorer =====
function loadExplorerPage() {
    populateFilterOptions();
    renderProjects(currentProjects);
    attachFilterListeners();
}

function populateFilterOptions() {
    // Populate categories
    const categoryFilter = document.getElementById('filter-category');
    const uniqueCategories = [...new Set(devopsProjects.map(p => p.category))];
    uniqueCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.toLowerCase();
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    
    // Populate tools
    const toolsFilter = document.getElementById('filter-tools');
    const allTools = [...new Set(devopsProjects.flatMap(p => p.tools))];
    allTools.sort().forEach(tool => {
        const option = document.createElement('option');
        option.value = tool.toLowerCase();
        option.textContent = tool;
        toolsFilter.appendChild(option);
    });
}

function attachFilterListeners() {
    document.getElementById('filter-difficulty').addEventListener('change', filterProjects);
    document.getElementById('filter-category').addEventListener('change', filterProjects);
    document.getElementById('filter-tools').addEventListener('change', filterProjects);
    document.getElementById('sort-by').addEventListener('change', filterProjects);
}

function filterProjects() {
    const difficulty = document.getElementById('filter-difficulty').value;
    const category = document.getElementById('filter-category').value;
    const tool = document.getElementById('filter-tools').value;
    const sortBy = document.getElementById('sort-by').value;
    
    let filtered = [...devopsProjects];
    
    // Apply filters
    if (difficulty !== 'all') {
        filtered = filtered.filter(p => p.difficulty === difficulty);
    }
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category);
    }
    
    if (tool !== 'all') {
        filtered = filtered.filter(p => 
            p.tools.some(t => t.toLowerCase() === tool)
        );
    }
    
    // Apply sorting
    if (sortBy === 'popularity') {
        filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'difficulty') {
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    currentProjects = filtered;
    renderProjects(filtered);
}

function renderProjects(projects) {
    const container = document.getElementById('explorer-projects');
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">No projects found matching your filters</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = projects.map(project => createProjectCard(project)).join('');
    attachProjectCardListeners();
}

function createProjectCard(project) {
    const isSaved = savedProjects.includes(project.id);
    const isUpvoted = upvotedProjects.includes(project.id);
    const upvoteCount = project.upvotes || 0;
    
    return `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-card-header">
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-difficulty difficulty-${project.difficulty}">${project.difficulty}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tools.slice(0, 3).map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
            <div class="project-footer">
                <div class="project-actions">
                    <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-project-id="${project.id}">
                        ${isSaved ? '✓ Saved' : '💾 Save'}
                    </button>
                    <button class="action-btn upvote-btn ${isUpvoted ? 'active' : ''}" data-project-id="${project.id}">
                        ${isUpvoted ? '👍 Upvoted' : '👍 Upvote'}
                    </button>
                </div>
                <div class="upvote-count">${upvoteCount} upvotes</div>
            </div>
        </div>
    `;
}

function attachProjectCardListeners() {
    // Project card click to open details
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('action-btn')) {
                const projectId = parseInt(card.dataset.projectId);
                openProjectDetails(projectId);
            }
        });
    });
    
    // Save button
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = parseInt(btn.dataset.projectId);
            toggleSaveProject(projectId);
        });
    });
    
    // Upvote button
    document.querySelectorAll('.upvote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = parseInt(btn.dataset.projectId);
            toggleUpvoteProject(projectId);
        });
    });
}

// ===== Project Details Modal =====
function openProjectDetails(projectId) {
    const project = devopsProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const details = document.getElementById('project-details');
    
    const isSaved = savedProjects.includes(project.id);
    const isUpvoted = upvotedProjects.includes(project.id);
    
    details.innerHTML = `
        <h2>${project.title}</h2>
        <div class="detail-section">
            <h3>Description</h3>
            <p>${project.description}</p>
        </div>
        <div class="detail-section">
            <h3>Difficulty</h3>
            <p><span class="project-difficulty difficulty-${project.difficulty}">${project.difficulty}</span></p>
        </div>
        <div class="detail-section">
            <h3>Category</h3>
            <p>${project.category}</p>
        </div>
        <div class="detail-section">
            <h3>Tools & Technologies</h3>
            <div class="project-tags">
                ${project.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
        </div>
        <div class="detail-section">
            <h3>Implementation Steps</h3>
            <ol>
                ${project.implementation.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        <div class="detail-section">
            <h3>Real-World Use Case</h3>
            <p>${project.useCase}</p>
        </div>
        <div class="project-actions" style="margin-top: 2rem;">
            <button class="action-btn save-btn ${isSaved ? 'active' : ''}" data-project-id="${project.id}">
                ${isSaved ? '✓ Saved' : '💾 Save Idea'}
            </button>
            <button class="action-btn upvote-btn ${isUpvoted ? 'active' : ''}" data-project-id="${project.id}">
                ${isUpvoted ? '👍 Upvoted' : '👍 Upvote'}
            </button>
        </div>
    `;
    
    // Attach listeners to modal buttons
    details.querySelector('.save-btn')?.addEventListener('click', () => {
        toggleSaveProject(project.id);
        openProjectDetails(project.id); // Refresh modal
    });
    
    details.querySelector('.upvote-btn')?.addEventListener('click', () => {
        toggleUpvoteProject(project.id);
        openProjectDetails(project.id); // Refresh modal
    });
    
    modal.classList.add('active');
}

// Close modal
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('project-modal').classList.remove('active');
});

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        document.getElementById('project-modal').classList.remove('active');
    }
});

// ===== Save/Upvote Functions =====
function toggleSaveProject(projectId) {
    const index = savedProjects.indexOf(projectId);
    if (index > -1) {
        savedProjects.splice(index, 1);
    } else {
        savedProjects.push(projectId);
    }
    localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
    
    // Refresh current view
    if (document.getElementById('explorer').classList.contains('active')) {
        renderProjects(currentProjects);
    } else if (document.getElementById('home').classList.contains('active')) {
        renderTrendingProjects();
    } else if (document.getElementById('profile').classList.contains('active')) {
        loadProfilePage();
    }
}

function toggleUpvoteProject(projectId) {
    const project = devopsProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const index = upvotedProjects.indexOf(projectId);
    if (index > -1) {
        upvotedProjects.splice(index, 1);
        project.upvotes = Math.max(0, (project.upvotes || 0) - 1);
    } else {
        upvotedProjects.push(projectId);
        project.upvotes = (project.upvotes || 0) + 1;
    }
    localStorage.setItem('upvotedProjects', JSON.stringify(upvotedProjects));
    
    // Refresh current view
    if (document.getElementById('explorer').classList.contains('active')) {
        renderProjects(currentProjects);
    } else if (document.getElementById('home').classList.contains('active')) {
        renderTrendingProjects();
    } else if (document.getElementById('profile').classList.contains('active')) {
        loadProfilePage();
    }
}

// ===== Tools Library =====
function loadToolsPage() {
    const container = document.getElementById('tools-library');
    container.innerHTML = devopsTools.map(tool => createToolCard(tool)).join('');
}

function createToolCard(tool) {
    return `
        <div class="tool-card">
            <div class="tool-header">
                <div class="tool-icon">${tool.icon}</div>
                <div class="tool-name">${tool.name}</div>
            </div>
            <div class="tool-description">${tool.description}</div>
            <div class="tool-section">
                <div class="tool-section-title">Where it's used</div>
                <div class="tool-content">${tool.usedIn}</div>
            </div>
            <div class="tool-section">
                <div class="tool-section-title">Common Commands</div>
                <div class="code-snippet">${tool.commands.join('\n')}</div>
            </div>
            <div class="tool-section">
                <div class="tool-section-title">Example</div>
                <div class="code-snippet">${tool.example}</div>
            </div>
        </div>
    `;
}

// ===== Suggest Idea Form =====
document.getElementById('suggest-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('idea-title').value;
    const description = document.getElementById('idea-description').value;
    const difficulty = document.getElementById('idea-difficulty').value;
    const category = document.getElementById('idea-category').value;
    const tools = document.getElementById('idea-tools').value
        .split(',')
        .map(t => t.trim())
        .filter(t => t);
    
    const newIdea = {
        id: Date.now(),
        title,
        description,
        difficulty,
        category,
        tools: tools.length > 0 ? tools : ['General'],
        popularity: 0,
        upvotes: 0,
        implementation: ['User-submitted idea'],
        useCase: 'Community contribution',
        submitted: true
    };
    
    submittedIdeas.push(newIdea);
    localStorage.setItem('submittedIdeas', JSON.stringify(submittedIdeas));
    
    // Show success message
    const successMsg = document.getElementById('success-message');
    successMsg.classList.remove('hidden');
    
    // Reset form
    document.getElementById('suggest-form').reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 5000);
    
    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ===== Profile Page =====
function loadProfilePage() {
    loadSavedTab();
    loadUpvotedTab();
    loadSubmittedTab();
    attachTabListeners();
}

function attachTabListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

function loadSavedTab() {
    const container = document.getElementById('saved-projects');
    const saved = devopsProjects.filter(p => savedProjects.includes(p.id));
    
    if (saved.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💾</div>
                <div class="empty-state-text">No saved ideas yet. Start exploring and save your favorites!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = saved.map(project => createProjectCard(project)).join('');
    attachProjectCardListeners();
}

function loadUpvotedTab() {
    const container = document.getElementById('upvoted-projects');
    const upvoted = devopsProjects.filter(p => upvotedProjects.includes(p.id));
    
    if (upvoted.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👍</div>
                <div class="empty-state-text">No upvoted ideas yet. Show your support for great projects!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = upvoted.map(project => createProjectCard(project)).join('');
    attachProjectCardListeners();
}

function loadSubmittedTab() {
    const container = document.getElementById('submitted-projects');
    
    if (submittedIdeas.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💡</div>
                <div class="empty-state-text">No submitted ideas yet. Share your DevOps project ideas with the community!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = submittedIdeas.map(idea => createProjectCard(idea)).join('');
    attachProjectCardListeners();
}

// ===== Search Functionality =====
document.getElementById('hero-search')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        renderTrendingProjects();
        return;
    }
    
    const filtered = devopsProjects.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tools.some(tool => tool.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('trending-projects');
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">No projects found matching "${query}"</div>
            </div>
        `;
    } else {
        container.innerHTML = filtered.map(project => createProjectCard(project)).join('');
        attachProjectCardListeners();
    }
});

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    loadHomePage();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

