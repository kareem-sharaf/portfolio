// ============================================
// Technical Background Animation Controller
// Professional animated backgrounds for developer portfolios
//
// AVAILABLE STYLES:
// - 'subtle-waveform': Very subtle waveform pattern (Role-Weaver style) [DEFAULT]
// - 'data-flow': Animated nodes and connections (SVG-based)
// - 'matrix-rain': Falling tech terms (Canvas-based)
// - 'server-dashboard': Server status grid (CSS-based)
// - 'waveform-signal': Signal processing waveforms (Canvas-based)
//
// USAGE:
// Switch style: window.technicalBackground.switchStyle('style-name')
// Enable auto-cycle: window.technicalBackground.startAutoCycle()
// Stop auto-cycle: window.technicalBackground.stopAutoCycle()
//
// ============================================

class TechnicalBackground {
  constructor() {
    this.currentStyle = localStorage.getItem('bgStyle') || 'subtle-waveform';
    this.container = null;
    this.animationInstance = null;
    this.autoCycleInterval = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    // Create container
    this.createContainer();
    
    // Wait a bit to ensure DOM is ready
    if (!this.container) {
      console.error('Technical Background: Failed to create container');
      return;
    }
    
    // Initialize the selected animation style
    this.setStyle(this.currentStyle);
    
    // Listen for theme changes
    this.watchThemeChanges();
    
    // Listen for reduced motion preference
    this.watchReducedMotion();
    
    // Optional: Auto-cycle every 30 seconds (disabled by default)
    // this.startAutoCycle();
  }

  createContainer() {
    // Check if container already exists
    let existingContainer = document.getElementById('technicalBackground');
    if (existingContainer) {
      this.container = existingContainer;
      return;
    }
    
    this.container = document.createElement('div');
    this.container.className = 'technical-bg';
    this.container.id = 'technicalBackground';
    
    // Insert at the beginning of body to ensure it's behind everything
    if (document.body) {
      document.body.insertBefore(this.container, document.body.firstChild);
      console.log('Technical Background: Container created and added to body');
    } else {
      console.error('Technical Background: document.body is not ready');
      // Retry after a short delay
      setTimeout(() => {
        if (document.body && this.container) {
          document.body.insertBefore(this.container, document.body.firstChild);
          console.log('Technical Background: Container added after retry');
        }
      }, 100);
    }
  }

  setStyle(style) {
    if (!this.container) {
      console.error('Technical Background: Container not available');
      return;
    }
    
    if (this.isReducedMotion) {
      console.log('Technical Background: Reduced motion detected, skipping animation');
      this.container.innerHTML = '';
      return;
    }

    this.currentStyle = style;
    localStorage.setItem('bgStyle', style);
    this.container.innerHTML = '';
    console.log('Technical Background: Setting style to', style);

    try {
      switch (style) {
        case 'data-flow':
          this.initDataFlowNetwork();
          break;
        case 'matrix-rain':
          this.initMatrixRain();
          break;
        case 'server-dashboard':
          this.initServerDashboard();
          break;
        case 'waveform-signal':
          this.initWaveformSignal();
          break;
        case 'subtle-waveform':
          this.initSubtleWaveform();
          break;
        default:
          this.initSubtleWaveform();
      }
    } catch (error) {
      console.error('Technical Background: Error initializing style', style, error);
    }
  }

