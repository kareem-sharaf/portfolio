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

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Get translation by key
function getTranslation(key) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    if (typeof value === 'object' && currentLang in value) {
        return value[currentLang];
    }
    
    return key; // Fallback to key
}

// Function to check if text should be translated
function shouldTranslate(text) {
    // Check if text is a project name that should not be translated
    return !projectNamesNoTranslate.some(name => 
        text.trim() === name || text.includes(name)
    );
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
        
        // Check if the translation is a project name that should not be translated
        if (translation && translation !== key && shouldTranslate(translation)) {
            // Update text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
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
// Contact Form Handling with Web3Forms
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Hide previous messages
        formMessage.style.display = 'none';
        
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
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        // Check if access key is configured
        const accessKey = 'YOUR_ACCESS_KEY'; // Replace with your Web3Forms access key from https://web3forms.com
        
        if (accessKey === 'YOUR_ACCESS_KEY') {
            // Fallback to mailto if access key not configured
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.projectType || 'General Inquiry'}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Project Type: ${formData.projectType || 'Not specified'}\n\n` +
                `Message:\n${formData.message}`
            );
            
            window.location.href = `mailto:kareem.sh.ite@gmail.com?subject=${subject}&body=${body}`;
            
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Opening your email client... If it doesn\'t open, please email kareem.sh.ite@gmail.com directly.';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
            
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        try {
            // Send email using Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `Portfolio Contact: ${formData.projectType || 'General Inquiry'}`,
                    from_name: formData.name,
                    from_email: formData.email,
                    message: `Project Type: ${formData.projectType || 'Not specified'}\n\nMessage:\n${formData.message}`,
                    to_email: 'kareem.sh.ite@gmail.com'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Fallback to mailto on error
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.projectType || 'General Inquiry'}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Project Type: ${formData.projectType || 'Not specified'}\n\n` +
                `Message:\n${formData.message}`
            );
            
            window.location.href = `mailto:kareem.sh.ite@gmail.com?subject=${subject}&body=${body}`;
            
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Opening your email client as fallback...';
            formMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
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
