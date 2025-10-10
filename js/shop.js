// Shop page functionality

// Product data
const productsData = [
    // ASICS
    {
        id: 1,
        name: "Sky Elite FF MT 3 ",
        brand: "asics",
        category: "shoes",
        price: "2,980,000₫",
        priceValue: 2980000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/asic1.png",
        features: ["Standard", "Lightweight"],
        badge: "popular",
        inStock: true
    },
    {
        id: 2,
        name: "Metarise 2",
        brand: "asics",
        category: "shoes",
        price: "3,800,000₫",
        priceValue: 3800000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/asic2.png",
        features: ["Boost Technology", "Lightweight"],
        badge: "new",
        inStock: true
    },
    {
        id: 3,
        name: "Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "2,980,000₫",
        priceValue: 2980000,
        description: "Reliable volleyball shoes ",
        image: "images/shop/products/asic3.png",
        features: ["Support", "Impact Absorption"],
        badge: "value",
        inStock: true
    },
    {
        id: 4,
        name: "Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "2,100,000₫",
        priceValue: 2100000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/asic4.png",
        features: ["Durable", "Impact Absorption"],
        badge: "value",
        inStock: true
    },
    {
        id: 5,
        name: "Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "2,980,000₫",
        priceValue: 2980000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/asic5.png",
        features: ["Cushioning", "Breathable"],
        badge: "essential",
        inStock: true
    },
    {
        id: 6,
        name: "Netburner Ballistic FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "2,250,000₫",
        priceValue: 2250000,
        description: "Professional wrist support for injury prevention and enhanced",
        image: "images/shop/products/asic6.png",
        features: ["Support", "Flexible"],
        badge: "",
        inStock: true
    },
    {
        id: 7,
        name: "Sky Elite FF MT 3",
        brand: "asics",
        category: "shoes",
        price: "2,980,000₫",
        priceValue: 2980000,
        description: "Moisture-wicking volleyball",
        image: "images/shop/products/asic7.png",
        features: ["Dri-FIT", "Moisture-Wicking"],
        badge: "",
        inStock: true
    },
    // MIZUNO
    {
        id: 8,
        name: "Mizuno Momentum 2.0 MID",
        brand: "mizuno",
        category: "shoes",
        price: "1,500,000₫",
        priceValue: 1500000,
        description: "2.0 MID Unisex - White/Black/Gold",
        image: "images/shop/products/mizuno1.png",
        features: ["Climacool", "Performance"],
        badge: "",
        inStock: true
    },
    {
        id: 9,
        name: "Mizuno Wave Lightning Z7",
        brand: "mizuno",
        category: "shoes",
        price: "2,900,000₫",
        priceValue: 2900000,
        description: "Professional volleyball socks with moisture management",
        image: "images/shop/products/mizuno2.png",
        features: ["Moisture Management", "Comfort"],
        badge: "",
        inStock: true
    },
    {
        id: 10,
        name: "Mizuno Wave Dimension",
        brand: "mizuno",
        category: "shoes",
        price: "2,100,000₫",
        priceValue: 2100000,
        description: "Mizuno Volleyball Backpack",
        image: "images/shop/products/mizuno3.png",
        features: ["Large Capacity",  "Durable"],
        badge: "",
        inStock: true
    },
    // NIKE
    {
        id: 11,
        name: "Nike Hyperspeed Court",
        brand: "nike",
        category: "shoes",
        price: "1,950,000₫",
        priceValue: 1950000,
        description: "Volleyball Shoes Handball Shoes Indor Training Squash",
        image: "images/shop/products/nike1.png",
        features: ["GEL Cushioning", "Versatile", "All Positions"],
        badge: "",
        inStock: true
    },
    {
        id: 12,
        name: "Nike Zoom Hyperace 2 SE",
        brand: "nike",
        category: "shoes",
        price: "3,200,000₫",
        priceValue: 3200000,
        description: "Protective elbow pads for volleyball training and matches",
        image: "images/shop/products/nike2.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 13,
        name: "Nike Hyperquick SE",
        brand: "nike",
        category: "shoes",
        price: "4,100,000₫",
        priceValue: 4100000,
        description: "Protective elbow pads for volleyball training and matches",
        image: "images/shop/products/nike3.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 14,
        name: "Nike HyperAce 3 SE",
        brand: "nike",
        category: "shoes",
        price: "2,300,000₫",
        priceValue: 2300000,
        description: "This shoe is designed for volleyball players and features several key technologies",
        image: "images/shop/products/nike4.png",
        features: ["Traction", "Materials", "Support"],
        badge: "",
        inStock: true
    },
    // ADIDAS
    {
        id: 15,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "1,700,000₫",
        priceValue: 1700000,
        description: "Black",
        image: "images/shop/products/adidas1.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 16,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "1,700,000₫",
        priceValue: 1700000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/adidas2.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 17,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "2,600,000₫",
        priceValue: 2600000,
        description: "White",
        image: "images/shop/products/adidas3.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 18,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "1,700,000₫",
        priceValue: 1700000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/adidas4.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 19,
        name: "Adidas Crazyflight Mid",
        brand: "adidas",
        category: "shoes",
        price: "1,700,000₫",
        priceValue: 1700000,
        description: "Men's Volleyball Shoes",
        image: "images/shop/products/adidas5.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    // WIKA
    {
        id: 20,
        name: "Wika Astro White-Red",
        brand: "wika",
        category: "shoes",
        price: "1,699,000₫",
        priceValue: 1699000,
        description: "Soft Wi-Cloud Pad",
        image: "images/shop/products/wika1.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    {
        id: 21,
        name: "Wika Ruta",
        brand: "wika",
        category: "shoes",
        price: "1,199,000₫",
        priceValue: 1199000,
        description: "Protective elbow pads ",
        image: "images/shop/products/wika2.png",
        features: ["Protection", "Comfortable", "Training"],
        badge: "",
        inStock: true
    },
    // BEYONO
    {
        id: 22,
        name: "Beyono Orca",
        brand: "beyono",
        category: "shoes",
        price: "733,000₫",
        priceValue: 733000,
        description: "Designed with inspiration from killer whales",
        image: "images/shop/products/beyono0.png",
        features: ["Protection", "Comfortable"],
        badge: "",
        inStock: true
    }
    // Accessories
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
