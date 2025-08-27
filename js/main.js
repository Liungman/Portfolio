// Portfolio JavaScript - Enhanced with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initScrollProgress();
    initRevealAnimations();
    initParallaxEffects();
    initSmoothScrolling();
    updateFooterYear();
    
    // Scroll Progress Bar
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        
        function updateProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateProgress);
        });
        
        updateProgress();
    }
    
    // Reveal animations on scroll
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    }
    
    // Parallax effects for header and background
    function initParallaxEffects() {
        const header = document.querySelector('header');
        
        function updateParallax() {
            const scrollY = window.scrollY;
            
            // Subtle header parallax
            if (header) {
                header.style.transform = `translateY(${Math.min(12, scrollY * 0.02)}px)`;
            }
        }
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Update footer year
    function updateFooterYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Enhanced card hover effects with mouse tracking
    function initCardEffects() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Initialize enhanced effects
    initCardEffects();
    
    // Typing animation for hero text (subtle)
    function initTypingAnimation() {
        const heroDesc = document.querySelector('.hero-desc');
        if (!heroDesc) return;
        
        const text = heroDesc.textContent;
        heroDesc.textContent = '';
        heroDesc.style.opacity = '1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroDesc.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 800);
    }
    
    // Uncomment to enable typing animation
    // initTypingAnimation();
    
    // Add subtle glow effect to buttons on hover
    function initButtonGlow() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 20px 60px rgba(31,79,255,0.25), 0 0 40px rgba(31,79,255,0.1)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }
    
    initButtonGlow();
    
    // Staggered animation for project cards
    function initStaggeredAnimations() {
        const projects = document.querySelectorAll('.project');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(project);
        });
    }
    
    initStaggeredAnimations();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme toggle (for future enhancement)
function toggleTheme() {
    // Placeholder for future theme switching functionality
    console.log('Theme toggle - future enhancement');
}