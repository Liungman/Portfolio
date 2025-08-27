// Core JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all core functionality
  initScrollProgress();
  initParallaxEffects();
  initSmoothScrolling();
  initCurrentYear();
  initTypingEffect();
  
  console.log('Portfolio loaded successfully');
});

// Scroll progress bar
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  
  function updateProgress() {
    const html = document.documentElement;
    const percent = (html.scrollTop || document.body.scrollTop) / 
                   (html.scrollHeight - html.clientHeight) * 100;
    
    if (progress) {
      progress.style.width = percent + '%';
    }
  }
  
  // Use requestAnimationFrame for smooth performance
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial call
  updateProgress();
}

// Parallax effects
function initParallaxEffects() {
  const header = document.querySelector('header');
  
  if (!header) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const parallaxValue = Math.min(12, scrollY * 0.02);
        
        header.style.transform = `translateY(${parallaxValue}px)`;
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update current year
function initCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Typing effect for hero text
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing with a delay
    setTimeout(typeWriter, 1000);
  });
}

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: function(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Throttle function for scroll events
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get scroll percentage
  getScrollPercentage: function() {
    const html = document.documentElement;
    return (html.scrollTop || document.body.scrollTop) / 
           (html.scrollHeight - html.clientHeight) * 100;
  }
};

// Performance monitoring
const performance = {
  // Monitor scroll performance
  monitorScroll: function() {
    let scrollCount = 0;
    let lastTime = Date.now();
    
    window.addEventListener('scroll', utils.throttle(() => {
      scrollCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime > 1000) {
        if (scrollCount > 60) {
          console.warn('High scroll frequency detected, performance may be affected');
        }
        scrollCount = 0;
        lastTime = currentTime;
      }
    }, 16));
  },

  // Monitor resize performance
  monitorResize: function() {
    let resizeCount = 0;
    let lastTime = Date.now();
    
    window.addEventListener('resize', utils.throttle(() => {
      resizeCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime > 1000) {
        if (resizeCount > 30) {
          console.warn('High resize frequency detected');
        }
        resizeCount = 0;
        lastTime = currentTime;
      }
    }, 16));
  }
};

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  performance.monitorScroll();
  performance.monitorResize();
}

// Contact form handling (if form exists)
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!data.email || !data.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card);
    border: 1px solid var(--glass-border);
    color: var(--text);
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: var(--shadow);
    z-index: 10000;
    backdrop-filter: blur(10px);
    animation: slideInRight 0.3s ease-out;
  `;
  
  if (type === 'success') {
    notification.style.borderColor = 'var(--neon-green)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--neon-pink)';
  }
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Theme switching (for future enhancement)
function initThemeSwitch() {
  const themeSwitch = document.getElementById('theme-switch');
  
  if (!themeSwitch) return;
  
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Portfolio error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// Export utils for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { utils, showNotification };
}