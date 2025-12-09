// ============================================
// COMPLETE E-COMMERCE PROJECT - JAVASCRIPT
// DOM Manipulation Based (Easy to Understand)
// ============================================

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-Commerce Website Loaded Successfully! 🛍️');
    
    // ============================================
    // 1. SHOPPING CART FUNCTIONALITY
    // ============================================
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in navigation
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
    
    // Add to Cart Function
    function addToCart(productName, productPrice, productImage) {
        const product = {
            id: Date.now(), // Unique ID
            name: productName,
            price: parseFloat(productPrice),
            image: productImage,
            quantity: 1
        };
        
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        alert(`${productName} added to cart! 🛒`);
    }
    
    // Remove from Cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
    
    // Display Cart Items
    function displayCart() {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartContainer) return;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty! 🛒</p>';
            if (cartTotal) cartTotal.textContent = '₹0';
            return;
        }
        
        let total = 0;
        let cartHTML = '';
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartHTML += `
                <div class="cart-item" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                        <div>
                            <h4 style="margin: 0;">${item.name}</h4>
                            <p style="margin: 5px 0; color: #667eea; font-weight: bold;">₹${item.price}</p>
                            <p style="margin: 0; color: #666;">Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Remove</button>
                </div>
            `;
        });
        
        cartContainer.innerHTML = cartHTML;
        if (cartTotal) cartTotal.textContent = `₹${total.toFixed(2)}`;
    }
    
    // Make removeFromCart available globally
    window.removeFromCart = removeFromCart;
    
    // Initialize cart
    updateCartCount();
    displayCart();
    
    
    // ============================================
    // 2. PRODUCT FILTER & SEARCH
    // ============================================
    
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    function filterProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        const priceRange = priceFilter ? priceFilter.value : 'all';
        
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productName = product.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const productCategory = product.getAttribute('data-category') || '';
            const productPrice = parseFloat(product.getAttribute('data-price')) || 0;
            
            let showProduct = true;
            
            // Search filter
            if (searchTerm && !productName.includes(searchTerm)) {
                showProduct = false;
            }
            
            // Category filter
            if (category !== 'all' && productCategory !== category) {
                showProduct = false;
            }
            
            // Price filter
            if (priceRange !== 'all') {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    if (productPrice < min || productPrice > max) showProduct = false;
                } else {
                    if (productPrice < min) showProduct = false;
                }
            }
            
            product.style.display = showProduct ? 'block' : 'none';
        });
    }
    
    // Add event listeners for filters
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);
    
    
    // ============================================
    // 3. IMAGE SLIDER / CAROUSEL
    // ============================================
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        if (slides.length === 0) return;
        
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides.forEach((slide, i) => {
            slide.style.display = i === currentSlide ? 'block' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Event listeners for slider
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play slider
    let slideInterval = setInterval(nextSlide, 3000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3000);
        });
    }
    
    showSlide(currentSlide);
    
    
    // ============================================
    // 4. PRODUCT QUICK VIEW MODAL
    // ============================================
    
    const modal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    
    function showProductDetails(productName, productPrice, productImage, productDescription) {
        if (!modal) return;
        
        document.getElementById('modal-product-name').textContent = productName;
        document.getElementById('modal-product-price').textContent = `₹${productPrice}`;
        document.getElementById('modal-product-image').src = productImage;
        document.getElementById('modal-product-description').textContent = productDescription;
        
        modal.style.display = 'flex';
    }
    
    function hideProductDetails() {
        if (modal) modal.style.display = 'none';
    }
    
    if (closeModal) closeModal.addEventListener('click', hideProductDetails);
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideProductDetails();
        }
    });
    
    window.showProductDetails = showProductDetails;
    
    
    // ============================================
    // 5. SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ============================================
    // 6. CONTACT FORM SUBMISSION
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validation
            if (!name || !email || !message) {
                alert('Please fill all required fields!');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email!');
                return;
            }
            
            // Save to localStorage
            const formData = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            };
            
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            alert(`Thank you ${name}! Your message has been sent. 📧`);
            contactForm.reset();
        });
    }
    
    
    // ============================================
    // 7. WISHLIST FUNCTIONALITY
    // ============================================
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    function toggleWishlist(productId, productName, productPrice, productImage) {
        const index = wishlist.findIndex(item => item.id === productId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            alert(`${productName} removed from wishlist! 💔`);
        } else {
            wishlist.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
            alert(`${productName} added to wishlist! ❤️`);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
    }
    
    function updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
        }
        
        // Update heart icons
        const heartIcons = document.querySelectorAll('.wishlist-btn');
        heartIcons.forEach(btn => {
            const productId = btn.getAttribute('data-product-id');
            const isInWishlist = wishlist.some(item => item.id === productId);
            btn.style.color = isInWishlist ? '#ff4757' : '#ddd';
        });
    }
    
    window.toggleWishlist = toggleWishlist;
    updateWishlistUI();
    
    
    // ============================================
    // 8. SCROLL TO TOP BUTTON
    // ============================================
    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ============================================
    // 9. PRODUCT RATING SYSTEM
    // ============================================
    
    function rateProduct(productId, rating) {
        let ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
        ratings[productId] = rating;
        localStorage.setItem('productRatings', JSON.stringify(ratings));
        
        alert(`You rated this product ${rating} stars! ⭐`);
        displayRating(productId);
    }
    
    function displayRating(productId) {
        const ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
        const rating = ratings[productId] || 0;
        
        const ratingElement = document.getElementById(`rating-${productId}`);
        if (ratingElement) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += i <= rating ? '⭐' : '☆';
            }
            ratingElement.textContent = stars;
        }
    }
    
    window.rateProduct = rateProduct;
    
    
    // ============================================
    // 10. CHECKOUT PROCESS
    // ============================================
    
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const confirmation = confirm(`Total Amount: ₹${total.toFixed(2)}\n\nProceed to checkout?`);
            
            if (confirmation) {
                // Save order
                const order = {
                    items: cart,
                    total: total,
                    date: new Date().toLocaleString(),
                    orderId: 'ORD' + Date.now()
                };
                
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Clear cart
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                displayCart();
                
                alert(`Order placed successfully! 🎉\nOrder ID: ${order.orderId}\nTotal: ₹${total.toFixed(2)}`);
            }
        });
    }
    
    
    // ============================================
    // 11. MOBILE MENU TOGGLE
    // ============================================
    
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    
    // ============================================
    // 12. PRODUCT COMPARISON
    // ============================================
    
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    
    function addToCompare(productId, productName, productPrice, productImage) {
        if (compareList.length >= 3) {
            alert('You can compare maximum 3 products!');
            return;
        }
        
        const exists = compareList.find(item => item.id === productId);
        if (exists) {
            alert('Product already in comparison list!');
            return;
        }
        
        compareList.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        });
        
        localStorage.setItem('compareList', JSON.stringify(compareList));
        alert(`${productName} added to comparison! 📊`);
    }
    
    window.addToCompare = addToCompare;
    
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Format price in Indian Rupees
    function formatPrice(price) {
        return '₹' + price.toLocaleString('en-IN');
    }
    
    // Get greeting based on time
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }
    
    // Display greeting
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.textContent = getGreeting() + '! 👋';
    }
    
    
    // ============================================
    // INITIALIZE ALL FEATURES
    // ============================================
    
    console.log('✅ All JavaScript features loaded!');
    console.log('📦 Cart Items:', cart.length);
    console.log('❤️ Wishlist Items:', wishlist.length);
    console.log('📊 Compare List:', compareList.length);
    
}); // DOMContentLoaded End


// ============================================
// GLOBAL FUNCTIONS (Available everywhere)
// ============================================

// Add product to cart (call from HTML buttons)
function addToCart(productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const product = {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        image: productImage || 'placeholder.jpg',
        quantity: 1
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
    
    alert(`${productName} added to cart! 🛒`);
}

// Quick view product
function quickView(name, price, image, description) {
    window.showProductDetails(name, price, image, description);
}