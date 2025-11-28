document.addEventListener('DOMContentLoaded', () => {
    console.log('Dekenet Al Nes scripts loaded');

   
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.querySelector('.nav-actions');

    const toggleNav = (forceClose = false) => {
        const isOpen = navMenu.classList.contains('active');
        
        if (forceClose || isOpen) {
            navMenu.classList.remove('active');
            navActions?.classList.remove('active');
            
           
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

   
    const modal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close-modal');
    
   
    const tabLogIn = document.getElementById('tabLogIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabIndicator = document.querySelector('.tab-indicator');
    
   
    const linkToSignup = document.querySelector('.switch-to-signup');
    const linkToLogin = document.querySelector('.switch-to-login');

 
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

    
    const openModal = (initialTab) => {
        if(modal) {
            modal.style.display = 'flex'; 
           
            switchTab(initialTab);
        }
    };

 
    const closeModal = () => {
        if(modal) modal.style.display = 'none';
    };

   
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

   
    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

   
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