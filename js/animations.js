// Animation controllers and intersection observer
document.addEventListener('DOMContentLoaded', function() {
  initRevealAnimations();
  initScrollAnimations();
  initHoverAnimations();
  initLoadingAnimations();
  
  console.log('Animation system initialized');
});

// Reveal animations using Intersection Observer
function initRevealAnimations() {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after revealing to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

// Advanced scroll-based animations
function initScrollAnimations() {
  let ticking = false;

  function updateScrollAnimations() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollProgress = scrollY / (documentHeight - windowHeight);

    // Parallax background animation
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    // Scale effect for hero section
    const header = document.querySelector('header');
    if (header && scrollY > 0) {
      const scale = Math.max(0.95, 1 - scrollY * 0.0002);
      header.style.transform = `translateY(${Math.min(12, scrollY * 0.02)}px) scale(${scale})`;
    }

    // Animated elements based on scroll position
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      
      if (isInView) {
        const animationType = element.getAttribute('data-scroll-animation');
        applyScrollAnimation(element, animationType, scrollProgress);
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollAnimations);
      ticking = true;
    }
  });
}

// Apply specific scroll animations
function applyScrollAnimation(element, type, progress) {
  switch (type) {
    case 'fade':
      const opacity = Math.min(1, Math.max(0, 1 - progress * 2));
      element.style.opacity = opacity;
      break;
    
    case 'slide-up':
      const translateY = Math.max(0, (1 - progress) * 50);
      element.style.transform = `translateY(${translateY}px)`;
      break;
    
    case 'scale':
      const scale = Math.min(1.1, Math.max(0.9, 1 + progress * 0.2));
      element.style.transform = `scale(${scale})`;
      break;
    
    case 'rotate':
      const rotate = progress * 360;
      element.style.transform = `rotate(${rotate}deg)`;
      break;
  }
}

// Enhanced hover animations
function initHoverAnimations() {
  // Card tilt effect
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', handleCardTilt);
    card.addEventListener('mouseleave', resetCardTilt);
  });

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRippleEffect);
  });

  // Project card glow tracking
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('mousemove', trackMouseGlow);
    project.addEventListener('mouseleave', resetMouseGlow);
  });
}

// Card tilt effect on mouse move
function handleCardTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / centerY * -10;
  const rotateY = (x - centerX) / centerX * 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetCardTilt(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Ripple effect for buttons
function createRippleEffect(e) {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: radial-gradient(circle, rgba(0,191,255,0.4) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
    z-index: 0;
  `;
  
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Mouse glow tracking for project cards
function trackMouseGlow(e) {
  const project = e.currentTarget;
  const rect = project.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  
  project.style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(0,255,136,0.1) 0%, transparent 50%),
    rgba(255,255,255,0.02)
  `;
}

function resetMouseGlow(e) {
  const project = e.currentTarget;
  project.style.background = 'rgba(255,255,255,0.02)';
}

// Loading animations for page elements
function initLoadingAnimations() {
  // Stagger animation for grid items
  const gridItems = document.querySelectorAll('.grid > *');
  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 100}ms`;
    item.classList.add('fade-in-up');
  });

  // Typewriter effect for specific elements
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  typewriterElements.forEach((element, index) => {
    setTimeout(() => {
      startTypewriterEffect(element);
    }, index * 500);
  });

  // Progress bars animation
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    animateProgressBar(bar);
  });
}

// Typewriter effect implementation
function startTypewriterEffect(element) {
  const text = element.getAttribute('data-typewriter') || element.textContent;
  const speed = parseInt(element.getAttribute('data-speed')) || 50;
  
  element.textContent = '';
  element.style.borderRight = '2px solid var(--neon-green)';
  
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      // Remove cursor after completion
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 1000);
    }
  }, speed);
}

// Progress bar animation
function animateProgressBar(bar) {
  const targetWidth = bar.getAttribute('data-width') || '0%';
  const duration = parseInt(bar.getAttribute('data-duration')) || 2000;
  
  bar.style.width = '0%';
  bar.style.transition = `width ${duration}ms ease-out`;
  
  // Trigger animation after a short delay
  setTimeout(() => {
    bar.style.width = targetWidth;
  }, 100);
}

// Intersection Observer for complex animations
function createComplexAnimationObserver() {
  const complexElements = document.querySelectorAll('[data-complex-animation]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute('data-complex-animation');
        triggerComplexAnimation(entry.target, animationType);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-10% 0px'
  });

  complexElements.forEach(element => {
    observer.observe(element);
  });
}

// Trigger complex animations
function triggerComplexAnimation(element, type) {
  switch (type) {
    case 'slide-in-sequence':
      const children = element.children;
      Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateX(-30px)';
        child.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateX(0)';
        }, index * 150);
      });
      break;
    
    case 'counter-up':
      animateCounter(element);
      break;
    
    case 'draw-svg':
      animateSVGPath(element);
      break;
  }
}

// Counter animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target')) || 0;
  const duration = parseInt(element.getAttribute('data-duration')) || 2000;
  const increment = target / (duration / 16); // 60fps
  
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// SVG path animation
function animateSVGPath(svg) {
  const paths = svg.querySelectorAll('path');
  paths.forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.animation = `draw-path 1.5s ease-out ${index * 0.5}s forwards`;
  });
}

// Performance optimization for animations
const animationFrames = {
  running: new Set(),
  
  add(callback) {
    this.running.add(callback);
    if (this.running.size === 1) {
      this.start();
    }
  },
  
  remove(callback) {
    this.running.delete(callback);
  },
  
  start() {
    const animate = () => {
      this.running.forEach(callback => callback());
      if (this.running.size > 0) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
};

// Reduced motion support
function setupReducedMotionSupport() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }
  
  prefersReducedMotion.addListener((e) => {
    if (e.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--transition-duration');
    }
  });
}

// Initialize reduced motion support
setupReducedMotionSupport();

// Initialize complex animations
createComplexAnimationObserver();

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes draw-path {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Export animation utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    animationFrames,
    startTypewriterEffect,
    createRippleEffect,
    animateCounter
  };
}