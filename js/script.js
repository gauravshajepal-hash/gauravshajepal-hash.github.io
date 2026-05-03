// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll reveal animation with Intersection Observer
const revealElements = document.querySelectorAll('.timeline-item, .education-card, .skill-category, .publication-item, .project-card, .repo-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Typing Animation
const typingTexts = [
    'Systems Biology & Production Management',
    'Operations & Quality Control',
    'Epidemiological Modelling',
    'Data Analysis & Research',
    'Workflow Optimization'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeText() {
    if (!typingElement) return;
    
    const currentText = typingTexts[typingIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typeSpeed = 400;
    }
    
    setTimeout(typeText, typeSpeed);
}

typeText();

// GitHub Repos Fetch
async function fetchGitHubRepos() {
    const grid = document.getElementById('reposGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('https://api.github.com/users/gauravshajepal-hash/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        if (!Array.isArray(repos)) {
            grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Could not load repositories.</p>';
            return;
        }
        
        const langColors = {
            Python: 'lang-python',
            JavaScript: 'lang-javascript',
            TypeScript: 'lang-typescript',
            HTML: 'lang-html',
            CSS: 'lang-css',
            Shell: 'lang-shell',
            Jupyter: 'lang-jupyter'
        };
        
        grid.innerHTML = repos
            .filter(repo => !repo.fork)
            .slice(0, 6)
            .map(repo => `
                <div class="repo-card">
                    <div class="repo-card-header">
                        <div class="repo-name">
                            <i class="fas fa-folder"></i>
                            ${repo.name}
                        </div>
                        ${repo.stargazers_count > 0 ? `
                            <span class="repo-stars">
                                <i class="fas fa-star"></i> ${repo.stargazers_count}
                            </span>
                        ` : ''}
                    </div>
                    <p class="repo-desc">${repo.description || 'No description available.'}</p>
                    <div class="repo-footer">
                        <span class="repo-lang">
                            ${repo.language ? `
                                <span class="repo-lang-dot ${langColors[repo.language] || 'lang-other'}"></span>
                                ${repo.language}
                            ` : ''}
                        </span>
                        <a href="${repo.html_url}" target="_blank" class="repo-link">
                            View <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        
        // Observe new repo cards
        document.querySelectorAll('.repo-card').forEach(card => {
            revealObserver.observe(card);
        });
        
    } catch (error) {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Could not load repositories.</p>';
    }
}

fetchGitHubRepos();

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--accent-gradient);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 999;
    }
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = document.querySelector('.mobile-menu-btn i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

console.log('Gaurav Shajepal Portfolio - Loaded Successfully!');
