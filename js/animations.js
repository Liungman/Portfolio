// Animation Controllers - Malte Liungman Portfolio

class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupHoverEffects();
    this.setupScrollAnimations();
    this.setupGlowEffects();
  }

  // Enhanced intersection observer for staggered animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.reveal, .fade-in-up, .fade-in-left, .fade-in-right').forEach((el) => {
      observer.observe(el);
    });

    // Observe staggered elements
    document.querySelectorAll('.stagger-animation').forEach((container) => {
      observer.observe(container);
    });
  }

  // Animate individual elements with stagger support
  animateElement(element) {
    element.classList.add('visible');

    // Handle staggered children
    const staggerChildren = element.querySelectorAll('.stagger-item');
    if (staggerChildren.length > 0) {
      staggerChildren.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 100);
      });
    }
  }

  // Setup hover effects for interactive elements
  setupHoverEffects() {
    // Enhanced card hover effects
    document.querySelectorAll('.card-hover').forEach((card) => {
      card.addEventListener('mouseenter', (e) => {
        this.addHoverGlow(e.target);
      });

      card.addEventListener('mouseleave', (e) => {
        this.removeHoverGlow(e.target);
      });
    });

    // Button pulse effects
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('btn-pulse');
      });

      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('btn-pulse');
      });
    });

    // Project card hover effects
    document.querySelectorAll('.project').forEach((project) => {
      project.addEventListener('mouseenter', (e) => {
        this.animateProjectCard(e.target, true);
      });

      project.addEventListener('mouseleave', (e) => {
        this.animateProjectCard(e.target, false);
      });
    });
  }

  // Add hover glow effect
  addHoverGlow(element) {
    element.style.setProperty('--glow-opacity', '1');
    element.classList.add('glow-effect');
  }

  // Remove hover glow effect
  removeHoverGlow(element) {
    element.style.setProperty('--glow-opacity', '0');
    setTimeout(() => {
      element.classList.remove('glow-effect');
    }, 400);
  }

  // Animate project cards
  animateProjectCard(card, isHover) {
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    
    if (isHover) {
      if (title) title.style.color = 'var(--accent-2)';
      if (description) description.style.color = 'var(--text)';
    } else {
      if (title) title.style.color = 'var(--accent)';
      if (description) description.style.color = 'var(--muted)';
    }
  }

  // Setup scroll-based animations
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollAnimations = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Parallax backgrounds
      this.updateParallaxElements(scrollY);

      // Progress indicators
      this.updateProgressIndicators(scrollY, windowHeight, documentHeight);

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    });
  }

  // Update parallax elements
  updateParallaxElements(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Update progress indicators
  updateProgressIndicators(scrollY, windowHeight, documentHeight) {
    const progressBars = document.querySelectorAll('.scroll-progress');
    
    progressBars.forEach((bar) => {
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      bar.style.setProperty('--scroll-progress', `${Math.min(100, Math.max(0, progress))}%`);
    });
  }

  // Setup glow effects
  setupGlowEffects() {
    // Add glow to accent elements on scroll
    const glowElements = document.querySelectorAll('.neon-text, h1, h2');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glow-effect');
        }
      });
    }, {
      threshold: 0.5
    });

    glowElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Animate skill bars when they come into view
  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = parseInt(bar.dataset.level) || 0;
          
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 200);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  // Create floating elements animation
  createFloatingAnimation(element, duration = 4000, distance = 10) {
    let start = null;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      const y = Math.sin((progress / duration) * 2 * Math.PI) * distance;
      element.style.transform = `translateY(${y}px)`;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        // Restart animation
        start = null;
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Add typewriter effect to text elements
  typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  // Create particle system
  createParticleSystem(container, options = {}) {
    const defaults = {
      particleCount: 50,
      colors: ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)'],
      size: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      opacity: { min: 0.1, max: 0.3 }
    };

    const config = { ...defaults, ...options };
    
    for (let i = 0; i < config.particleCount; i++) {
      const particle = this.createParticle(config);
      container.appendChild(particle);
    }
  }

  // Create individual particle
  createParticle(config) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    const opacity = Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      opacity: ${opacity};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
    `;

    this.animateParticle(particle, config.speed);
    
    return particle;
  }

  // Animate particle movement
  animateParticle(particle, speedConfig) {
    const speed = Math.random() * (speedConfig.max - speedConfig.min) + speedConfig.min;
    const direction = Math.random() * 360;
    
    particle.style.animation = `particles-float ${15 / speed}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
  }

  // Smooth scroll to element
  smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  // Easing function for smooth animations
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});

// Export for use in other modules
window.AnimationController = AnimationController;