  // ============================================
  // OPTION 1: Data Flow Network
  // ============================================
  initDataFlowNetwork() {
    if (!this.container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'data-flow-network';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1200 800');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Create gradient for connections
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'connectionGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'currentColor');
    stop1.setAttribute('stop-opacity', '0.1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'currentColor');
    stop2.setAttribute('stop-opacity', '0.4');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Create nodes (15-20 nodes)
    const nodes = [];
    const nodeCount = 18;
    
    for (let i = 0; i < nodeCount; i++) {
      const node = {
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 4 + Math.random() * 8, // 4-12px
        id: `node-${i}`
      };
      nodes.push(node);
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x);
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', node.size);
      circle.setAttribute('class', 'data-flow-node');
      circle.style.animationDelay = `${Math.random() * 4}s`;
      svg.appendChild(circle);
    }
    
    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
        );
        
        // Only connect nodes within 300px
        if (distance < 300 && Math.random() > 0.7) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          
          // Create bezier curve
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const cp1x = node.x + dx * 0.3 + (Math.random() - 0.5) * 100;
          const cp1y = node.y + dy * 0.3 + (Math.random() - 0.5) * 100;
          const cp2x = node.x + dx * 0.7 + (Math.random() - 0.5) * 100;
          const cp2y = node.y + dy * 0.7 + (Math.random() - 0.5) * 100;
          
          path.setAttribute('d', `M ${node.x} ${node.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${otherNode.x} ${otherNode.y}`);
          path.setAttribute('class', 'data-flow-connection');
          path.style.animationDelay = `${Math.random() * 4}s`;
          svg.appendChild(path);
        }
      });
    });
    
    wrapper.appendChild(svg);
    this.container.appendChild(wrapper);
  }

  // ============================================
  // OPTION 2: Binary Code Matrix Rain
  // ============================================
  initMatrixRain() {
    if (!this.container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'matrix-rain';
    
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    this.container.appendChild(wrapper);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Tech terms and code snippets
    const techTerms = [
      'API', 'JSON', 'SQL', 'HTTP', 'REST', 'RESTful', 'GET', 'POST', 'PUT', 'DELETE',
      'Laravel', 'Django', 'Spring', 'Boot', 'MySQL', 'PostgreSQL', 'Vue', 'React',
      'Git', 'GitHub', 'Docker', 'AWS', 'Azure', 'Redis', 'Cache', 'Queue', 'Job',
      'async', 'await', 'promise', 'callback', 'middleware', 'route', 'controller',
      'model', 'view', 'migration', 'seeder', 'factory', 'test', 'unit', 'integration'
    ];
    
    // Stream configuration
    const streams = [];
    const streamCount = Math.min(25, Math.floor(canvas.width / 30));
    const fontSize = 14;
    const columnWidth = canvas.width / streamCount;
    
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: i * columnWidth,
        y: Math.random() * -canvas.height,
        speed: 2 + Math.random() * 3,
        chars: Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () => 
          techTerms[Math.floor(Math.random() * techTerms.length)]
        )
      });
    }
    
    // Animation loop
    let animationId;
    const animate = () => {
      // Clear with fade effect for trailing
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(26, 32, 44, 0.08)' : 'rgba(248, 250, 252, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text properties
      ctx.fillStyle = isDark ? 'rgba(66, 153, 225, 0.12)' : 'rgba(66, 153, 225, 0.08)';
      ctx.font = `${fontSize}px 'Inter', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      streams.forEach(stream => {
        stream.y += stream.speed;
        
        stream.chars.forEach((char, index) => {
          const y = stream.y + index * fontSize * 1.2;
          const opacity = Math.max(0, 1 - (index * 0.08));
          
          ctx.globalAlpha = opacity * 0.25;
          ctx.fillText(char, stream.x + columnWidth / 2, y);
        });
        
        // Reset stream when it goes off screen
        if (stream.y > canvas.height + fontSize * 10) {
          stream.y = -fontSize * 10;
          stream.chars = Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () => 
            techTerms[Math.floor(Math.random() * techTerms.length)]
          );
        }
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Store animation ID for cleanup
    this.animationInstance = { cancel: () => cancelAnimationFrame(animationId), cleanup: () => window.removeEventListener('resize', resizeCanvas) };
  }

  // ============================================
  // OPTION 3: Server Status Dashboard
  // ============================================
  initServerDashboard() {
    if (!this.container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'server-dashboard';
    
    const nodeCount = 48; // 8x6 grid
    
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'server-node';
      
      // Randomly activate some nodes (30%)
      if (Math.random() > 0.7) {
        node.classList.add('active');
      }
      
      const indicator = document.createElement('div');
      indicator.className = 'server-indicator';
      indicator.style.animationDelay = `${Math.random() * 2}s`;
      
      const loadBar = document.createElement('div');
      loadBar.className = 'server-load-bar';
      
      const loadFill = document.createElement('div');
      loadFill.className = 'server-load-fill';
      loadFill.style.animationDelay = `${Math.random() * 4}s`;
      
      loadBar.appendChild(loadFill);
      node.appendChild(indicator);
      node.appendChild(loadBar);
      
      wrapper.appendChild(node);
      
      // Occasionally create data transfer animations
      if (Math.random() > 0.95) {
        setTimeout(() => {
          this.createDataTransfer(node, wrapper);
        }, Math.random() * 3000);
      }
    }
    
    this.container.appendChild(wrapper);
    
    // Periodically trigger data transfers
    setInterval(() => {
      const nodes = wrapper.querySelectorAll('.server-node');
      if (nodes.length > 0 && Math.random() > 0.8) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        this.createDataTransfer(randomNode, wrapper);
      }
    }, 4000);
  }

  createDataTransfer(sourceNode, container) {
    const transfer = document.createElement('div');
    transfer.className = 'server-transfer';
    
    const rect = sourceNode.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const startX = rect.left - containerRect.left + rect.width / 2;
    const startY = rect.top - containerRect.top + rect.height / 2;
    
    transfer.style.left = `${startX}px`;
    transfer.style.top = `${startY}px`;
    
    container.appendChild(transfer);
    
    setTimeout(() => {
      transfer.remove();
    }, 3000);
  }

  // ============================================
  // OPTION 4: Waveform Signal Processing
  // ============================================
  initWaveformSignal() {
    if (!this.container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'waveform-signal';
    
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    this.container.appendChild(wrapper);
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Wave configuration
    const waves = [];
    const waveCount = 4;
    
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        frequency: 0.01 + Math.random() * 0.02,
        amplitude: 30 + Math.random() * 50,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        yOffset: (canvas.height / (waveCount + 1)) * (i + 1),
        wavelength: 100 + Math.random() * 200
      });
    }
    
    // Data packets
    const packets = [];
    const packetCount = 8;
    
    for (let i = 0; i < packetCount; i++) {
      packets.push({
        x: Math.random() * canvas.width,
        y: (canvas.height / (waveCount + 1)) * (Math.floor(Math.random() * waveCount) + 1),
        speed: 1 + Math.random() * 2,
        size: 3 + Math.random() * 5,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    
    let time = 0;
    let animationId;
    
    const animate = () => {
      // Clear with fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.strokeStyle = isDark ? 'rgba(66, 153, 225, 0.15)' : 'rgba(66, 153, 225, 0.08)';
      ctx.lineWidth = 2;
      
      // Draw base waveforms
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        
        for (let x = 0; x < canvas.width; x += 2) {
          const y = wave.yOffset + Math.sin((x * wave.frequency) + (time * wave.speed) + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });
      
      // Draw data packets
      ctx.fillStyle = isDark ? 'rgba(0, 181, 216, 0.2)' : 'rgba(0, 181, 216, 0.15)';
      packets.forEach(packet => {
        packet.x += packet.speed;
        if (packet.x > canvas.width) {
          packet.x = -packet.size;
          packet.y = (canvas.height / (waveCount + 1)) * (Math.floor(Math.random() * waveCount) + 1);
        }
        
        ctx.globalAlpha = packet.opacity;
        ctx.fillRect(packet.x, packet.y - packet.size / 2, packet.size, packet.size);
      });
      
      // Occasionally draw peak indicators
      if (Math.random() > 0.98) {
        const peakX = Math.random() * canvas.width;
        const peakY = waves[Math.floor(Math.random() * waves.length)].yOffset;
        const peakHeight = 40 + Math.random() * 60;
        
        ctx.strokeStyle = isDark ? 'rgba(56, 178, 172, 0.4)' : 'rgba(56, 178, 172, 0.3)';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(peakX, peakY - peakHeight);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      time += 0.016; // ~60fps
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    this.animationInstance = { cancel: () => cancelAnimationFrame(animationId), cleanup: () => window.removeEventListener('resize', resizeCanvas) };
  }

  // ============================================
  // OPTION 5: Subtle Waveform (Role-Weaver Style)
  // Very subtle, abstract waveform background
  // ============================================
  initSubtleWaveform() {
    if (!this.container) {
      console.error('Technical Background: Container not available in initSubtleWaveform');
      return;
    }
    
    console.log('Technical Background: Initializing subtle waveform animation');
    const wrapper = document.createElement('div');
    wrapper.className = 'subtle-waveform';
    
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    this.container.appendChild(wrapper);
    console.log('Technical Background: Canvas created and added to container');
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Very subtle waveform configuration
    const waves = [];
    const waveCount = 3; // Fewer waves for subtlety
    
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        frequency: 0.003 + Math.random() * 0.004, // Very slow
        amplitude: 20 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.01, // Very slow movement
        yOffset: (canvas.height / (waveCount + 2)) * (i + 1.5),
        wavelength: 150 + Math.random() * 200
      });
    }
    
    // Subtle particles/glow effect
    const particles = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 2,
        opacity: 0.02 + Math.random() * 0.04,
        pulseSpeed: 0.01 + Math.random() * 0.02
      });
    }
    
    let time = 0;
    let animationId;
    
    const animate = () => {
      // Clear with very subtle fade for trailing effect
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(26, 32, 44, 0.03)' : 'rgba(248, 250, 252, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw very subtle waveforms
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4;
      
      waves.forEach(wave => {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 3) {
          const y = wave.yOffset + Math.sin((x * wave.frequency) + (time * wave.speed) + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });
      
      // Draw subtle particles/glow
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Pulse opacity
        const pulse = Math.sin(time * particle.pulseSpeed) * 0.5 + 0.5;
        ctx.globalAlpha = particle.opacity * pulse;
        
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(66, 153, 225, 1)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      time += 0.01; // Slow time progression
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    this.animationInstance = { 
      cancel: () => cancelAnimationFrame(animationId), 
      cleanup: () => window.removeEventListener('resize', resizeCanvas) 
    };
  }

  // ============================================
  // Utility Methods
  // ============================================
  
  watchThemeChanges() {
    // Theme changes are handled via CSS variables, but we can update canvas-based animations
    const observer = new MutationObserver(() => {
      if (this.currentStyle === 'matrix-rain' || this.currentStyle === 'waveform-signal' || this.currentStyle === 'subtle-waveform') {
        // Reinitialize to pick up new theme colors
        this.setStyle(this.currentStyle);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  watchReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      if (e.matches) {
        this.container.innerHTML = '';
        if (this.animationInstance && this.animationInstance.cancel) {
          this.animationInstance.cancel();
        }
        if (this.animationInstance && this.animationInstance.cleanup) {
          this.animationInstance.cleanup();
        }
      } else {
        this.setStyle(this.currentStyle);
      }
    });
  }

  startAutoCycle() {
    if (this.autoCycleInterval) {
      clearInterval(this.autoCycleInterval);
    }
    
    const styles = ['data-flow', 'matrix-rain', 'server-dashboard', 'waveform-signal'];
    let currentIndex = styles.indexOf(this.currentStyle);
    if (currentIndex === -1) currentIndex = 0;
    
    this.autoCycleInterval = setInterval(() => {
      if (!this.isReducedMotion) {
        currentIndex = (currentIndex + 1) % styles.length;
        this.switchStyle(styles[currentIndex]);
      }
    }, 30000); // 30 seconds
  }
  
  stopAutoCycle() {
    if (this.autoCycleInterval) {
      clearInterval(this.autoCycleInterval);
      this.autoCycleInterval = null;
    }
  }

  // Public API
  switchStyle(style) {
    if (this.animationInstance && this.animationInstance.cancel) {
      this.animationInstance.cancel();
    }
    if (this.animationInstance && this.animationInstance.cleanup) {
      this.animationInstance.cleanup();
    }
    this.setStyle(style);
  }
}

// Initialize when DOM is ready
let technicalBackground;

function initTechnicalBackground() {
  try {
    technicalBackground = new TechnicalBackground();
    
    // Expose to window for manual control if needed
    window.technicalBackground = technicalBackground;
    
    console.log('Technical Background initialized with style:', technicalBackground.currentStyle);
  } catch (error) {
    console.error('Technical Background: Failed to initialize', error);
  }
}

// Try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTechnicalBackground);
} else {
  // DOM is already loaded
  initTechnicalBackground();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TechnicalBackground;
}

