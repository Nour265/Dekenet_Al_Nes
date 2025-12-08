document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const productCards = productGrid ? Array.from(productGrid.querySelectorAll('.product-card')) : [];

    const categoryCheckboxes = {
        cleaning: document.getElementById('cleaning'),
        food: document.getElementById('food'),
        drinks: document.getElementById('drinks')
    };

    const foodEssentialCheckboxes = {
        labneh: document.getElementById('labneh'),
        'honey-jar': document.getElementById('honey-jar'),
        'wheat-grains': document.getElementById('wheat-grains')
    };

    const drinksEssentialCheckboxes = {
        water: document.getElementById('water'),
        milk: document.getElementById('milk'),
        shakes: document.getElementById('shakes')
    };

    const priceSlider = document.getElementById('priceSlider');
    const priceValueDisplay = document.getElementById('priceValue');
    const searchInput = document.querySelector('.search-filter-box input');

    if (priceSlider && priceValueDisplay) {
        priceSlider.addEventListener('input', () => {
            priceValueDisplay.textContent = parseFloat(priceSlider.value).toFixed(2);
            applyFilters();

            const value = priceSlider.value;
            const max = priceSlider.max;
            const percentage = (value / max) * 100;
            priceSlider.style.background = `linear-gradient(to right, #E1B23E 0%, #E1B23E ${percentage}%, #d0d0d0 ${percentage}%, #d0d0d0 100%)`;
        });

        const value = priceSlider.value;
        const max = priceSlider.max;
        const percentage = (value / max) * 100;
        priceSlider.style.background = `linear-gradient(to right, #E1B23E 0%, #E1B23E ${percentage}%, #d0d0d0 ${percentage}%, #d0d0d0 100%)`;
    }

    Object.values(categoryCheckboxes).forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', applyFilters);
        }
    });

    Object.values(foodEssentialCheckboxes).forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', applyFilters);
        }
    });

    Object.values(drinksEssentialCheckboxes).forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', applyFilters);
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    function applyFilters() {
        const selectedCategories = [];
        Object.keys(categoryCheckboxes).forEach(key => {
            if (categoryCheckboxes[key] && categoryCheckboxes[key].checked) {
                selectedCategories.push(key);
            }
        });

        const selectedFoodEssentials = [];
        Object.keys(foodEssentialCheckboxes).forEach(key => {
            if (foodEssentialCheckboxes[key] && foodEssentialCheckboxes[key].checked) {
                selectedFoodEssentials.push(key);
            }
        });

        const selectedDrinksEssentials = [];
        Object.keys(drinksEssentialCheckboxes).forEach(key => {
            if (drinksEssentialCheckboxes[key] && drinksEssentialCheckboxes[key].checked) {
                selectedDrinksEssentials.push(key);
            }
        });

        const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 10;
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        productCards.forEach(card => {
            let shouldShow = true;

            if (selectedCategories.length > 0) {
                const productCategory = card.getAttribute('data-category');
                if (!selectedCategories.includes(productCategory)) {
                    shouldShow = false;
                }
            }

            if (selectedFoodEssentials.length > 0 && shouldShow) {
                const productFoodEssential = card.getAttribute('data-food-essential');
                if (productFoodEssential && !selectedFoodEssentials.includes(productFoodEssential)) {
                    shouldShow = false;
                }
            }

            if (selectedDrinksEssentials.length > 0 && shouldShow) {
                const productDrinksEssential = card.getAttribute('data-drinks-essential');
                if (productDrinksEssential && !selectedDrinksEssentials.includes(productDrinksEssential)) {
                    shouldShow = false;
                }
            }

            if (shouldShow) {
                const productPrice = parseFloat(card.getAttribute('data-price'));
                if (!isNaN(productPrice) && productPrice > maxPrice) {
                    shouldShow = false;
                }
            }

            if (shouldShow && searchTerm) {
                const productTitle = card.querySelector('h4').textContent.toLowerCase();
                if (!productTitle.includes(searchTerm)) {
                    shouldShow = false;
                }
            }

            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    applyFilters();

    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartToast = document.getElementById('cartToast');
    const cartToastMessage = document.getElementById('cartToastMessage');

    function showToast(message) {
        if (cartToast && cartToastMessage) {
            cartToastMessage.textContent = message;
            cartToast.classList.add('show');
            setTimeout(() => {
                cartToast.classList.remove('show');
            }, 3000);
        } else {
            alert(message);
        }
    }

        // --- CART STORAGE HELPERS ---
    function getCartItems() {
        const raw = localStorage.getItem('cartItems');
        return raw ? JSON.parse(raw) : [];
    }

    function saveCartItems(items) {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    function addItemToCart(productCard) {
        const name = productCard.querySelector('h4').textContent.trim();
        const price = parseFloat(productCard.getAttribute('data-price')) || 0;
        const imgEl = productCard.querySelector('.product-image-box img');
        const image = imgEl ? imgEl.getAttribute('src') : '';
        
        let cart = getCartItems();

        // If item already in cart, just increase quantity
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                image,
                quantity: 1
            });
        }

        saveCartItems(cart);
        return name;
    }


    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = button.closest('.product-card');
            const productName = addItemToCart(productCard);
            // const productName = productCard.querySelector('h4').textContent;

            productCard.classList.add('clicked');

            showToast(`Added ${productName} to cart!`);
        });
    });

    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            navButtons.forEach(btn => btn.classList.remove('clicked'));
            this.classList.add('clicked');
        });
    });

    productCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.classList.contains('add-to-cart')) {
                return;
            }
            this.classList.toggle('clicked');
        });
    });

    const authModal = document.getElementById('authModal');
    const tabSignUp = document.getElementById('tabSignUp');
    const tabLogIn = document.getElementById('tabLogIn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const closeModal = document.querySelector('.close-modal');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    const profileIcon = document.querySelector('.nav-icon-link img[alt="User Profile"]');

    function openModal(isSignup = false) {
        if (authModal) {
            authModal.classList.add('open');
            if (isSignup) {
                activateSignup();
            } else {
                activateLogin();
            }
        }
    }

    function closeModalFunc() {
        if (authModal) authModal.classList.remove('open');
    }

    function activateLogin() {
        tabLogIn.classList.add('active');
        tabSignUp.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        const indicator = document.querySelector('.tab-indicator');
        if (indicator) indicator.style.transform = 'translateX(100%)';
    }

    function activateSignup() {
        tabSignUp.classList.add('active');
        tabLogIn.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        const indicator = document.querySelector('.tab-indicator');
        if (indicator) indicator.style.transform = 'translateX(0)';
    }

    if (tabSignUp && tabLogIn) {
        tabSignUp.addEventListener('click', () => activateSignup());
        tabLogIn.addEventListener('click', () => activateLogin());

        if (tabLogIn.classList.contains('active')) {
            const indicator = document.querySelector('.tab-indicator');
            if (indicator) indicator.style.transform = 'translateX(100%)';
        }
    }

    if (closeModal) closeModal.addEventListener('click', closeModalFunc);

    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeModalFunc();
    });

    if (switchToSignup) switchToSignup.addEventListener('click', () => activateSignup());
    if (switchToLogin) switchToLogin.addEventListener('click', () => activateLogin());

    if (profileIcon) {
        profileIcon.closest('a').addEventListener('click', (e) => {
            e.preventDefault();
            openModal(false);
        });
    }
});
