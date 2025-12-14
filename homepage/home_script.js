document.addEventListener('DOMContentLoaded', () => {
    console.log('Dekenet Al Nes scripts loaded');

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
            spans[0].style.top = '8px';
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.top = 'auto';
            spans[2].style.bottom = '8px';
            spans[2].style.transform = 'none';
        } else {
            navMenu.classList.add('active');
            navActions?.classList.add('active');

            // Animate hamburger to X (Absolute Positioning)
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.top = '50%';
            spans[0].style.transform = 'translateY(-50%) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.bottom = 'auto';
            spans[2].style.top = '50%';
            spans[2].style.transform = 'translateY(-50%) rotate(-45deg)';
        }
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => toggleNav());
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleNav(true));
        });
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && !navActions?.contains(e.target)) {
                toggleNav(true);
            }
        });
    }

    /* =========================================
       2. Auth Modal Logic (Functional)
       ========================================= */
    const modal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Elements for switching
    const tabLogIn = document.getElementById('tabLogIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    // Links inside the forms
    const linkToSignup = document.querySelector('.switch-to-signup');
    const linkToLogin = document.querySelector('.switch-to-login');

    // Function to Switch Tabs
    const switchTab = (tabName) => {
        if (tabName === 'login') {
            tabLogIn.classList.add('active');
            tabSignUp.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
            if(tabIndicator) tabIndicator.style.transform = 'translateX(100%)'; 
        } else {
            tabSignUp.classList.add('active');
            tabLogIn.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
            if(tabIndicator) tabIndicator.style.transform = 'translateX(0)';
        }
    };

    // Open/Close Modal
    const openModal = (initialTab) => {
        if(modal) {
            modal.style.display = 'flex';
            switchTab(initialTab);
        }
    };
    const closeModal = () => {
        if(modal) modal.style.display = 'none';
    };

    // Navigation Links Trigger
    document.querySelectorAll('.auth-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.textContent.toLowerCase();
            if (text.includes('sign up')) {
                openModal('signup');
            } else {
                openModal('login');
            }
        });
    });

    // Tab Clicks
    if(tabLogIn) {
        tabLogIn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('login');
        });
    }
    if(tabSignUp) {
        tabSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('signup');
        });
    }

    // Switch Links
    if(linkToSignup) {
        linkToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('signup');
        });
    }
    if(linkToLogin) {
        linkToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('login');
        });
    }

    // Close Actions
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    /* --- Form Submission Logic (Simulation) --- */
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            const originalText = btn.textContent;
            
            // Simulate Loading
            btn.textContent = 'Logging in...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Successfully Logged In!');
                closeModal();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                // Reset form
                loginForm.reset();
            }, 1500);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = signupForm.querySelector('button');
            const originalText = btn.textContent;
            
            // Simulate Loading
            btn.textContent = 'Creating Account...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Account Created Successfully! Please Log In.');
                switchTab('login'); // Switch to login tab after signup
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                // Reset form
                signupForm.reset();
            }, 1500);
        });
    }

    /* =========================================
       3. Smooth Scroll
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 0; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    /* =========================================
       4. Other Functionality
       ========================================= */
    const emailSubscription = document.querySelector('.email-subscription');
    if (emailSubscription) {
        const emailForm = emailSubscription.querySelector('button');
        const emailInput = emailSubscription.querySelector('.email-input');
        if (emailForm && emailInput) {
            const handleSubscription = (e) => {
                e.preventDefault();
                if (emailInput.value.includes('@')) {
                    alert('Thank you for subscribing!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            };
            emailForm.addEventListener('click', handleSubscription);
        }
    }

    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            this.style.borderColor = '#28a745';
            this.style.color = '#fff';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.borderColor = '';
                this.style.color = '';
            }, 2000);
        });
    });

    /* =========================================
       5. Subscription Button Listener (Reach Out Modal)
       ========================================= */
    const subscriptionBtn = document.querySelector('.btn-subscription');
    
    // Function to create the modal HTML if it doesn't exist
    const createReachOutModal = () => {
        if (document.getElementById('reachOutModal')) return;

        const modalHtml = `
        <div id="reachOutModal" class="modal">
            <div class="modal-content reach-out-content" style="text-align: center; padding: 20px; border-radius: 20px; max-width: 300px; position: relative;">
                <span class="close-reach-out" style="position: absolute; top: 15px; right: 25px; font-size: 20px; cursor: pointer; color: #aaa;">&times;</span>
                
                <h2 style="color: var(--mustard-yellow); font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1.2rem; margin-bottom: 15px; margin-top: 10px;">
                    Reach Out to Know More
                </h2>
                
                <a href="tel:+9613285838" style="text-decoration: none;">
                    <button class="btn" style="background-color: var(--teal-blue); color: white; padding: 12px 30px; margin-bottom: 15px; border-radius: 17px; font-size: 1rem; font-weight: 400; border: none; cursor: pointer; transition: background-color 0.3s;">
                        +961 3285838
                    </button>
                </a>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Add close logic for this new modal
        const reachOutModal = document.getElementById('reachOutModal');
        const closeReachOut = reachOutModal.querySelector('.close-reach-out');

        closeReachOut.addEventListener('click', () => {
            reachOutModal.style.display = 'none';
        });

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === reachOutModal) {
                reachOutModal.style.display = 'none';
            }
        });
    };

    if (subscriptionBtn) {
        subscriptionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createReachOutModal(); // Create modal on first click
            const reachOutModal = document.getElementById('reachOutModal');
            if (reachOutModal) {
                reachOutModal.style.display = 'flex'; // Open it
            }
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.mission-card, .product-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Slideshow Logic
    const slides = document.querySelectorAll('.story-image-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        slides[0].classList.add('active');
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 2000);
    }
});