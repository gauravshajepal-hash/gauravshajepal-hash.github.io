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

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-num[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Use IntersectionObserver to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(updateCounter, 300);
                    observer.unobserve(entry);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counters
animateCounters();


// ==================== SCROLL REVEAL ANIMATIONS ====================
let revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe skill bars for scroll-triggered animation
let skillBarsInitialized = false;

function checkSkillBars() {
    const skillBars = document.querySelectorAll('.bar-fill');
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && !skillBarsInitialized) {
        skillBarsInitialized = true;
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            }
        });
    }
}

// Observe reveal elements
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => revealObserver.observe(el));

// Check skill bars on scroll
window.addEventListener('scroll', checkSkillBars, { passive: true });
window.addEventListener('load', checkSkillBars);

// ==================== COUNTER ANIMATIONS ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

let countersAnimated = false;

function animateAllCounters() {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('[data-target]');
    const statsSection = document.querySelector('section[id]');
    
    let triggerSection = null;
    document.querySelectorAll('section[id]').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            triggerSection = section;
        }
    });
    
    if (triggerSection) {
        const countersInView = document.querySelectorAll('[data-target]');
        countersInView.forEach(counter => {
            if (counter.textContent === '0' || counter.textContent === '0') {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const delay = parseInt(counter.dataset.delay) || 0;
                
                setTimeout(() => {
                    animateCounter(counter, target, duration);
                }, delay);
            }
        });
        countersAnimated = true;
    }
}

// Enhanced counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateAllCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    counterObserver.observe(section);
});

// Also trigger on scroll for stats grids
window.addEventListener('scroll', () => {
    if (!countersAnimated) {
        animateAllCounters();
    }
}, { passive: true });

// Initialize counters on load
window.addEventListener('load', () => {
    setTimeout(animateAllCounters, 300);
});

// ==================== PROJECT/MOCKUP INTERACTIONS ====================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
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


