// ============================================
// Portfolio Website JavaScript
// ============================================

// ============================================
// Translation Service
// ============================================
let translations = {};
let currentLang = localStorage.getItem('language') || 'en';

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Get translation by key path (e.g., "nav.home" -> translations.nav.home[currentLanguage])
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

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    // Update HTML lang and dir attributes
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', currentLang);
    htmlElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', translation);
        } else {
            element.textContent = translation;
        }
    });
    
    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        const translation = getTranslation(key);
        element.setAttribute('aria-label', translation);
    });
    
    // Update language switcher active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update project modal content if it's open
    const modal = document.getElementById('projectModal');
    if (modal && modal.classList.contains('active')) {
        const projectKey = modal.dataset.currentProject;
        if (projectKey) {
            openModal(projectKey);
        }
    }
}

// Switch language
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    
    // Re-trigger animations for RTL/LTR transition
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100);
    });
}

// Initialize language switcher
function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });
}

// Load translations on page load
loadTranslations().then(() => {
    initLanguageSwitcher();
});

// ============================================
// Project Data
// ============================================
const projectsData = {
    jaramana: {
        title: "Jaramana Clinic Center",
        category: "Healthcare",
        type: "Medical Management System",
        description: "Comprehensive medical clinic management system designed to streamline healthcare operations for clinics and medical centers.",
        challenge: "Building a secure, HIPAA-compliant system that handles appointment booking, medical records, real-time communication, and complex scheduling logic while maintaining data integrity and security.",
        solution: "Implemented a dual authentication system with separate endpoints for employees and patients, preventing security vulnerabilities. Built a polymorphic booking model supporting rescheduling with history tracking. Created a work schedule system with day-of-week patterns and time slots preventing double-booking. Implemented WebSocket-based real-time chat with JWT authentication at the WebSocket level.",
        impact: "Digitized clinic operations, reducing manual paperwork by 80%. The appointment booking system prevents double-booking and scheduling conflicts. Medical record system maintains comprehensive patient history, improving continuity of care.",
        technologies: ["Java 17", "Spring Boot 3.2.8", "PostgreSQL", "WebSocket", "JWT", "Firebase Cloud Messaging", "Spring Security"],
        keyFeatures: [
            "Dual authentication system (employees & patients)",
            "Appointment booking with availability checking",
            "Medical record management with finalization workflow",
            "Real-time chat using WebSocket with STOMP",
            "Work schedule and holiday management",
            "Push notifications via Firebase",
            "WhatsApp OTP integration"
        ],
        challenges: [
            {
                title: "Dual Authentication System Security",
                description: "Implemented separate authentication endpoints for employees and patients to prevent client-controlled authentication logic vulnerabilities."
            },
            {
                title: "Appointment Availability Calculation",
                description: "Created a system that considers work schedules, existing bookings, doctor holidays, and appointment slot durations to prevent conflicts."
            },
            {
                title: "WebSocket Chat Security",
                description: "Implemented secure real-time chat with WebSocket channel interceptors validating JWT tokens and session-based access control."
            }
        ],
        role: "Complete backend development including Spring Boot RESTful API design, database schema design with JPA entities, dual authentication system, appointment booking system, medical record management, real-time chat system, and push notification integration."
    },
    elearning: {
        title: "E-Learning System",
        category: "Education",
        type: "University Course Management Platform",
        description: "Comprehensive online education platform designed for universities and educational institutions with structured content including videos, quizzes, and attachments.",
        challenge: "Creating a scalable LMS that handles large video file uploads, manages course hierarchies (universities → colleges → courses), tracks student progress accurately, and supports resumable uploads for unreliable network connections.",
        solution: "Implemented resumable video uploads using django-tus and drf-chunked-upload packages. Created a multi-level hierarchy system with proper relationships. Built enrollment progress calculation with denormalized progress fields updated through signals. Implemented comprehensive RBAC system with custom permission classes. Created status-based workflow for course lifecycle management.",
        impact: "Enabled educational institutions to deliver structured online courses with proper academic organization. Progress tracking provides students with clear visibility into their learning journey. Resumable upload feature ensures large video files can be reliably uploaded even with unstable network connections.",
        technologies: ["Python 3.x", "Django 5.0+", "Django REST Framework", "PostgreSQL", "Celery", "Redis", "AWS S3", "django-tus"],
        keyFeatures: [
            "Resumable video uploads (TUS protocol & chunked uploads)",
            "Multi-level course hierarchy (Universities → Colleges → Courses)",
            "Enrollment and payment processing system",
            "Quiz system with automatic grading",
            "Progress tracking with real-time updates",
            "RBAC system for teachers, students, and admins",
            "Background task processing with Celery"
        ],
        challenges: [
            {
                title: "Resumable Video Uploads",
                description: "Implemented TUS protocol and chunked uploads to handle large video files that may be interrupted, with upload session tracking and validation."
            },
            {
                title: "Enrollment Progress Calculation",
                description: "Created a system that tracks multiple completion criteria (videos watched, quizzes completed) and updates progress in real-time with denormalized fields."
            },
            {
                title: "Course Status Workflow",
                description: "Implemented approval workflows where teachers create content but admins must approve before students can enroll, with constrained state transitions."
            }
        ],
        role: "Backend architecture and development including Django REST Framework API design, database schema design, course content management system, enrollment and payment processing, quiz system, RBAC implementation, and background task processing."
    },
    umrain: {
        title: "Umrain",
        category: "Travel",
        type: "Multi-Vendor Travel & Booking Marketplace",
        description: "Large-scale multi-vendor marketplace for hotels, tours, flights, boats, cars, and event spaces with polymorphic booking system, commission management, and multi-currency support.",
        challenge: "Building a unified booking system that works across completely different service types (hotels with rooms, tours with schedules, flights with seats) while handling different availability models, commission calculations, and multi-currency transactions.",
        solution: "Created a polymorphic Bookable interface that all service types implement, allowing consistent booking processing while maintaining service-specific attributes. Implemented a modular architecture where each travel service type is a self-contained module. Built a dynamic pricing engine that handles base prices, seasonal adjustments, discounts, and coupons. Created a commission system with different models (percentage, fixed, per-person) and timing options.",
        impact: "Enabled travel service vendors to reach a wider audience through a unified marketplace. The multi-service approach provides customers with a one-stop booking experience. The modular architecture allows rapid addition of new service types without disrupting existing functionality.",
        technologies: ["PHP 8.1+", "Laravel 10", "MySQL", "Stripe", "PayPal", "Paystack", "Pusher", "AWS S3"],
        keyFeatures: [
            "Polymorphic booking system for multiple service types",
            "Multi-vendor commission system with flexible models",
            "Dynamic pricing engine with seasonal rates",
            "Multi-currency support with real-time conversion",
            "Availability management for different service types",
            "Vendor management with role-based permissions",
            "Review and rating system across all services"
        ],
        challenges: [
            {
                title: "Polymorphic Booking System",
                description: "Created a unified booking system that works across hotels, tours, flights, cars with different availability models (inventory-based, capacity-based, seat-based)."
            },
            {
                title: "Multi-Vendor Commission System",
                description: "Implemented revenue sharing with different commission models (percentage, fixed, per-person) and timing (at booking, at completion, on cancellation)."
            },
            {
                title: "Dynamic Pricing Engine",
                description: "Built a flexible pricing calculation system that applies base prices, seasonal adjustments, extra charges, service fees, discounts, and coupons in order."
            }
        ],
        role: "Backend architecture and core module development including modular architecture design, unified booking system, payment gateway integrations, commission system, multi-currency support, availability management, pricing engine, and vendor management system."
    },
    pear: {
        title: "Pear",
        category: "Healthcare",
        type: "Telemedicine Platform",
        description: "Telemedicine platform connecting healthcare providers with clients for remote consultations via real-time video conferencing, appointment scheduling, and payment processing.",
        challenge: "Integrating real-time video conferencing with secure token generation, managing session state synchronization between database and Agora platform, handling availability and slot management to prevent double-booking, and implementing payment capture timing with hold-and-capture mechanism.",
        solution: "Integrated Agora SDK with dynamic token generation for secure room access. Implemented webhook-based event logging to track all Agora room events. Created a slot-based scheduling system separating availability (recurring templates) from slots (concrete time instances). Built a document verification workflow with admin approval gates. Implemented invoice generation linked to bookings with status-based payment triggers.",
        impact: "Enabled healthcare providers to expand their reach beyond physical locations, increasing patient access to medical services. The automated scheduling system reduces administrative overhead. The integrated video conferencing eliminates the need for external tools, providing a seamless consultation experience.",
        technologies: ["PHP 8.1+", "Laravel 10", "Agora SDK", "MySQL", "Stripe", "Firebase Cloud Messaging", "Laravel Sanctum"],
        keyFeatures: [
            "Real-time video conferencing via Agora SDK",
            "Appointment scheduling with availability management",
            "Slot-based scheduling system",
            "Document verification workflow",
            "Payment processing with Stripe",
            "Webhook handling for third-party integrations",
            "Push notifications with multilingual support"
        ],
        challenges: [
            {
                title: "Agora Video Integration",
                description: "Integrated real-time video conferencing with secure token generation, webhook event logging, and session state synchronization between database and Agora platform."
            },
            {
                title: "Availability and Slot Management",
                description: "Created a flexible scheduling system separating availability (recurring templates) from slots (concrete time instances) with atomic database operations to prevent double-booking."
            },
            {
                title: "Payment Capture Timing",
                description: "Implemented a hold-and-capture mechanism where funds are captured only after session completion or provider approval, with proper refund handling for canceled sessions."
            }
        ],
        role: "Complete backend development including RESTful API design, database schema design for booking and scheduling, real-time video session management, availability and time slot management, authentication and authorization, push notification system, payment processing integration, and webhook handling."
    },
    offerme: {
        title: "OfferMe",
        category: "Marketplace",
        type: "Service Marketplace Platform",
        description: "B2B service marketplace connecting service providers with clients. Features request posting, competitive offers, real-time chat, dynamic field system, and multilingual push notifications.",
        challenge: "Implementing a unified authentication system where users can simultaneously act as both clients and providers, building a thread-based messaging system with read receipts, sending push notifications in user-preferred languages, and creating a flexible schema for category-specific request attributes.",
        solution: "Implemented ability-based tokens where Sanctum tokens carry role abilities, allowing the same user account to access different features based on role context. Built a thread-based messaging system with participant pivot tables and seen_at timestamps. Created a multilingual notification system storing language preferences in FCM token registrations. Implemented a dynamic field system using polymorphic relationships with category associations.",
        impact: "Enabled efficient matching between service seekers and providers, reducing time-to-contract significantly. Real-time communication features facilitate quick negotiations. The dynamic field system allows the platform to adapt to different service categories without code changes.",
        technologies: ["PHP 8.1+", "Laravel 10", "MySQL", "Laravel Sanctum", "Laravel Broadcasting", "Firebase Cloud Messaging", "Spatie Packages"],
        keyFeatures: [
            "Multi-role user system (client & provider)",
            "Real-time chat with presence tracking",
            "Multilingual push notifications",
            "Dynamic field system for category-specific attributes",
            "Offer management workflow with status tracking",
            "File upload and media management",
            "Event-driven notification system"
        ],
        challenges: [
            {
                title: "Multi-Role User System",
                description: "Implemented ability-based tokens where Sanctum tokens carry role abilities, allowing the same user account to access different features based on role context."
            },
            {
                title: "Real-Time Chat with Presence Tracking",
                description: "Built a thread-based messaging system with read receipts and online user detection using Laravel Broadcasting with presence channels."
            },
            {
                title: "Multilingual Push Notifications",
                description: "Created a system that sends push notifications in user-preferred languages while maintaining a single notification record, grouping notifications by language and sending parallel batches."
            }
        ],
        role: "Complete backend development including RESTful API design and implementation, database schema design, authentication and authorization systems, real-time chat messaging infrastructure, push notification system with multilingual support, dynamic field system, and offer management workflow."
    }
};

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
                navLink.style.color = '#3B82F6';
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
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

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
// Animated Counter for Metrics
// ============================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.dataset.target);
            const suffix = entry.target.dataset.suffix || '';
            animateCounter(entry.target, target, suffix);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-value').forEach(metric => {
    metricObserver.observe(metric);
});

