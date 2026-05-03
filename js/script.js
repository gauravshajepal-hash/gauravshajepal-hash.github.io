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
const revealElements = document.querySelectorAll('.timeline-item, .education-card, .skill-category, .publication-item, .project-card, .repo-card, .reveal');

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

// ==================== SKILLS NETWORK GRAPH ====================
function initSkillsGraph() {
        const canvas = document.getElementById('skillsGraph');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
    
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';

        const categories = {
            operations: { color: '#2563eb', bg: 'rgba(37,99,235,0.08)', label: 'Operations' },
            quality: { color: '#059669', bg: 'rgba(5,150,105,0.08)', label: 'Quality' },
            leadership: { color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', label: 'Leadership' },
            technical: { color: '#d97706', bg: 'rgba(217,119,6,0.08)', label: 'Technical' },
            research: { color: '#dc2626', bg: 'rgba(220,38,38,0.08)', label: 'Research' }
        };

        const pillH = 28, pillR = 14, pillPad = 14, fontSize = 12;
        const cx = rect.width / 2, cy = rect.height / 2;

        const nodes = [
            { id: 'production', label: 'Production Supervision', category: 'operations', x: cx - 300, y: cy - 100 },
            { id: 'workflow', label: 'Workflow Optimization', category: 'operations', x: cx - 280, y: cy + 30 },
            { id: 'sop', label: 'SOP Compliance', category: 'operations', x: cx - 330, y: cy + 140 },
            { id: 'planning', label: 'Production Planning', category: 'operations', x: cx - 230, y: cy + 190 },
            { id: 'haccp', label: 'HACCP', category: 'quality', x: cx + 90, y: cy - 200 },
            { id: 'gmp', label: 'GMP / GHP', category: 'quality', x: cx + 230, y: cy - 130 },
            { id: 'traceability', label: 'Traceability', category: 'quality', x: cx + 110, y: cy - 290 },
            { id: 'documentation', label: 'Documentation', category: 'quality', x: cx + 240, y: cy - 230 },
            { id: 'team', label: 'Team Development', category: 'leadership', x: cx - 130, y: cy + 260 },
            { id: 'stakeholder', label: 'Stakeholder Comm.', category: 'leadership', x: cx + 90, y: cy + 280 },
            { id: 'coaching', label: 'Coaching', category: 'leadership', x: cx - 250, y: cy + 250 },
            { id: 'python', label: 'Python', category: 'technical', x: cx + 310, y: cy + 60 },
            { id: 'data', label: 'Data Analysis', category: 'technical', x: cx + 230, y: cy + 160 },
            { id: 'statistics', label: 'Statistical Methods', category: 'technical', x: cx + 370, y: cy + 0 },
            { id: 'sql', label: 'SQL', category: 'technical', x: cx + 370, y: cy + 130 },
            { id: 'biology', label: 'Systems Biology', category: 'research', x: cx - 70, y: cy - 250 },
            { id: 'imaging', label: 'Image Processing', category: 'research', x: cx + 170, y: cy - 330 },
            { id: 'quantitative', label: 'Quantitative Analysis', category: 'research', x: cx - 170, y: cy - 280 },
            { id: 'experimental', label: 'Experimental Design', category: 'research', x: cx - 50, y: cy - 360 }
        ];

        ctx.font = '600 ' + fontSize + 'px Inter, sans-serif';
        nodes.forEach(function(n) { n.pw = ctx.measureText(n.label).width + pillPad * 2; });

        var connections = [
            { from: 'production', to: 'workflow', strength: 0.9 }, { from: 'production', to: 'sop', strength: 0.8 },
            { from: 'production', to: 'planning', strength: 0.85 }, { from: 'workflow', to: 'planning', strength: 0.7 },
            { from: 'haccp', to: 'gmp', strength: 0.9 }, { from: 'haccp', to: 'traceability', strength: 0.8 },
            { from: 'gmp', to: 'documentation', strength: 0.7 }, { from: 'traceability', to: 'documentation', strength: 0.75 },
            { from: 'team', to: 'coaching', strength: 0.85 }, { from: 'team', to: 'stakeholder', strength: 0.7 },
            { from: 'python', to: 'data', strength: 0.9 }, { from: 'python', to: 'statistics', strength: 0.8 },
            { from: 'data', to: 'statistics', strength: 0.85 }, { from: 'python', to: 'sql', strength: 0.7 },
            { from: 'biology', to: 'quantitative', strength: 0.85 }, { from: 'biology', to: 'imaging', strength: 0.8 },
            { from: 'quantitative', to: 'experimental', strength: 0.9 }, { from: 'imaging', to: 'quantitative', strength: 0.7 },
            { from: 'production', to: 'team', strength: 0.6 }, { from: 'workflow', to: 'data', strength: 0.5 },
            { from: 'sop', to: 'documentation', strength: 0.7 }, { from: 'haccp', to: 'sop', strength: 0.6 },
            { from: 'data', to: 'quantitative', strength: 0.8 }, { from: 'statistics', to: 'quantitative', strength: 0.85 },
            { from: 'python', to: 'biology', strength: 0.5 }, { from: 'stakeholder', to: 'documentation', strength: 0.4 },
            { from: 'team', to: 'production', strength: 0.6 }, { from: 'experimental', to: 'data', strength: 0.7 }
        ];

        var draggedNode = null, mouseX = 0, mouseY = 0, animId = null;
        nodes.forEach(function(n) { n.vx = 0; n.vy = 0; });

        function applyForces() {
            var rep = 6000, att = 0.006, damp = 0.85, cg = 0.001;
            for (var i = 0; i < nodes.length; i++) {
                for (var j = i + 1; j < nodes.length; j++) {
                    var dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
                    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    var force = rep / (dist * dist);
                    var fx = (dx / dist) * force, fy = (dy / dist) * force;
                    if (nodes[i] !== draggedNode) { nodes[i].vx -= fx; nodes[i].vy -= fy; }
                    if (nodes[j] !== draggedNode) { nodes[j].vx += fx; nodes[j].vy += fy; }
                }
            }
            connections.forEach(function(conn) {
                var f = nodes.find(function(n) { return n.id === conn.from; });
                var t = nodes.find(function(n) { return n.id === conn.to; });
                if (!f || !t) return;
                var dx = t.x - f.x, dy = t.y - f.y;
                var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                var force = dist * att * conn.strength;
                var fx = (dx / dist) * force, fy = (dy / dist) * force;
                if (f !== draggedNode) { f.vx += fx; f.vy += fy; }
                if (t !== draggedNode) { t.vx -= fx; t.vy -= fy; }
            });
            nodes.forEach(function(n) {
                if (n === draggedNode) return;
                n.vx += (cx - n.x) * cg;
                n.vy += (cy - n.y) * cg;
                n.vx *= damp; n.vy *= damp;
                n.x += n.vx; n.y += n.vy;
                var m = 50;
                n.x = Math.max(m + n.pw/2, Math.min(rect.width - m - n.pw/2, n.x));
                n.y = Math.max(m + pillH, Math.min(rect.height - m, n.y));
            });
        }

        function drawPill(n, hovered) {
            var cat = categories[n.category];
            var w = n.pw, h = pillH, r = pillR;
            var x = n.x - w/2, y = n.y - h/2;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.06)';
            ctx.shadowBlur = hovered ? 10 : 3;
            ctx.shadowOffsetY = 1;
            ctx.beginPath();
            ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fillStyle = hovered ? cat.color : cat.bg;
            ctx.fill();
            ctx.strokeStyle = hovered ? cat.color : cat.color + '30';
            ctx.lineWidth = hovered ? 2 : 1;
            ctx.stroke();
            ctx.shadowColor = 'transparent';
            ctx.fillStyle = hovered ? '#ffffff' : cat.color;
            ctx.font = '600 ' + fontSize + 'px Inter, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(n.label, n.x, n.y);
            ctx.restore();
        }

        function isOverNode(n, mx, my) {
            return Math.abs(mx - n.x) < n.pw/2 + 6 && Math.abs(my - n.y) < pillH/2 + 6;
        }

        function draw() {
            ctx.clearRect(0, 0, rect.width, rect.height);
            connections.forEach(function(conn) {
                var f = nodes.find(function(n) { return n.id === conn.from; });
                var t = nodes.find(function(n) { return n.id === conn.to; });
                if (!f || !t) return;
                ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y);
                ctx.strokeStyle = 'rgba(148,163,184,0.22)';
                ctx.lineWidth = Math.max(0.5, conn.strength * 1.2);
                ctx.stroke();
            });
            nodes.forEach(function(n) { drawPill(n, isOverNode(n, mouseX, mouseY)); });
        }

        function animate() {
            applyForces(); draw();
            animId = requestAnimationFrame(animate);
        }

        var tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        canvas.parentElement.appendChild(tooltip);

        canvas.addEventListener('mousemove', function(e) {
            var r = canvas.getBoundingClientRect();
            mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
            if (draggedNode) { draggedNode.x = mouseX; draggedNode.y = mouseY; draggedNode.vx = 0; draggedNode.vy = 0; }
            var hovered = nodes.find(function(n) { return isOverNode(n, mouseX, mouseY); });
            if (hovered) {
                var cat = categories[hovered.category];
                tooltip.innerHTML = '<div class="tooltip-category">' + cat.label + '</div><h4>' + hovered.label + '</h4>';
                tooltip.style.left = (mouseX + 15) + 'px'; tooltip.style.top = (mouseY - 10) + 'px';
                tooltip.classList.add('visible'); canvas.style.cursor = 'pointer';
            } else { tooltip.classList.remove('visible'); canvas.style.cursor = 'grab'; }
        });

        canvas.addEventListener('mousedown', function(e) {
            var r = canvas.getBoundingClientRect();
            mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
            draggedNode = nodes.find(function(n) { return isOverNode(n, mouseX, mouseY); }) || null;
            if (draggedNode) canvas.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mouseup', function() { draggedNode = null; canvas.style.cursor = 'grab'; });
        canvas.addEventListener('mouseleave', function() { draggedNode = null; tooltip.classList.remove('visible'); });

        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            var r = canvas.getBoundingClientRect(), t = e.touches[0];
            mouseX = t.clientX - r.left; mouseY = t.clientY - r.top;
            draggedNode = nodes.find(function(n) { return isOverNode(n, mouseX, mouseY); }) || null;
        });
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault(); if (!draggedNode) return;
            var r = canvas.getBoundingClientRect(), t = e.touches[0];
            mouseX = t.clientX - r.left; mouseY = t.clientY - r.top;
            draggedNode.x = mouseX; draggedNode.y = mouseY; draggedNode.vx = 0; draggedNode.vy = 0;
        });
        canvas.addEventListener('touchend', function() { draggedNode = null; });

        animate();

        window.addEventListener('resize', function() {
            var newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width * dpr; canvas.height = newRect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = newRect.width + 'px'; canvas.style.height = newRect.height + 'px';
        });
    }

    // Initialize skills graph when DOM is ready
    document.addEventListener('DOMContentLoaded', initSkillsGraph);

