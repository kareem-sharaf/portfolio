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
// Language Switcher (if translations are needed)
// ============================================
let currentLang = localStorage.getItem('language') || 'en';

// List of project names that should NOT be translated
// These are brand names and should remain in their original form
const projectNamesNoTranslate = [
    'Umrain',
    'Jaramana',
    'Jaramana Clinic Center',
    'Pear',
    'OfferMe',
    'E-Learning System'
];

// Function to check if text should be translated
function shouldTranslate(text) {
    // Check if text is a project name that should not be translated
    return !projectNamesNoTranslate.some(name => 
        text.trim() === name || text.includes(name)
    );
}

// Enhanced translation function that respects no-translate elements
// This ensures project names like "Umrain", "Jaramana", "Pear", "OfferMe" are never translated
function applyTranslationsSafe() {
    // Skip elements with data-no-translate attribute
    // Usage in HTML: <h3 data-i18n="projects.umrain.title" data-no-translate>Umrain</h3>
    document.querySelectorAll('[data-i18n]').forEach(element => {
        // Check if element has data-no-translate attribute
        if (element.hasAttribute('data-no-translate')) {
            return; // Skip this element - it should not be translated
        }
        
        // Check if the text content is a project name that should not be translated
        const originalText = element.textContent.trim();
        if (!shouldTranslate(originalText)) {
            return; // Skip project names - keep them in original language
        }
        
        // Apply translation here if translation system is added
        // const key = element.getAttribute('data-i18n');
        // const translation = getTranslation(key);
        // if (translation && translation !== key) {
        //     element.textContent = translation;
        // }
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
            
            // Apply translations (respecting no-translate elements)
            applyTranslationsSafe();
        });
    });
    
    // Set initial active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });
}

// Initialize language switcher
initLanguageSwitcher();

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
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            projectType: document.getElementById('contactProjectType').value,
            message: document.getElementById('contactMessage').value
        };
        
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
        formMessage.textContent = 'Opening your email client... If it doesn\'t open, please email kareem.sh.ite@gmail.com directly.';
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
        console.log('WhatsApp link clicked');
    });
});
