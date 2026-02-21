// ============================================
// MedKitt Landing Page - JavaScript
// ============================================

// Sample Ideas Data
const sampleIdeas = [
    {
        id: '1',
        title: 'DKA Management',
        specialty: 'Emergency Medicine',
        description: 'Step-by-step DKA management with insulin dosing, fluid resuscitation, and when to admit vs discharge.',
        votes: 34,
        status: 'pending',
        createdAt: '2026-01-15T10:30:00Z'
    },
    {
        id: '2',
        title: 'Pediatric Fever Workup',
        specialty: 'Pediatrics',
        description: 'Age-based fever workup algorithm including appropriate labs, imaging, and disposition decisions.',
        votes: 41,
        status: 'pending',
        createdAt: '2026-01-10T14:20:00Z'
    },
    {
        id: '3',
        title: 'Ectopic Pregnancy Evaluation',
        specialty: 'OB/GYN',
        description: 'Risk stratification, beta-hCG interpretation, and management of suspected ectopic pregnancy.',
        votes: 33,
        status: 'pending',
        createdAt: '2026-01-20T09:15:00Z'
    },
    {
        id: '4',
        title: 'Atrial Fibrillation Management',
        specialty: 'Cardiology',
        description: 'Rate vs rhythm control, anticoagulation decisions, and ED vs inpatient management.',
        votes: 28,
        status: 'pending',
        createdAt: '2026-01-18T16:45:00Z'
    },
    {
        id: '5',
        title: 'COPD Exacerbation',
        specialty: 'Pulmonology',
        description: 'Severity assessment, treatment options, NIV criteria, and disposition planning.',
        votes: 19,
        status: 'pending',
        createdAt: '2026-01-22T11:30:00Z'
    },
    {
        id: '6',
        title: 'Acute Kidney Injury Workup',
        specialty: 'Nephrology',
        description: 'Pre-renal vs intrinsic vs post-renal evaluation, imaging decisions, and management.',
        votes: 22,
        status: 'pending',
        createdAt: '2026-01-25T13:20:00Z'
    }
];

// Specialty color mapping
const specialtyColors = {
    'Emergency Medicine': 'em',
    'Cardiology': 'cards',
    'Pulmonology': 'pulm',
    'Infectious Disease': 'id',
    'Neurology': 'neuro',
    'Nephrology': 'nephro',
    'Gastroenterology': 'gi',
    'OB/GYN': 'obgyn',
    'Pediatrics': 'peds',
    'Surgery': 'surgery',
    'Anesthesia': 'anesthesia',
    'Other': ''
};

// DOM Elements
const ideasGrid = document.getElementById('ideas-grid');
const ideasEmpty = document.getElementById('ideas-empty');
const specialtyFilter = document.getElementById('specialty-filter');
const sortButtons = document.querySelectorAll('.sort-btn');
const submitIdeaBtn = document.getElementById('submit-idea-btn');
const ideaModal = document.getElementById('idea-modal');
const modalClose = document.getElementById('modal-close');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const installBtn = document.getElementById('install-btn');

// State
let currentFilter = 'all';
let currentSort = 'popular';
let ideas = [...sampleIdeas];

// ============================================
// Idea Board Functions
// ============================================

function getVotedIdeas() {
    try {
        return JSON.parse(localStorage.getItem('medkitt_voted_ideas') || '[]');
    } catch (e) {
        return [];
    }
}

function setVotedIdea(id) {
    const voted = getVotedIdeas();
    if (!voted.includes(id)) {
        voted.push(id);
        localStorage.setItem('medkitt_voted_ideas', JSON.stringify(voted));
    }
}

