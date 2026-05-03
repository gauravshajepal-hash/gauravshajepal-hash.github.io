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
    
    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    // Skill categories with colors
    const categories = {
        operations: { color: '#3b82f6', label: 'Operations' },
        quality: { color: '#10b981', label: 'Quality' },
        leadership: { color: '#8b5cf6', label: 'Leadership' },
        technical: { color: '#f59e0b', label: 'Technical' },
        research: { color: '#ef4444', label: 'Research' }
    };
    
    // Particle background system
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.3 + 0.1,
            category: Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)]
        });
    }
    
    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > rect.width) p.vx *= -1;
            if (p.y < 0 || p.y > rect.height) p.vy *= -1;
        });
    }
    
    function drawParticles() {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            const cat = categories[p.category];
            ctx.fillStyle = cat.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
            ctx.fill();
        });
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    canvas.parentElement.appendChild(tooltip);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Skill nodes
    const nodes = [
        // Operations
        { id: 'production', label: 'Production\nSupervision', category: 'operations', size: 28, x: centerX - 200, y: centerY - 100 },
        { id: 'workflow', label: 'Workflow\nOptimization', category: 'operations', size: 24, x: centerX - 150, y: centerY + 50 },
        { id: 'sop', label: 'SOP\nCompliance', category: 'operations', size: 22, x: centerX - 280, y: centerY },
        { id: 'planning', label: 'Production\nPlanning', category: 'operations', size: 22, x: centerX - 180, y: centerY - 200 },
        
        // Quality
        { id: 'haccp', label: 'HACCP', category: 'quality', size: 30, x: centerX + 50, y: centerY - 150 },
        { id: 'gmp', label: 'GMP/GHP', category: 'quality', size: 24, x: centerX + 150, y: centerY - 50 },
        { id: 'traceability', label: 'Traceability', category: 'quality', size: 22, x: centerX + 100, y: centerY - 250 },
        { id: 'documentation', label: 'Documentation', category: 'quality', size: 22, x: centerX + 200, y: centerY - 180 },
        
        // Leadership
        { id: 'team', label: 'Team\nDevelopment', category: 'leadership', size: 24, x: centerX - 100, y: centerY + 150 },
        { id: 'stakeholder', label: 'Stakeholder\nComm.', category: 'leadership', size: 22, x: centerX + 50, y: centerY + 200 },
        { id: 'coaching', label: 'Coaching', category: 'leadership', size: 20, x: centerX - 200, y: centerY + 180 },
        
        // Technical
        { id: 'python', label: 'Python', category: 'technical', size: 26, x: centerX + 250, y: centerY + 50 },
        { id: 'data', label: 'Data\nAnalysis', category: 'technical', size: 24, x: centerX + 180, y: centerY + 120 },
        { id: 'statistics', label: 'Statistical\nMethods', category: 'technical', size: 22, x: centerX + 300, y: centerY - 50 },
        { id: 'sql', label: 'SQL', category: 'technical', size: 18, x: centerX + 320, y: centerY + 100 },
        
        // Research
        { id: 'biology', label: 'Systems\nBiology', category: 'research', size: 26, x: centerX - 50, y: centerY - 250 },
        { id: 'imaging', label: 'Image\nProcessing', category: 'research', size: 22, x: centerX + 150, y: centerY - 300 },
        { id: 'quantitative', label: 'Quantitative\nAnalysis', category: 'research', size: 24, x: centerX - 150, y: centerY - 280 },
        { id: 'experimental', label: 'Experimental\nDesign', category: 'research', size: 22, x: centerX - 50, y: centerY - 350 }
    ];
    
    // Connections between skills (skill transfer relationships)
    const connections = [
        // Operations internal
        { from: 'production', to: 'workflow', strength: 0.9 },
        { from: 'production', to: 'sop', strength: 0.8 },
        { from: 'production', to: 'planning', strength: 0.85 },
        { from: 'workflow', to: 'planning', strength: 0.7 },
        
        // Quality internal
        { from: 'haccp', to: 'gmp', strength: 0.9 },
        { from: 'haccp', to: 'traceability', strength: 0.8 },
        { from: 'gmp', to: 'documentation', strength: 0.7 },
        { from: 'traceability', to: 'documentation', strength: 0.75 },
        
        // Leadership internal
        { from: 'team', to: 'coaching', strength: 0.85 },
        { from: 'team', to: 'stakeholder', strength: 0.7 },
        
        // Technical internal
        { from: 'python', to: 'data', strength: 0.9 },
        { from: 'python', to: 'statistics', strength: 0.8 },
        { from: 'data', to: 'statistics', strength: 0.85 },
        { from: 'python', to: 'sql', strength: 0.7 },
        
        // Research internal
        { from: 'biology', to: 'quantitative', strength: 0.85 },
        { from: 'biology', to: 'imaging', strength: 0.8 },
        { from: 'quantitative', to: 'experimental', strength: 0.9 },
        { from: 'imaging', to: 'quantitative', strength: 0.7 },
        
        // Cross-category connections (skill transfer)
        { from: 'production', to: 'team', strength: 0.6 },
        { from: 'workflow', to: 'data', strength: 0.5 },
        { from: 'sop', to: 'documentation', strength: 0.7 },
        { from: 'haccp', to: 'sop', strength: 0.6 },
        { from: 'data', to: 'quantitative', strength: 0.8 },
        { from: 'statistics', to: 'quantitative', strength: 0.85 },
        { from: 'python', to: 'biology', strength: 0.5 },
        { from: 'stakeholder', to: 'documentation', strength: 0.4 },
        { from: 'team', to: 'production', strength: 0.6 },
        { from: 'experimental', to: 'data', strength: 0.7 }
    ];
    
    // Physics simulation
    let draggedNode = null;
    let mouseX = 0, mouseY = 0;
    let animationId = null;
    let isSimulating = true;
    
    // Initialize velocities
    nodes.forEach(node => {
        node.vx = 0;
        node.vy = 0;
        node.targetX = node.x;
        node.targetY = node.y;
    });
    
    function applyForces() {
        const repulsion = 5000;
        const attraction = 0.005;
        const damping = 0.85;
        const centerGravity = 0.001;
        
        // Repulsion between nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = repulsion / (dist * dist);
                
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                
                if (nodes[i] !== draggedNode) {
                    nodes[i].vx -= fx;
                    nodes[i].vy -= fy;
                }
                if (nodes[j] !== draggedNode) {
                    nodes[j].vx += fx;
                    nodes[j].vy += fy;
                }
            }
        }
        
        // Attraction along connections
        connections.forEach(conn => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return;
            
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = dist * attraction * conn.strength;
            
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            
            if (from !== draggedNode) {
                from.vx += fx;
                from.vy += fy;
            }
            if (to !== draggedNode) {
                to.vx -= fx;
                to.vy -= fy;
            }
        });
        
        // Center gravity
        nodes.forEach(node => {
            if (node === draggedNode) return;
            node.vx += (centerX - node.x) * centerGravity;
            node.vy += (centerY - node.y) * centerGravity;
        });
        
        // Update positions
        nodes.forEach(node => {
            if (node === draggedNode) return;
            
            node.vx *= damping;
            node.vy *= damping;
            
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary constraints
            const margin = 50;
            node.x = Math.max(margin, Math.min(rect.width - margin, node.x));
            node.y = Math.max(margin, Math.min(rect.height - margin, node.y));
        });
    }
    
    function draw() {
        // Draw particles
        drawParticles();
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Draw connections
        connections.forEach(conn => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return;
            
            const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
            gradient.addColorStop(0, categories[from.category].color + '40');
            gradient.addColorStop(1, categories[to.category].color + '40');
            
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = conn.strength * 2;
            ctx.stroke();
        });
        
        // Draw nodes
        nodes.forEach(node => {
            const cat = categories[node.category];
            const isHovered = isMouseOverNode(node);
            
            // Glow effect
            if (isHovered) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size + 10, 0, Math.PI * 2);
                ctx.fillStyle = cat.color + '20';
                ctx.fill();
            }
            
            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? cat.color : cat.color + 'CC';
            ctx.fill();
            ctx.strokeStyle = cat.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Node label
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.max(10, node.size * 0.45)}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const lines = node.label.split('\n');
            const lineHeight = node.size * 0.5;
            const startY = node.y - ((lines.length - 1) * lineHeight) / 2;
            
            lines.forEach((line, i) => {
                ctx.fillText(line, node.x, startY + i * lineHeight);
            });
        });
    }
    
    function isMouseOverNode(node) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        return Math.sqrt(dx * dx + dy * dy) < node.size + 5;
    }
    
    function animate() {
        if (isSimulating) {
            applyForces();
            updateParticles();
        }
        draw();
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        const rect2 = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect2.left;
        mouseY = e.clientY - rect2.top;
        
        if (draggedNode) {
            draggedNode.x = mouseX;
            draggedNode.y = mouseY;
            draggedNode.vx = 0;
            draggedNode.vy = 0;
        }
        
        // Update tooltip
        const hoveredNode = nodes.find(n => isMouseOverNode(n));
        if (hoveredNode) {
            const cat = categories[hoveredNode.category];
            tooltip.innerHTML = `
                <div class="tooltip-category">${cat.label}</div>
                <h4>${hoveredNode.label.replace('\n', ' ')}</h4>
            `;
            tooltip.style.left = (mouseX + 15) + 'px';
            tooltip.style.top = (mouseY - 10) + 'px';
            tooltip.classList.add('visible');
            canvas.style.cursor = 'pointer';
        } else {
            tooltip.classList.remove('visible');
            canvas.style.cursor = draggedNode ? 'grabbing' : 'grab';
        }
    });
    
    canvas.addEventListener('mousedown', (e) => {
        const rect2 = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect2.left;
        mouseY = e.clientY - rect2.top;
        
        draggedNode = nodes.find(n => isMouseOverNode(n));
        if (draggedNode) {
            canvas.style.cursor = 'grabbing';
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        draggedNode = null;
        canvas.style.cursor = 'grab';
    });
    
    canvas.addEventListener('mouseleave', () => {
        draggedNode = null;
        tooltip.classList.remove('visible');
    });
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect2 = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect2.left;
        mouseY = touch.clientY - rect2.top;
        
        draggedNode = nodes.find(n => isMouseOverNode(n));
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!draggedNode) return;
        
        const rect2 = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect2.left;
        mouseY = touch.clientY - rect2.top;
        
        draggedNode.x = mouseX;
        draggedNode.y = mouseY;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
    });
    
    canvas.addEventListener('touchend', () => {
        draggedNode = null;
    });
    
    // Start animation
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newRect = canvas.getBoundingClientRect();
        canvas.width = newRect.width * dpr;
        canvas.height = newRect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = newRect.width + 'px';
        canvas.style.height = newRect.height + 'px';
    });
}

// Initialize skills graph when DOM is ready
document.addEventListener('DOMContentLoaded', initSkillsGraph);


