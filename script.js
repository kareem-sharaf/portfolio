// ============================================
// Premium Portfolio JavaScript
// Software Engineering Partner & System Architect
// ============================================

// ============================================
// Theme Toggle (Light/Dark Mode)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Highlighting
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const headerHeight = 80;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.style.color = '';
            });
            if (navLink) {
                navLink.style.color = '#4299e1';
            }
        }
    });
});

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.value-card, .tech-category, .method-step, .testimonial-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// Technology Item Hover Effects
// ============================================
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const techName = this.dataset.tech || this.querySelector('.tech-name').textContent;
        // You can add tooltip or description here if needed
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// Language Switcher & Translation System
// ============================================
let translations = {};
let currentLang = localStorage.getItem('language') || 'en';

// ============================================
// TRANSLATION EXCLUSION RULES
// Terms that should NEVER be translated
// ============================================

// 1. PROJECT & COMPANY NAMES (Keep as-is)
const projectNamesNoTranslate = [
    'Umrain',
    'Jaramana',
    'Jaramana Clinic Center',
    'Pear',
    'OfferMe',
    'E-Learning System'
];

// 2. TECHNICAL TERMS & PRODUCT NAMES (English only)
const technicalTermsNoTranslate = [
    // Languages & Frameworks
    'PHP', 'Java', 'C++', 'Python', 'HTML', 'CSS', 'JavaScript',
    'Laravel', 'Django', 'Spring Boot', 'Vue.js',
    // Databases
    'PostgreSQL', 'MySQL', 'Firebase', 'Redis',
    // Services & Platforms
    'GitHub', 'GitLab', 'LinkedIn', 'WhatsApp', 'AWS', 'Docker',
    'Stripe', 'PayPal', 'Agora', 'Pusher',
    // Protocols & Standards
    'JWT', 'REST', 'API', 'APIs', 'RESTful APIs', 'JSON', 'SQL', 'HTTP',
    'WebSocket', 'WebSockets', 'RBAC',
    // Technical Components
    'Database Design', 'Query Optimization', 'Multi-Gateway',
    'Webhook Handling', 'Resumable Uploads', 'Progress Tracking',
    'Multi-Currency', 'Modular Architecture', 'Commission Engine',
    'Slot Management', 'Dynamic Fields', 'Third-Party APIs',
    // Tools
    'Git', 'Postman', 'Laravel Echo', 'Blade Templates',
    // Abbreviations
    'CI/CD', 'DevOps', 'B2B', 'LMS'
];

// 3. CONTACT INFORMATION PATTERNS (Keep as-is)
const contactInfoPatterns = [
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email
    /^\+?[0-9]{10,15}$/, // Phone numbers
    /^https?:\/\//, // URLs
    /^wa\.me\//, // WhatsApp links
    /^mailto:/ // Mailto links
];

// 4. FILE EXTENSIONS & COMMANDS
const codeElementsNoTranslate = [
    '.json', '.js', '.css', '.html', '.php', '.java', '.py',
    'git commit', 'npm install', 'composer require'
];

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        // Error loading translations
    }
}

// Get translation by key
function getTranslation(key, lang = null) {
    const targetLang = lang || currentLang;
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    if (typeof value === 'object' && targetLang in value) {
        return value[targetLang];
    }
    
    return key; // Fallback to key
}

// Function to check if text should be translated
function shouldTranslate(text) {
    if (!text || typeof text !== 'string') return true;
    
    const trimmedText = text.trim();
    
    // 1. Check if text is a project/company name
    if (projectNamesNoTranslate.some(name => 
        trimmedText === name || trimmedText.includes(name)
    )) {
        return false;
    }
    
    // 2. Check if text contains technical terms (exact match or contains)
    if (technicalTermsNoTranslate.some(term => {
        // Exact match
        if (trimmedText === term) return true;
        // Contains as whole word (not part of another word)
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(trimmedText);
    })) {
        return false;
    }
    
    // 3. Check if text matches contact information patterns
    if (contactInfoPatterns.some(pattern => pattern.test(trimmedText))) {
        return false;
    }
    
    // 4. Check if text contains code elements
    if (codeElementsNoTranslate.some(element => trimmedText.includes(element))) {
        return false;
    }
    
    return true;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', currentLang);
    htmlElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        // Check if element has data-no-translate attribute
        if (element.hasAttribute('data-no-translate')) {
            return; // Skip this element - it should not be translated
        }
        
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        // Skip if translation not found or same as key
        if (!translation || translation === key) {
            return;
        }
        
        // Always apply translation if it exists and is different from key
        // The translation itself may contain technical terms, which is fine
        if (translation && translation !== key) {
            // Update text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'LABEL') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation && translation !== key && shouldTranslate(translation)) {
            element.placeholder = translation;
        }
    });
    
    // Translate option elements
    document.querySelectorAll('option[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation && translation !== key && shouldTranslate(translation)) {
            element.textContent = translation;
        }
    });
}

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update active state
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply translations
            applyTranslations();
        });
    });
    
    // Set initial active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });
}

// Initialize language switcher and load translations
initLanguageSwitcher();
loadTranslations();


// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 0.8s ease';
    }
    if (heroVisual) {
        heroVisual.style.animation = 'fadeInRight 0.8s ease';
    }
    
    // Apply translations after DOM is loaded
    if (Object.keys(translations).length > 0) {
        applyTranslations();
    }
});

// ============================================
// Contact Form Handling - Mailto
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            projectType: document.getElementById('contactProjectType').value,
            message: document.getElementById('contactMessage').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            formMessage.className = 'form-message error';
            formMessage.textContent = getTranslation('contact.formError') || 'Please fill in all required fields.';
            formMessage.style.display = 'block';
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            formMessage.className = 'form-message error';
            formMessage.textContent = getTranslation('contact.formEmailError') || 'Please enter a valid email address.';
            formMessage.style.display = 'block';
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact: ${formData.projectType || 'General Inquiry'}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Project Type: ${formData.projectType || 'Not specified'}\n\n` +
            `Message:\n${formData.message}`
        );
        
        // Open email client
        window.location.href = `mailto:kareem.sh.ite@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = getTranslation('contact.formSuccess') || 'Opening your email client... If it doesn\'t open, please email kareem.sh.ite@gmail.com directly.';
        formMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// ============================================
// WhatsApp Button Analytics (Optional)
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        // WhatsApp link clicked
    });
});
