// Shop page functionality

// Product data
const productsData = [
    {
        id: 1,
        name: "Sky Elite FF MT 3 Dolphin Grey",
        brand: "asics",
        category: "shoes",
        price: "2,980,000₫",
        priceValue: 2980000,
        description: "Professional volleyball shoes",
        image: "images/shop/products/Sky-Elite-FF-MT-3.jpg",
        features: ["Standard", "Lightweight"],
        badge: "popular",
        inStock: true
    },
    {
        id: 2,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "1,750,000₫",
        priceValue: 1750000,
        description: "Ultra-light volleyball shoes ",
        image: "images/shop/products/sky30.jpg",
        features: ["Boost Technology", "Formotion", "Lightweight"],
        badge: "new",
        inStock: true
    },
    {
        id: 4,
        name: "Asics Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "3,435,000₫",
        priceValue: 3435382,
        description: "Reliable volleyball shoes with GEL technology for impact absorption",
        image: "images/shop/products/Sky-Elite-FF-MT-3.jpg",
        features: ["GEL Technology", "Impact Absorption", "Durable"],
        badge: "value",
        inStock: true
    },
    {
        id: 4,
        name: "Asics Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "3,435,000₫",
        priceValue: 3435382,
        description: "Reliable volleyball shoes with GEL technology for impact absorption",
        image: "images/shop/products/Sky-Elite-FF-MT-3.jpg",
        features: ["GEL Technology", "Impact Absorption", "Durable"],
        badge: "value",
        inStock: true
    },
    {
        id: 5,
        name: "Professional Knee Pads",
        brand: "mizuno",
        category: "protection",
        price: "450,000₫",
        priceValue: 450000,
        description: "High-quality knee protection for volleyball players with superior",
        image: "images/products/knee-pads.jpg",
        features: ["Cushioning", "Breathable", "Professional"],
        badge: "essential",
        inStock: true
    },
    {
        id: 6,
        name: "Volleyball Wrist Support",
        brand: "asics",
        category: "protection",
        price: "320,000₫",
        priceValue: 320000,
        description: "Professional wrist support for injury prevention and enhanced",
        image: "images/products/wrist-support.jpg",
        features: ["Support", "Flexible", "Injury Prevention"],
        badge: "",
        inStock: true
    },
    {
        id: 7,
        name: "Nike Dri-FIT Volleyball Jersey",
        brand: "nike",
        category: "apparel",
        price: "890,000₫",
        priceValue: 890000,
        description: "Moisture-wicking volleyball jersey for optimal performance",
        image: "images/products/nike-jersey.jpg",
        features: ["Dri-FIT", "Moisture-Wicking", "Comfortable"],
        badge: "",
        inStock: true
    },
    {
        id: 8,
        name: "Adidas Volleyball Shorts",
        brand: "adidas",
        category: "apparel",
        price: "690,000₫",
        priceValue: 690000,
        description: "Performance volleyball shorts with Climacool technology",
        image: "images/shop/products/Sky-Elite-FF-MT-3.jpg",
        features: ["Climacool", "Performance", "Breathable"],
        badge: "",
        inStock: true
    },
    {
        id: 9,
        name: "Mizuno Volleyball Socks",
        brand: "mizuno",
        category: "accessories",
        price: "250,000₫",
        priceValue: 250000,
        description: "Professional volleyball socks with moisture management",
        image: "images/products/mizuno-socks.jpg",
        features: ["Moisture Management", "Comfort", "Durable"],
        badge: "",
        inStock: true
    },
    {
        id: 10,
        name: "Professional Volleyball Bag",
        brand: "nike",
        category: "accessories",
        price: "1,290,000₫",
        priceValue: 1290000,
        description: "Large capacity volleyball equipment bag with multiple compartments",
        image: "images/products/volleyball-bag.jpg",
        features: ["Large Capacity", "Multiple Compartments", "Durable"],
        badge: "",
        inStock: true
    },
    {
        id: 11,
        name: "SKY ELITE FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "3,490,000₫",
        priceValue: 3490000,
        description: "Versatile volleyball shoes suitable for all court positions",
        image: "images/shop/1051A081_103_SR_RT_GLB.webp",
        features: ["GEL Cushioning", "Versatile", "All Positions"],
        badge: "",
        inStock: true
    },
    {
        id: 12,
        name: "Elbow Pads Set",
        brand: "mizuno",
        category: "protection",
        price: "380,000₫",
        priceValue: 380000,
        description: "Protective elbow pads for volleyball training and matches",
        image: "images/products/elbow-pads.jpg",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    }
];

