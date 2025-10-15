// News page functionality - OPTIMIZED with Dynamic Featured & Image Loading

// Enhanced News data with multiple featured articles
const newsData = [
    {
        id: 1,
        title: "Volleyball Friendly Match",
        category: "announcements",
        date: "2025-10-12",
        readTime: "5 min read",
        excerpt: "Friendly match between DVA Club - HORIZON - Spike VinUniversity. The match was successful and achieved spiritual values ​​of learning and cultivating, strengthening friendship of all 3 sides.",
        image: "images/news/VinUni.webp",
        views: 1250,
        likes: 89,
        comments: 23,
        featured: true // ✅ Featured article
    },
    {
        id: 2,
        title: "Championships Tournament BUV Open Cup",
        category: "championships",
        date: "2024-05-26",
        readTime: "3 min read",
        excerpt: "DVA Club girls have excelled in winning the club volleyball championship. Unbeaten ability without losing a single match.",
        image: "images/news/announcements/an1.avif",
        views: 890,
        likes: 67,
        comments: 15,
        featured: true // ✅ Another featured article
    },
    {
        id: 3,
        title: "Junior Team Training Camp Success",
        category: "training",
        date: "2025-09-21",
        readTime: "4 min read",
        excerpt: "Our junior team completed an intensive training camp, showing remarkable improvement in skills and teamwork.",
        image: "images/news/training/train1.avif",
        views: 654,
        likes: 45,
        comments: 12,
        featured: false
    },
    {
        id: 4,
        title: "Community Volleyball Festival",
        category: "events",
        date: "2025-10-01",
        readTime: "6 min read",
        excerpt: "DVA Club organized a successful community festival promoting volleyball among local youth.",
        image: "images/news/events/event1.avif",
        views: 432,
        likes: 38,
        comments: 9,
        featured: false
    },
    {
        id: 15,
        title: "International Tournament Victory",
        category: "championship", 
        date: "2025-10-10",
        readTime: "7 min read",
        excerpt: "Coming to the tournament with a home field mentality, DVA Club has successfully completed the goal of winning the ranking. Although competing in 1 day with a total of more than 10 matches, the physical strength is exhausted but they tried their best. It will be a beautiful memory to compete together. Together wearing medals. This youth we have together.",
        image: "images/news/championships/cham1.avif",
        views: 2100,
        likes: 156,
        comments: 45,
        featured: false // ✅ Third featured article
    },
    // ... rest of the existing data
    {
        id: 5,
        title: "Player Development Program Launch",
        category: "training",
        date: "2025-09-21",
        readTime: "3 min read",
        excerpt: "Introducing our comprehensive player development program designed to enhance individual skills.",
        image: "images/news/training/train2.avif",
        views: 567,
        likes: 52,
        comments: 18,
        featured: true
    },
    {
        id: 6,
        title: "Advanced Coaching Workshop",
        category: "training",
        date: "2025-09-28",
        readTime: "3 min read",
        excerpt: "Professional coaching workshop covering advanced volleyball techniques and strategies.",
        image: "images/news/training/train3.avif",
        views: 567,
        likes: 52,
        comments: 18,
        featured: false
    },
    {
        id: 7,
        title: "Middle Team Qualification Success",
        category: "events",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Our middle team has qualified for the national championship after outstanding performance.",
        image: "images/news/events/event2.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 8,
        title: "Equipment Upgrade Announcement",
        category: "announcements",
        date: "2025-10-05",
        readTime: "3 min read",
        excerpt: "Latest volleyball equipment and technology upgrades for enhanced training experience.",
        image: "images/news/announcements/an2.avif",
        views: 890,
        likes: 67,
        comments: 15,
        featured: false
    },
    {
        id: 9,
        title: "National League Victory",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Dominant performance in the national league securing our position as championship contenders.",
        image: "images/news/championships/cham2.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 10,
        title: "Regional Finals Achievement",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Outstanding team performance leads to regional finals qualification.",
        image: "images/news/championships/cham3.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 11,
        title: "Youth Championship Success",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Young talent shines in the youth championship tournament.",
        image: "images/news/championships/cham4.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 12,
        title: "Tournament Semi-Finals Victory",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Advancing to finals with a decisive semi-final victory.",
        image: "images/news/championships/cham5.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 13,
        title: "League Cup Triumph",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Celebrating our victory in the prestigious league cup tournament.",
        image: "images/news/championships/cham6.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    },
    {
        id: 14,
        title: "Championship Series Win",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Completing a perfect championship series with outstanding team performance.",
        image: "images/news/championships/cham1.avif",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    }
];

// ⚡ IMAGE OPTIMIZATION CLASS - Immediate Loading
class NewsImageOptimizer {
    constructor() {
        this.loadedImages = new Set();
        this.imageQueue = new Set();
        this.loadingPromises = new Map();
    }

    // Preload critical images immediately
    async preloadCriticalImages() {
        const featuredImages = this.getFeaturedImages();
        const priorityImages = featuredImages.slice(0, 5); // Top 5 most important
        
        console.log(`🖼️ Preloading ${priorityImages.length} critical images...`);
        
        const promises = priorityImages.map(url => this.loadImageOptimized(url));
        await Promise.allSettled(promises);
        
        console.log('✅ Critical images preloaded');
    }

    // Load image with optimization
    loadImageOptimized(src) {
        if (this.loadingPromises.has(src)) {
            return this.loadingPromises.get(src);
        }

        const promise = new Promise((resolve, reject) => {
            if (this.loadedImages.has(src)) {
                resolve(src);
                return;
            }

            const img = new Image();
            
            // Optimize image loading
            img.decoding = 'async'; // Non-blocking decode
            img.loading = 'eager'; // Load immediately, no lazy loading
            
            img.onload = () => {
                this.loadedImages.add(src);
                this.imageQueue.delete(src);
                console.log(`✅ Loaded: ${src}`);
                resolve(src);
            };
            
            img.onerror = () => {
                console.warn(`❌ Failed to load: ${src}`);
                reject(new Error(`Failed to load image: ${src}`));
            };
            
            img.src = src;
        });

        this.loadingPromises.set(src, promise);
        return promise;
    }

    // Get featured images for preloading
    getFeaturedImages() {
        return newsData
            .filter(news => news.featured)
            .map(news => news.image)
            .filter(Boolean);
    }

    // Batch load multiple images
    async batchLoadImages(imageUrls) {
        const promises = imageUrls.map(url => this.loadImageOptimized(url));
        return Promise.allSettled(promises);
    }
}

// Global image optimizer instance
const imageOptimizer = new NewsImageOptimizer();

// State management
let currentFilter = 'all';
let displayedNews = [];
let newsPerPage = 6;
let currentPage = 1;

// DOM elements
let filterTabs, newsGrid, loadMoreBtn, featuredContainer;

// ✅ ENHANCED INITIALIZATION with Dynamic Featured Rendering
async function initNewsPage() {
    console.log('🚀 Initializing news page - ALL ARTICLES DISPLAY-ONLY...');
    
    // Get DOM elements
    filterTabs = document.querySelectorAll('.filter-tab');
    newsGrid = document.getElementById('news-grid');
    loadMoreBtn = document.getElementById('load-more-news');
    featuredContainer = document.getElementById('featured-news-container');
    
    // Preload critical images immediately
    await imageOptimizer.preloadCriticalImages();
    
    // Set up event listeners (ONLY for filters and load more)
    setupEventListeners();
    
    // Render featured articles dynamically (display-only)
    renderFeaturedNews();
    
    // Initial render of regular news (display-only)
    renderNews();
    
    console.log('✅ News page fully initialized - ALL ARTICLES DISPLAY-ONLY');
}

// ✅ DYNAMIC FEATURED NEWS RENDERING - NO CLICK EVENTS
function renderFeaturedNews() {
    if (!featuredContainer) return;
    
    const featuredArticles = newsData.filter(news => news.featured);
    
    if (featuredArticles.length === 0) {
        featuredContainer.style.display = 'none';
        return;
    }
    
    console.log(`🌟 Rendering ${featuredArticles.length} featured articles (display-only)...`);
    
    // Section header
    let featuredHTML = `
        <div class="section-header">
            <h2>Featured News</h2>
            <p>Most important updates from DVA Club</p>
        </div>
        
        <!-- ✅ FEATURED ARTICLES - DISPLAY ONLY -->
        <div class="featured-articles-wrapper">
    `;
    
    // Render each featured article (display-only)
    featuredArticles.forEach((article, index) => {
        const isFirstFeatured = index === 0;
        
        featuredHTML += `
            <article class="featured-article display-only ${isFirstFeatured ? 'primary-featured' : 'secondary-featured'}" data-news-id="${article.id}">
                <div class="featured-image">
                    <img src="${article.image}" 
                         alt="${article.title}"
                         class="optimized-image"
                         decoding="async"
                         loading="eager"
                         onerror="handleImageError(this, 'Featured News');">
                    <div class="placeholder-image" style="display: none;">
                        <i class="fas fa-${getCategoryIcon(article.category)}"></i>
                        <span>${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                    </div>
                    <div class="featured-badge">Featured</div>
                    ${isFirstFeatured ? '<div class="primary-badge">Top Story</div>' : ''}
                </div>
                <div class="featured-content">
                    <div class="article-meta">
                        <span class="category ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                        <span class="date">${formatDate(article.date)}</span>
                        <span class="read-time">${article.readTime}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-stats">
                        <div class="stat-item">
                            <i class="fas fa-eye"></i>
                            <span>${formatNumber(article.views)} views</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-thumbs-up"></i>
                            <span>${article.likes} likes</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-comment"></i>
                            <span>${article.comments} comments</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });
    
    // Close wrapper
    featuredHTML += `</div>`;
    
    featuredContainer.innerHTML = featuredHTML;
    
    // ✅ NO CLICK EVENT LISTENERS - Featured articles are display-only
    console.log('✅ Featured articles rendered as display-only');
    
    // Add animation only
    setTimeout(() => {
        featuredContainer.querySelectorAll('.featured-article').forEach((article, index) => {
            setTimeout(() => {
                article.classList.add('fade-in', 'visible');
            }, index * 200);
        });
    }, 100);
}



// Set up event listeners
function setupEventListeners() {
    // Filter tabs - Keep functional
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterChange);
    });
    
    // Load more button - Keep functional
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreNews);
    }
    
    // ✅ NO EVENT LISTENERS FOR ANY CARDS - ALL DISPLAY-ONLY
    console.log('✅ Event listeners setup - Filters and load more only');
}

// Handle filter change
function handleFilterChange(e) {
    const newFilter = e.target.dataset.category;
    if (newFilter !== currentFilter) {
        currentFilter = newFilter;
        
        // Update active tab
        filterTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Reset and render
        currentPage = 1;
        renderNews();
    }
}

// Filter news based on category (exclude featured articles)
function filterNews() {
    const nonFeaturedNews = newsData.filter(news => !news.featured);
    
    if (currentFilter === 'all') {
        return nonFeaturedNews;
    }
    return nonFeaturedNews.filter(news => news.category === currentFilter);
}

// ⚡ OPTIMIZED NEWS CARD CREATION with Immediate Image Loading
function createNewsCard(news) {
    return `
        <article class="news-card display-only fade-in" data-news-id="${news.id}">
            <div class="news-image">
                <img src="${news.image}" 
                     alt="${news.title}"
                     class="optimized-image"
                     decoding="async"
                     loading="eager"
                     onerror="handleImageError(this, 'News Image');">
                <div class="placeholder-image" style="display: none;">
                    <i class="fas fa-${getCategoryIcon(news.category)}"></i>
                    <span>News Image</span>
                </div>
            </div>
            <div class="news-content">
                <div class="article-meta">
                    <span class="category ${news.category}">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</span>
                    <span class="date">${formatDate(news.date)}</span>
                    <span class="read-time">${news.readTime}</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <div class="article-stats">
                    <div class="stat-item">
                        <i class="fas fa-eye"></i>
                        <span>${formatNumber(news.views)} views</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-thumbs-up"></i>
                        <span>${news.likes} likes</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-comment"></i>
                        <span>${news.comments} comments</span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Render news grid
async function renderNews() {
    if (!newsGrid) return;
    
    // Show loading state
    newsGrid.innerHTML = `
        <div class="loading-news">
            <div class="loading-spinner"></div>
            <p>Loading news...</p>
        </div>
    `;
    
    // Get filtered news
    const filteredNews = filterNews();
    const newsToShow = filteredNews.slice(0, currentPage * newsPerPage);
    
    // Preload images for current batch
    const imagesToLoad = newsToShow.map(news => news.image).filter(Boolean);
    await imageOptimizer.batchLoadImages(imagesToLoad);
    
    setTimeout(() => {
        if (newsToShow.length === 0) {
            newsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-newspaper"></i>
                    <h3>No news found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        // Render news cards (all display-only)
        newsGrid.innerHTML = newsToShow.map(news => createNewsCard(news)).join('');
        
        // Update load more button
        if (newsToShow.length >= filteredNews.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // ✅ NO CLICK EVENT LISTENERS FOR NEWS CARDS
        console.log(`✅ Rendered ${newsToShow.length} news cards as display-only`);
        
        // Trigger fade in animation
        setTimeout(() => {
            newsGrid.querySelectorAll('.fade-in').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
    }, 300);
}

// Load more news
function loadMoreNews() {
    currentPage++;
    renderNews();
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getCategoryIcon(category) {
    const icons = {
        championship: 'trophy',
        training: 'dumbbell',
        events: 'calendar',
        announcements: 'bullhorn'
    };
    return icons[category] || 'newspaper';
}

// ⚡ OPTIMIZED IMAGE ERROR HANDLER
function handleImageError(img, fallbackText) {
    console.warn(`❌ Image failed to load: ${img.src}`);
    
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('placeholder-image')) {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
        if (fallbackText) {
            const span = placeholder.querySelector('span');
            if (span) span.textContent = fallbackText;
        }
    }
}

// Close article modal
function closeNewsModal() {
    const modal = document.querySelector('.news-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Export functions for analytics
function exportNewsData() {
    return {
        total: newsData.length,
        featured: newsData.filter(n => n.featured).length,
        filtered: filterNews().length,
        currentFilter,
        currentPage,
        categories: [...new Set(newsData.map(n => n.category))],
        imagesLoaded: imageOptimizer.loadedImages.size,
        displayMode: 'all-display-only' // ✅ New indicator
    };
}

// Service Worker registration for caching
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📦 Service Worker registered for news caching:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker failed:', error);
            });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('⚡ Starting news page - ALL ARTICLES DISPLAY-ONLY...');
    
    // Register service worker for caching
    registerServiceWorker();
    
    // Initialize page
    await initNewsPage();
    
    console.log('✅ News page loaded - ALL ARTICLES ARE DISPLAY-ONLY');
});

// Make functions available globally
window.handleImageError = handleImageError;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNewsPage,
        renderFeaturedNews,
        filterNews,
        createNewsCard,
        exportNewsData,
        NewsImageOptimizer
    };
}

console.log('🚀 Enhanced News module loaded - ALL CARDS DISPLAY-ONLY');
