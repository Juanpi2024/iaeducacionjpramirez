// Pages-specific JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Project Filter Functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Enhanced Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalContent = btn.innerHTML;

            // Loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
                btn.style.background = 'rgba(100, 255, 218, 0.2)';
                btn.style.borderColor = 'var(--primary)';

                contactForm.reset();

                // Reset button
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(10, 25, 47, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(10, 25, 47, 0.8)';
        }
    });

    // Video card play button interaction
    const showcaseCards = document.querySelectorAll('.showcase-card');
    showcaseCards.forEach(card => {
        card.addEventListener('click', () => {
            // Could open a modal with video, for now just visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number, .stat-num');
    const animatedStats = new Set();

    const animateNumber = (element) => {
        const finalText = element.innerText;
        const finalNumber = parseInt(finalText.replace(/\D/g, ''));

        if (isNaN(finalNumber) || animatedStats.has(element)) return;

        animatedStats.add(element);
        let current = 0;
        const increment = finalNumber / 50;
        const suffix = finalText.replace(/[\d]/g, '');

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.innerText = finalText;
                clearInterval(timer);
            } else {
                element.innerText = Math.floor(current) + suffix;
            }
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 25, 47, 0.98);
        padding: 20px;
        gap: 15px;
        animation: fadeIn 0.3s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .mobile-menu-btn {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);
