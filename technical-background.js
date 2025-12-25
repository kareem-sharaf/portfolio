// ============================================
// Premium Neural Network Background System
// AI/Intelligence Visualization
// Advanced Neural Network & Data Processing
// ============================================

class TechnicalBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.svgContainer = null;
        this.particles = [];
        this.nodes = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.rippleElement = null;
        
        this.settings = {
            particleCount: 60,
            nodeCount: 20,
            highQuality: true,
            enabled: true,
            mouseInteraction: true,
            elegantMode: true  // Elegant floating shapes mode
        };
        
        // Shape types for elegant design
        this.shapeTypes = ['circle', 'square', 'diamond'];
        this.activeConnections = new Set();
        this.connectionFlowInterval = null;
        
        // Detect mobile device
        this.isMobile = window.innerWidth <= 768;
        if (this.isMobile) {
            this.settings.particleCount = 40;
            this.settings.nodeCount = 15;
        }
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.createNodes();
        this.createParticles();
        this.setupEventListeners();
        this.loadPreferences();
        this.animate();
    }
    
    setupElements() {
        // Get or create canvas
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) {
            console.error('Technical Background: Canvas element not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Get SVG container
        this.svgContainer = document.querySelector('.bg-svg');
        if (!this.svgContainer) {
            console.error('Technical Background: SVG container not found');
            return;
        }
        
        console.log('Technical Background: Elements found successfully');
        
        // Get ripple element
        this.rippleElement = document.querySelector('.mouse-ripple');
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            // Adjust particle count on resize
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                this.settings.particleCount = this.isMobile ? 40 : 80;
                this.settings.nodeCount = this.isMobile ? 15 : 25;
                this.createParticles();
            }
        });
    }
    
    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
    
    createNodes() {
        if (!this.svgContainer) return;
        
        // Clear existing nodes (keep defs)
        const existingNodes = this.svgContainer.querySelectorAll('.svg-node');
        existingNodes.forEach(node => node.remove());
        
        this.nodes = [];
        
        for (let i = 0; i < this.settings.nodeCount; i++) {
            const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            
            // Random position (percentage-based for responsiveness)
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Elegant floating shapes - circles, squares, diamonds
            const shapeTypeRoll = Math.random();
            let shapeType, size;
            
            if (shapeTypeRoll < 0.6) {
                // Circles (60%) - Most common
                shapeType = 'circle';
                size = 6 + Math.random() * 10; // 6-16px
                node.setAttribute('cx', `${x}%`);
                node.setAttribute('cy', `${y}%`);
                node.setAttribute('r', size);
            } else if (shapeTypeRoll < 0.85) {
                // Squares (25%)
                shapeType = 'square';
                size = 8 + Math.random() * 8; // 8-16px
                node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                node.setAttribute('x', `${x - size/2}%`);
                node.setAttribute('y', `${y - size/2}%`);
                node.setAttribute('width', size);
                node.setAttribute('height', size);
                node.setAttribute('rx', size * 0.15); // Rounded corners
            } else {
                // Diamonds (15%)
                shapeType = 'diamond';
                size = 10 + Math.random() * 8; // 10-18px
                node = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const points = [
                    `${x}%,${y - size/2}%`,
                    `${x + size/2}%,${y}%`,
                    `${x}%,${y + size/2}%`,
                    `${x - size/2}%,${y}%`
                ].join(' ');
                node.setAttribute('points', points);
            }
            
            // Set attributes
            node.setAttribute('class', `svg-node node-${shapeType}`);
            node.setAttribute('fill', `url(#nodeGradient)`);
            
            // Elegant floating animations
            const duration = 25 + Math.random() * 20; // 25-45s for slower, more elegant movement
            const delay = Math.random() * 3;
            node.style.animation = `elegantFloat ${duration}s infinite ease-in-out ${delay}s`;
            
            // Optional: Add subtle pulse to some shapes
            if (Math.random() > 0.7) {
                node.style.animation += `, subtlePulse ${4 + Math.random() * 3}s infinite ease-in-out`;
            }
            
            // Optional: Gentle rotation for squares and diamonds
            if ((shapeType === 'square' || shapeType === 'diamond') && Math.random() > 0.5) {
                const rotateDuration = 30 + Math.random() * 20;
                node.style.animation += `, gentleRotate ${rotateDuration}s linear infinite`;
            }
            
            this.svgContainer.appendChild(node);
            this.nodes.push({ 
                element: node, 
                x, 
                y, 
                size,
                type: shapeType
            });
        }
        
        console.log(`Technical Background: Created ${this.nodes.length} nodes`);
        
        // Create connections between nearby nodes
        this.createConnections();
    }
    
    createConnections() {
        // Remove existing connections - keep minimal for elegant design
        const existingConnections = this.svgContainer.querySelectorAll('.node-connection');
        existingConnections.forEach(conn => conn.remove());
        
        this.activeConnections.clear();
        
        // Create minimal, elegant connections - fewer and more subtle
        const maxDistance = 25; // percentage
        const connectionProbability = 0.92; // Only 8% of close nodes connect (more elegant, less busy)
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only connect if within maxDistance and random chance
                if (distance < maxDistance && Math.random() > connectionProbability) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', `${node1.x}%`);
                    line.setAttribute('y1', `${node1.y}%`);
                    line.setAttribute('x2', `${node2.x}%`);
                    line.setAttribute('y2', `${node2.y}%`);
                    line.setAttribute('class', 'node-connection');
                    line.setAttribute('stroke', 'rgba(99, 102, 241, 0.15)');
                    line.setAttribute('stroke-width', '0.5');
                    line.setAttribute('opacity', '0.3');
                    
                    // Store connection reference
                    const connectionId = `${i}-${j}`;
                    line.dataset.connectionId = connectionId;
                    this.activeConnections.add(connectionId);
                    
                    // Subtle animation
                    const animDuration = 4 + Math.random() * 3;
                    line.style.animation = `connectionPulse ${animDuration}s infinite ease-in-out`;
                    line.style.animationDelay = `${Math.random() * 2}s`;
                    
                    this.svgContainer.appendChild(line);
                }
            }
        }
    }
    
    createParticles() {
        if (!this.canvas) return;
        
        this.particles = [];
        
        for (let i = 0; i < this.settings.particleCount; i++) {
            // Elegant particles - simpler and more refined
            const color = this.getThemeColor('particle');
            const baseSpeed = 0.5 + Math.random() * 0.5; // Slower, more elegant
            
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 1 + Math.random() * 2,
                speedX: (-0.3 + Math.random() * 0.6) * baseSpeed,
                speedY: (-0.2 + Math.random() * 0.4) * baseSpeed,
                color: color,
                trail: [],
                maxTrailLength: 4,
                repulsionForce: 0.08 // Gentle repulsion
            });
        }
    }
    
    getThemeColor(type) {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const isDark = theme === 'dark';
        
        const colors = {
            particle: isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)',
            connection: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)',
            trail: isDark ? 'rgba(99, 102, 241, 0.04)' : 'rgba(99, 102, 241, 0.03)'
        };
        
        return colors[type] || colors.particle;
    }
    
    drawParticles() {
        if (!this.ctx || !this.canvas || !this.settings.enabled) return;
        
        // Clear with very subtle fade for trail effect
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const clearColor = theme === 'dark' 
            ? 'rgba(26, 32, 44, 0.03)' 
            : 'rgba(248, 250, 252, 0.03)';
        
        this.ctx.fillStyle = clearColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Debug: Check if particles exist
        if (this.particles.length === 0) {
            console.warn('Technical Background: No particles to draw');
            this.createParticles();
        }
        
        // Draw connections between close particles (high quality only)
        if (this.settings.highQuality) {
            this.drawParticleConnections();
        }
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Store position for trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > particle.maxTrailLength) {
                particle.trail.shift();
            }
            
            // Draw trail (very subtle)
            if (this.settings.highQuality && particle.trail.length > 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                
                this.ctx.strokeStyle = this.getThemeColor('trail');
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }
            
            // Gentle mouse interaction - particles gently avoid cursor
            if (this.settings.mouseInteraction) {
                const dx = particle.x - this.mouse.x; // Repulsion
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    // Gentle repulsion for elegant effect
                    particle.speedX += (dx / distance) * force * particle.repulsionForce;
                    particle.speedY += (dy / distance) * force * particle.repulsionForce;
                }
            }
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check with wrap
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;
            
            // Gentle damping
            particle.speedX *= 0.99;
            particle.speedY *= 0.99;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
    }
    
    drawParticleConnections() {
        const maxDistance = 100; // Reduced for more elegant look
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - (distance / maxDistance)) * 0.03; // More subtle
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = this.getThemeColor('connection');
                    this.ctx.globalAlpha = opacity;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    drawWaveforms() {
        // Elegant waveform patterns similar to reference site
        if (!this.waveTime) this.waveTime = 0;
        this.waveTime += 0.01;
        
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const waveColor = theme === 'dark' 
            ? 'rgba(99, 102, 241, 0.05)' 
            : 'rgba(99, 102, 241, 0.04)';
        
        this.ctx.strokeStyle = waveColor;
        this.ctx.lineWidth = 1.5;
        this.ctx.globalAlpha = 0.6;
        
        // Draw 3-4 subtle waveforms
        const waveCount = 3;
        const waveHeight = this.canvas.height / (waveCount + 1);
        
        for (let i = 0; i < waveCount; i++) {
            this.ctx.beginPath();
            const y = waveHeight * (i + 1);
            const amplitude = 30 + Math.sin(this.waveTime + i) * 10;
            const frequency = 0.005 + (i * 0.002);
            const phase = this.waveTime * 0.5 + (i * Math.PI);
            
            for (let x = 0; x < this.canvas.width; x += 2) {
                const waveY = y + Math.sin(x * frequency + phase) * amplitude;
                if (x === 0) {
                    this.ctx.moveTo(x, waveY);
                } else {
                    this.ctx.lineTo(x, waveY);
                }
            }
            
            this.ctx.stroke();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    setupEventListeners() {
        // Mouse movement for interactive highlights
        if (this.settings.mouseInteraction) {
            let mouseMoveThrottle = 0;
            window.addEventListener('mousemove', (e) => {
                // Throttle mouse updates for performance
                mouseMoveThrottle++;
                if (mouseMoveThrottle % 2 === 0) return;
                
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                
                // Update ripple position
                if (this.rippleElement) {
                    this.rippleElement.style.left = `${e.clientX}px`;
                    this.rippleElement.style.top = `${e.clientY}px`;
                    this.rippleElement.classList.add('active');
                    
                    // Remove active class after animation
                    setTimeout(() => {
                        this.rippleElement.classList.remove('active');
                    }, 300);
                }
            });
        }
        
        // Quality toggles (if controls are enabled)
        document.querySelectorAll('.bg-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const quality = button.dataset.quality;
                this.setQuality(quality);
            });
        });
        
        // Respect reduced motion preference
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) {
            this.settings.mouseInteraction = false;
            this.setQuality('low');
        }
        
        // Watch for theme changes
        this.watchThemeChanges();
        
        // Watch for reduced motion changes
        if (reducedMotion.addEventListener) {
            reducedMotion.addEventListener('change', (e) => {
                if (e.matches) {
                    this.settings.mouseInteraction = false;
                    this.setQuality('low');
                }
            });
        }
    }
    
    watchThemeChanges() {
        const observer = new MutationObserver(() => {
            // Update node gradients
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            const gradientId = theme === 'dark' ? 'nodeGradientDark' : 'nodeGradient';
            
            if (this.nodes) {
                this.nodes.forEach(node => {
                    node.element.setAttribute('fill', `url(#${gradientId})`);
                });
            }
            
            // Update particle colors
            this.particles.forEach(particle => {
                particle.color = this.getThemeColor('particle');
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    setQuality(quality) {
        const bgContainer = document.getElementById('tech-background');
        if (!bgContainer) return;
        
        switch(quality) {
            case 'high':
                this.settings.particleCount = this.isMobile ? 60 : 120;
                this.settings.nodeCount = this.isMobile ? 20 : 30;
                this.settings.highQuality = true;
                this.settings.enabled = true;
                bgContainer.classList.remove('low-quality', 'off');
                break;
            case 'low':
                this.settings.particleCount = this.isMobile ? 20 : 40;
                this.settings.nodeCount = this.isMobile ? 10 : 15;
                this.settings.highQuality = false;
                this.settings.enabled = true;
                bgContainer.classList.add('low-quality');
                bgContainer.classList.remove('off');
                break;
            case 'off':
                this.settings.enabled = false;
                bgContainer.classList.add('off');
                break;
        }
        
        // Update UI
        document.querySelectorAll('.bg-toggle').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.quality === quality);
        });
        
        // Recreate particles and nodes with new counts
        if (this.settings.enabled) {
            this.createParticles();
            this.createNodes();
        }
        
        // Save preference
        localStorage.setItem('bg-quality', quality);
    }
    
    loadPreferences() {
        const savedQuality = localStorage.getItem('bg-quality');
        if (savedQuality) {
            this.setQuality(savedQuality);
        }
    }
    
    animate() {
        if (this.settings.enabled) {
            this.drawParticles();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateColors(themeColors) {
        // Update CSS custom properties
        if (themeColors) {
            document.documentElement.style.setProperty('--bg-node-primary', themeColors.primary);
            document.documentElement.style.setProperty('--bg-node-secondary', themeColors.secondary);
            document.documentElement.style.setProperty('--bg-particle', themeColors.primary);
            document.documentElement.style.setProperty('--bg-connection', themeColors.secondary);
            document.documentElement.style.setProperty('--bg-ripple', themeColors.accent);
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
        this.nodes = [];
    }
}

// Add CSS for neural network animations
const style = document.createElement('style');
style.textContent = `
    @keyframes connectionPulse {
        0%, 100% {
            opacity: 0.3;
            stroke-width: 1;
        }
        50% {
            opacity: 0.6;
            stroke-width: 1.2;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
let technicalBackground;

function initTechnicalBackground() {
    try {
        technicalBackground = new TechnicalBackground();
        
        // Expose to window for manual control
        window.technicalBackground = technicalBackground;
        
        console.log('Technical Background: Initialized successfully');
    } catch (error) {
        console.error('Technical Background: Failed to initialize', error);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechnicalBackground);
} else {
    initTechnicalBackground();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechnicalBackground;
}