// State management
let filteredProducts = [];
let displayedProducts = [];
let productsPerPage = 8;
let currentPage = 1;
let currentFilters = {
    search: '',
    category: '',
    brand: '',
    price: ''
};

// DOM elements
let searchInput, categoryFilter, brandFilter, priceFilter, productsGrid, loadMoreBtn;

// Initialize shop page
function initShopPage() {
    // Get DOM elements
    searchInput = document.getElementById('product-search');
    categoryFilter = document.getElementById('category-filter');
    brandFilter = document.getElementById('brand-filter');
    priceFilter = document.getElementById('price-filter');
    productsGrid = document.getElementById('products-grid');
    loadMoreBtn = document.getElementById('load-more-btn');

    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    filteredProducts = [...productsData];
    renderProducts();
    
    // Initialize animations
    initializeAnimations();
}

// Set up all event listeners
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(handleSearch, 300));
    }

    // Filter selects
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', handleBrandFilter);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', handlePriceFilter);
    }

    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }

    // Brand cards
    document.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const brand = e.currentTarget.dataset.brand;
            if (brand && brandFilter) {
                brandFilter.value = brand;
                handleBrandFilter({ target: { value: brand } });
                
                // Scroll to products section
                document.querySelector('.shop-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle search functionality
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    applyFilters();
}

// Handle category filter
function handleCategoryFilter(e) {
    currentFilters.category = e.target.value;
    applyFilters();
}

// Handle brand filter
function handleBrandFilter(e) {
    currentFilters.brand = e.target.value;
    applyFilters();
}

// Handle price filter
function handlePriceFilter(e) {
    currentFilters.price = e.target.value;
    applyFilters();
}

// Apply all filters
function applyFilters() {
    filteredProducts = productsData.filter(product => {
        // Search filter
        if (currentFilters.search && 
            !product.name.toLowerCase().includes(currentFilters.search) &&
            !product.brand.toLowerCase().includes(currentFilters.search) &&
            !product.description.toLowerCase().includes(currentFilters.search)) {
            return false;
        }
        
        // Category filter
        if (currentFilters.category && product.category !== currentFilters.category) {
            return false;
        }
        
        // Brand filter
        if (currentFilters.brand && product.brand !== currentFilters.brand) {
            return false;
        }
        
        // Price filter
        if (currentFilters.price) {
            const [min, max] = currentFilters.price.split('-');
            if (max === undefined) {
                // Over price (e.g., "2000000+")
                if (product.priceValue < parseInt(min)) return false;
            } else {
                // Range (e.g., "500000-1000000")
                if (product.priceValue < parseInt(min) || product.priceValue > parseInt(max)) {
                    return false;
                }
            }
        }
        
        return true;
    });
    
    // Reset pagination
    currentPage = 1;
    renderProducts();
}

// Handle load more
function handleLoadMore() {
    currentPage++;
    renderProducts(true);
}

// Create product card HTML
function createProductCard(product) {
    const badgeColors = {
        popular: '#e74c3c',
        new: '#27ae60',
        pro: '#f39c12',
        value: '#3498db',
        essential: '#9b59b6'
    };
    
    const badgeColor = badgeColors[product.badge] || '#6c757d';
    
    return `
        <div class="product-card fade-in" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder-image" style="display: none;">
                    <i class="fas fa-box"></i>
                    <span>${product.name}</span>
                </div>
                ${product.badge ? `<div class="product-badge" style="background-color: ${badgeColor}">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="product-price">${product.price}</div>
                <a href="https://www.facebook.com/duy.hoangquoc.1/" target="_blank" class="contact-seller">
                    <i class="fab fa-facebook-messenger"></i>
                    Contact Seller
                </a>
            </div>
        </div>
    `;
}

// Render products
function renderProducts(append = false) {
    if (!productsGrid) return;
    
    // Show loading state if not appending
    if (!append) {
        productsGrid.innerHTML = `
            <div class="loading-products">
                <i class="fas fa-spinner"></i>
                <p>Loading products...</p>
            </div>
        `;
    }
    
    // Simulate loading delay
    setTimeout(() => {
        const startIndex = append ? displayedProducts.length : 0;
        const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
        const productsToShow = filteredProducts.slice(startIndex, endIndex);
        
        if (!append) {
            displayedProducts = [];
        }
        
        displayedProducts = [...displayedProducts, ...productsToShow];
        
        if (displayedProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        // Render products
        const productsHTML = displayedProducts.map(product => createProductCard(product)).join('');
        
        if (append) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
            
            Array.from(tempDiv.children).forEach(card => {
                productsGrid.appendChild(card);
            });
        } else {
            productsGrid.innerHTML = productsHTML;
        }
        
        // Update load more button
        if (displayedProducts.length >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // Trigger fade in animation for new products
        setTimeout(() => {
            const newCards = productsGrid.querySelectorAll('.fade-in:not(.visible)');
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
    }, append ? 500 : 800); // Different loading times
}

// Initialize animations
function initializeAnimations() {
    // Set up intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function getProductById(id) {
    return productsData.find(product => product.id == id);
}

function getProductsByBrand(brand) {
    return productsData.filter(product => product.brand === brand);
}

function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

function sortProducts(criteria) {
    switch(criteria) {
        case 'price-low':
            return filteredProducts.sort((a, b) => a.priceValue - b.priceValue);
        case 'price-high':
            return filteredProducts.sort((a, b) => b.priceValue - a.priceValue);
        case 'name':
            return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'brand':
            return filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
        default:
            return filteredProducts;
    }
}

function resetFilters() {
    currentFilters = {
        search: '',
        category: '',
        brand: '',
        price: ''
    };
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (brandFilter) brandFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    
    applyFilters();
}

// Track user interactions
function trackProductView(productId) {
    const product = getProductById(productId);
    if (product) {
        console.log(`Product viewed: ${product.name} (${product.brand})`);
        
        // In a real app, this would send analytics data
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                currency: 'VND',
                value: product.priceValue,
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    item_brand: product.brand,
                    item_category: product.category,
                    price: product.priceValue,
                    quantity: 1
                }]
            });
        }
    }
}

function trackContactSeller(productId) {
    const product = getProductById(productId);
    if (product) {
        console.log(`Contact seller clicked for: ${product.name}`);
        
        // Track contact event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_seller', {
                product_id: product.id,
                product_name: product.name,
                product_brand: product.brand
            });
        }
    }
}

// Export shop data
function exportShopData() {
    return {
        products: productsData.length,
        brands: [...new Set(productsData.map(p => p.brand))].length,
        categories: [...new Set(productsData.map(p => p.category))].length,
        averagePrice: productsData.reduce((sum, p) => sum + p.priceValue, 0) / productsData.length,
        currentFilters,
        displayedProducts: displayedProducts.length,
        filteredProducts: filteredProducts.length
    };
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initShopPage();
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initShopPage,
        applyFilters,
        createProductCard,
        getProductById,
        getProductsByBrand,
        getProductsByCategory,
        sortProducts,
        resetFilters,
        exportShopData
    };
}

// Make functions available globally
window.trackProductView = trackProductView;
window.trackContactSeller = trackContactSeller;
window.resetFilters = resetFilters;
window.sortProducts = sortProducts;