function hasVoted(id) {
    return getVotedIdeas().includes(id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
}

function createIdeaCard(idea) {
    const specialtyClass = specialtyColors[idea.specialty] || '';
    const voted = hasVoted(idea.id);
    
    const card = document.createElement('div');
    card.className = `idea-card ${idea.status === 'built' ? 'built' : ''}`;
    card.innerHTML = `
        <div class="idea-card-header">
            <span class="idea-specialty ${specialtyClass}">${idea.specialty}</span>
            ${idea.status === 'built' ? '<span class="idea-built-badge">Built!</span>' : ''}
        </div>
        <h4 class="idea-title">${idea.title}</h4>
        <p class="idea-description">${idea.description}</p>
        <div class="idea-footer">
            <div class="idea-votes">
                <button class="vote-btn ${voted ? 'voted' : ''}" data-id="${idea.id}" aria-label="Upvote">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                </button>
                <span class="vote-count">${idea.votes}</span>
            </div>
            <span class="idea-date">${formatDate(idea.createdAt)}</span>
        </div>
    `;
    
    // Add vote handler
    const voteBtn = card.querySelector('.vote-btn');
    voteBtn.addEventListener('click', () => handleVote(idea.id, voteBtn, card.querySelector('.vote-count')));
    
    return card;
}

function handleVote(id, button, countEl) {
    if (hasVoted(id)) return;
    
    const idea = ideas.find(i => i.id === id);
    if (idea) {
        idea.votes++;
        setVotedIdea(id);
        
        // Animate vote count
        countEl.style.transform = 'scale(1.3)';
        countEl.style.color = '#00d4aa';
        setTimeout(() => {
            countEl.style.transform = 'scale(1)';
            countEl.style.color = '';
        }, 300);
        
        button.classList.add('voted');
        countEl.textContent = idea.votes;
    }
}

function filterAndSortIdeas() {
    let filtered = [...ideas];
    
    // Filter by specialty
    if (currentFilter !== 'all') {
        filtered = filtered.filter(idea => idea.specialty === currentFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
        if (currentSort === 'popular') {
            return b.votes - a.votes;
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
    
    return filtered;
}

function renderIdeas() {
    const filtered = filterAndSortIdeas();
    
    ideasGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        ideasGrid.style.display = 'none';
        ideasEmpty.style.display = 'block';
        ideasEmpty.querySelector('p').innerHTML = `No ideas yet for <strong>${currentFilter}</strong>. <strong>Be the first!</strong>`;
    } else {
        ideasGrid.style.display = 'grid';
        ideasEmpty.style.display = 'none';
        filtered.forEach(idea => {
            ideasGrid.appendChild(createIdeaCard(idea));
        });
    }
}

// ============================================
// Modal Functions
// ============================================

function openIdeaModal() {
    ideaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeIdeaModal() {
    ideaModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// FAQ Accordion
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
    // Scroll behavior
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ============================================
// PWA Install Prompt
// ============================================

let deferredPrompt;

function initPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if hidden
        if (installBtn) {
            installBtn.style.display = 'inline-flex';
        }
    });
    
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (installBtn) {
            installBtn.textContent = 'Installed';
            installBtn.disabled = true;
        }
    });
    
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            } else {
                // Show instructions for manual install
                alert('To install MedKitt:\n\n1. Tap the share button (iOS) or menu (Android)\n2. Select "Add to Home Screen"');
            }
        });
    }
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// ============================================
// Event Listeners
// ============================================

// Filter change
specialtyFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderIdeas();
});

// Sort buttons
sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.dataset.sort;
        renderIdeas();
    });
});

// Modal
submitIdeaBtn.addEventListener('click', openIdeaModal);
modalClose.addEventListener('click', closeIdeaModal);

ideaModal.addEventListener('click', (e) => {
    if (e.target === ideaModal) {
        closeIdeaModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ideaModal.classList.contains('active')) {
        closeIdeaModal();
    }
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderIdeas();
    initFAQ();
    initNavigation();
    initPWA();
    initScrollAnimations();
});

// Expose openIdeaModal globally for the empty state button
window.openIdeaModal = openIdeaModal;