// ============================================
// Project Filtering
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get filter value
        const filter = button.dataset.filter;

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// Project Modal
// ============================================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const viewDetailsButtons = document.querySelectorAll('.btn-view-details');

function openModal(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;
    
    // Store current project for language switching
    modal.dataset.currentProject = projectKey;

    modalBody.innerHTML = `
        <div class="modal-project-header">
            <span class="modal-badge">${project.category}</span>
            <h2>${project.title}</h2>
            <p class="modal-project-type">${project.type}</p>
        </div>

        <div class="modal-section">
            <h3>Overview</h3>
            <p>${project.description}</p>
        </div>

        <div class="modal-section">
            <h3>The Challenge</h3>
            <p>${project.challenge}</p>
        </div>

        <div class="modal-section">
            <h3>The Solution</h3>
            <p>${project.solution}</p>
        </div>

        <div class="modal-section">
            <h3>Key Features</h3>
            <ul class="feature-list">
                ${project.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Engineering Challenges</h3>
            <div class="challenges-list">
                ${project.challenges.map(challenge => `
                    <div class="challenge-item">
                        <h4>${challenge.title}</h4>
                        <p>${challenge.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3>Technologies & Tools</h3>
            <div class="modal-tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3>Impact & Value</h3>
            <p>${project.impact}</p>
        </div>

        <div class="modal-section">
            <h3>My Role</h3>
            <p>${project.role}</p>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectKey = button.dataset.project;
        openModal(projectKey);
    });
});

modalClose.addEventListener('click', closeModal);

modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
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
// 3D Tilt Effect on Project Cards
// ============================================
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

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
    
    // Initialize language switcher (in case translations loaded before DOM)
    if (document.querySelectorAll('.lang-btn').length > 0) {
        initLanguageSwitcher();
    }
});
