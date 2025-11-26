document.addEventListener('DOMContentLoaded', () => {
    console.log('Dekenet Al Nes website loaded');

    /* =========================================
       1. Mobile Navigation Logic
       ========================================= */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.querySelector('.nav-actions');

    const toggleNav = (forceClose = false) => {
        const isOpen = navMenu.classList.contains('active');
        
        if (forceClose || isOpen) {
            navMenu.classList.remove('active');
            navActions?.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        } else {
            navMenu.classList.add('active');
            navActions?.classList.add('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        }
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => toggleNav());

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleNav(true));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && !navActions?.contains(e.target)) {
                toggleNav(true);
            }
        });
    }

    /* =========================================
       2. Smooth Scroll & Active Nav Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 0; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    // Reset all links
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                    });
                    // Add active class to current
                    navLink.classList.add('active');
                }
            }
        });
    });

    /* =========================================
       3. Our Story Slideshow Logic (FIXED)
       ========================================= */
    const slides = document.querySelectorAll('.story-image-slider .slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Ensure the first slide is visible initially (though CSS should handle this)
        slides[0].classList.add('active');

        // Start cycling through the photos every 2 seconds
        setInterval(() => {
            // 1. Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // 2. Calculate next slide index (loops back to 0 when reaching the end)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // 3. Add active class to the next slide
            slides[currentSlide].classList.add('active');
            
        }, 2000); // 2000ms = 2 seconds
    }

    /* =========================================
       4. Form/Button Functionality
       ========================================= */
    
    // Email Subscription Form
    const emailSubscription = document.querySelector('.email-subscription');
    if (emailSubscription) {
        const emailForm = emailSubscription.querySelector('button');
        const emailInput = emailSubscription.querySelector('.email-input');
        
        if (emailForm && emailInput) {
            const handleSubscription = (e) => {
                e.preventDefault();
                const email = emailInput.value;
                
                if (email && email.includes('@')) {
                    console.log('Email subscription:', email);
                    alert('Thank you for subscribing! We\'ll keep you updated.');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            };
            emailForm.addEventListener('click', handleSubscription);
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSubscription(e);
                }
            });
        }
    }

    // Add to Cart functionality
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            console.log('Added to cart:', { productName, productPrice });
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Subscribe button functionality
    document.querySelectorAll('.btn-yellow').forEach(button => {
        if (button.textContent.includes('Subscribe')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Subscription clicked');
                alert('Thank you for your interest! We\'ll redirect you to the subscription page.');
            });
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value;
                if (searchTerm.trim()) {
                    console.log('Searching for:', searchTerm);
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    }

    /* =========================================
       5. Scroll Animations
       ========================================= */

    // Intersection Observer for scroll animations
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

    // Prepare elements for animation and observe them
    document.querySelectorAll('.mission-card, .product-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Hero fade-in animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});