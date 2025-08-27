// Main JavaScript - Malte Liungman Portfolio

class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollProgress();
    this.setupRevealAnimations();
    this.setupHeaderParallax();
    this.setupTypingAnimation();
    this.setupSkillsAnimation();
    this.setupParticleBackground();
    this.setupSmoothScroll();
    this.updateYear();
  }

  // Scroll progress bar
  setupScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;

    const updateProgress = () => {
      const h = document.documentElement;
      const percent = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = percent + '%';
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateProgress);
    });
    
    updateProgress();
  }

  // Reveal elements on scroll
  setupRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => observer.observe(element));
  }

  // Header parallax effect
  setupHeaderParallax() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.style.transform = `translateY(${Math.min(12, y * 0.02)}px)`;
    });
  }

  // Typing animation for hero text
  setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-animation');

    let index = 0;
    const typeWriter = () => {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      } else {
        heroTitle.classList.remove('typing-animation');
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 500);
  }

  // Skills progress bars animation
  setupSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skills = [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Networking', level: 85 },
      { name: 'Windows Server', level: 70 },
      { name: 'Linux', level: 65 },
      { name: 'Hardware Support', level: 90 },
      { name: 'User Support', level: 95 }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress-fill');
          if (progressBar) {
            const level = progressBar.dataset.level;
            progressBar.style.setProperty('--progress-width', level + '%');
            progressBar.style.animation = 'progress-load 2s ease-out forwards';
          }
        }
      });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
  }

  // Particle background effect
  setupParticleBackground() {
    const particleContainer = document.querySelector('.parallax-bg');
    if (!particleContainer) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 15 + 's';
      
      particleContainer.appendChild(particle);
    }
  }

  // Smooth scrolling for navigation links
  setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Update current year
  updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Contact form handling (if form is present)
  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        this.showNotification('Vennligst fyll ut alle feltene.', 'error');
        return;
      }
      
      // Simulate form submission (replace with actual endpoint)
      this.showNotification('Takk for din melding! Jeg kommer tilbake til deg snart.', 'success');
      contactForm.reset();
    });
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--card);
      color: var(--text);
      padding: 16px 20px;
      border-radius: 12px;
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100px);
      transition: all 300ms ease;
    `;
    
    if (type === 'success') {
      notification.style.borderColor = 'var(--accent)';
    } else if (type === 'error') {
      notification.style.borderColor = 'var(--accent-3)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Utility method to add loading state
  setLoading(element, isLoading = true) {
    if (isLoading) {
      element.disabled = true;
      element.style.position = 'relative';
      
      const spinner = document.createElement('div');
      spinner.className = 'loading-spinner';
      spinner.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      
      element.appendChild(spinner);
      element.dataset.originalText = element.textContent;
      element.textContent = '';
    } else {
      element.disabled = false;
      const spinner = element.querySelector('.loading-spinner');
      if (spinner) {
        element.removeChild(spinner);
      }
      if (element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
        delete element.dataset.originalText;
      }
    }
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});

// Export for use in other modules if needed
window.Portfolio = Portfolio;