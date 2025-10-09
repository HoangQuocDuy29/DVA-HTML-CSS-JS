// News page functionality

// News data
const newsData = [
    {
        id: 1,
        title: "DVA Club Wins Regional Championship 2025",
        category: "championship",
        date: "2025-10-08",
        readTime: "5 min read",
        excerpt: "DVA Volleyball Club has achieved a historic victory in the Regional Championship 2025, defeating strong opponents with exceptional teamwork and skill.",
        image: "images/news/championship-win.jpg",
        views: 1250,
        likes: 89,
        comments: 23,
        featured: true
    },
    {
        id: 2,
        title: "New Training Facility Opens",
        category: "announcements",
        date: "2025-10-05",
        readTime: "3 min read",
        excerpt: "Our state-of-the-art training facility is now open, featuring professional-grade equipment and modern amenities.",
        image: "images/news/new-facility.jpg",
        views: 890,
        likes: 67,
        comments: 15,
        featured: false
    },
    {
        id: 3,
        title: "Junior Team Training Camp Success",
        category: "training",
        date: "2025-10-03",
        readTime: "4 min read",
        excerpt: "Our junior team completed an intensive training camp, showing remarkable improvement in skills and teamwork.",
        image: "images/news/junior-camp.jpg",
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
        image: "images/news/community-festival.jpg",
        views: 432,
        likes: 38,
        comments: 9,
        featured: false
    },
    {
        id: 5,
        title: "Player Development Program Launch",
        category: "training",
        date: "2025-09-28",
        readTime: "3 min read",
        excerpt: "Introducing our comprehensive player development program designed to enhance individual skills.",
        image: "images/news/development-program.jpg",
        views: 567,
        likes: 52,
        comments: 18,
        featured: false
    },
    {
        id: 6,
        title: "Middle Team Qualification Success",
        category: "championship",
        date: "2025-09-25",
        readTime: "4 min read",
        excerpt: "Our middle team has qualified for the national championship after outstanding performance.",
        image: "images/news/qualification.jpg",
        views: 789,
        likes: 71,
        comments: 21,
        featured: false
    }
];

// State management
let currentFilter = 'all';
let displayedNews = [];
let newsPerPage = 6;
let currentPage = 1;

// DOM elements
let filterTabs, newsGrid, loadMoreBtn;

// Initialize news page
function initNewsPage() {
    // Get DOM elements
    filterTabs = document.querySelectorAll('.filter-tab');
    newsGrid = document.getElementById('news-grid');
    loadMoreBtn = document.getElementById('load-more-news');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderNews();
}

// Set up event listeners
function setupEventListeners() {
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterChange);
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreNews);
    }
    
    // Featured article read more
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            showArticleModal(newsData.find(n => n.featured));
        });
    }
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

// Filter news based on category
function filterNews() {
    if (currentFilter === 'all') {
        return newsData.filter(news => !news.featured);
    }
    return newsData.filter(news => news.category === currentFilter && !news.featured);
}

// Create news card HTML
function createNewsCard(news) {
    return `
        <article class="news-card fade-in" data-news-id="${news.id}">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder-image" style="display: none;">
                    <i class="fas fa-newspaper"></i>
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
                        <span>${news.views} views</span>
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
function renderNews() {
    if (!newsGrid) return;
    
    // Show loading state
    newsGrid.innerHTML = `
        <div class="loading-news">
            <i class="fas fa-spinner"></i>
            <p>Loading news...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        const filteredNews = filterNews();
        const newsToShow = filteredNews.slice(0, currentPage * newsPerPage);
        
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
        
        // Render news cards
        newsGrid.innerHTML = newsToShow.map(news => createNewsCard(news)).join('');
        
        // Update load more button
        if (newsToShow.length >= filteredNews.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // Add click event listeners
        newsGrid.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', () => {
                const newsId = parseInt(card.dataset.newsId);
                const news = newsData.find(n => n.id === newsId);
                if (news) {
                    showArticleModal(news);
                }
            });
        });
        
        // Trigger fade in animation
        setTimeout(() => {
            newsGrid.querySelectorAll('.fade-in').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
    }, 500);
}

// Load more news
function loadMoreNews() {
    currentPage++;
    renderNews();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Show article modal
function showArticleModal(news) {
    const modalHTML = `
        <div class="news-modal-overlay" onclick="closeNewsModal()">
            <div class="news-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${news.title}</h2>
                    <button class="modal-close" onclick="closeNewsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-image">
                        <img src="${news.image}" alt="${news.title}" 
                             onerror="this.src='https://via.placeholder.com/600x300/667eea/ffffff?text=News+Image'">
                    </div>
                    <div class="modal-info">
                        <div class="article-meta">
                            <span class="category ${news.category}">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</span>
                            <span class="date">${formatDate(news.date)}</span>
                            <span class="read-time">${news.readTime}</span>
                        </div>
                        <p>${news.excerpt}</p>
                        <p>This is a sample article content. In a real application, you would have full article content stored and displayed here. The article would contain detailed information about the news item, including quotes, statistics, and comprehensive coverage of the event.</p>
                        <div class="article-stats">
                            <div class="stat-item">
                                <i class="fas fa-eye"></i>
                                <span>${news.views} views</span>
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
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Close article modal
function closeNewsModal() {
    const modal = document.querySelector('.news-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Export functions
function exportNewsData() {
    return {
        total: newsData.length,
        filtered: filterNews().length,
        currentFilter,
        currentPage,
        categories: [...new Set(newsData.map(n => n.category))]
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNewsPage();
});

// Make functions available globally
window.closeNewsModal = closeNewsModal;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNewsPage,
        filterNews,
        createNewsCard,
        exportNewsData
    };
}
