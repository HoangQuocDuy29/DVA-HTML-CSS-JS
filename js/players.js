// Players page functionality - Load ALL Images Immediately
// Đã tối ưu để hiển thị TẤT CẢ ảnh ngay lập tức

// Updated player data - GIỮ NGUYÊN TOÀN BỘ
const playersData = {
    middle: [
        {
            id: 1,
            name: "Hoàng Quốc Duy",
            number: 29,
            position: "Setter",
            height: "160cm",
            reachHeight: "285cm",
            address: "Thái Bình",
            born: "2003",
            age: 22,
            avatar: "images/players/middle/HoangQuocDuy.webp",
            isCaptain: true
        },
        {
            id: 2,
            name: "Hoàng Minh Hiếu",
            number: 15,
            position: "Setter",
            height: "168cm",
            reachHeight: "275cm",
            address: "Bắc Giang",
            born: "1996",
            age: 29,
            avatar: "images/players/middle/MinhHieu.webp"
        },
        {
            id: 3,
            name: "Trịnh Văn Huy",
            number: 5,
            position: "Outside Hitter",
            height: "178cm",
            reachHeight: "300cm",
            address: "Nam Định",
            born: "2002",
            age: 23,
            avatar: "images/players/middle/TrinhVanHuy.webp"
        },
        {
            id: 4,
            name: "Hà Xuân Quân",
            number: 27,
            position: "Opposite Hitter",
            height: "177cm",
            reachHeight: "290cm",
            address: "Thanh Hoá",
            born: "2006",
            age: 19,
            avatar: "images/players/middle/HaXuanQuann.webp"
        },
        {
            id: 5,
            name: "Dương Văn Đại",
            number: 20,
            position: "Middle Blocker",
            height: "178cm",
            reachHeight: "290cm",
            address: "Thái Bình",
            born: "1992",
            age: 26,
            avatar: "images/players/middle/DuongVanDaii.webp"
        },
        {
            id: 6,
            name: "Nguyễn Đình Vũ",
            number: 24,
            position: "Middle Blocker",
            height: "175cm",
            reachHeight: "290cm",
            address: "Hải Dương",
            born: "2005",
            age: 20,
            avatar: "images/players/middle/NguyenDinhVu.webp"
        },
        {
            id: 7,
            name: "Nguyễn Quang Hưng",
            number: 9,
            position: "Outside Hitter",
            height: "180cm",
            reachHeight: "320cm",
            address: "Phú Thọ",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/NguyenQuangHungg.webp"
        },
        {
            id: 8,
            name: "Nùng Gia Bảo",
            number: 12,
            position: "Middle Blocker",
            height: "170cm",
            reachHeight: "285cm",
            address: "Lai Châu",
            born: "2005",
            age: 18,
            avatar: "images/players/middle/NungGiaBao.webp"
        },
        {
            id: 17,
            name: "Bùi Ngọc Chiến",
            number: 21,
            position: "Outside Hitter",
            height: "175cm",
            reachHeight: "310cm",
            address: "Ninh Bình",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/NgocChien.webp"
        },
        {
            id: 18,
            name: "Hải Đăng",
            number: 18,
            position: "Setter",
            height: "165cm",
            reachHeight: "285cm",
            address: "Nghệ An",
            born: "---",
            age: 21,
            avatar: "images/players/middle/HaiDangg.webp"
        },
        {
            id: 19,
            name: "Phạm Anh Quân",
            number: 45,
            position: "Outside Hitter",
            height: "177cm",
            reachHeight: "305cm",
            address: "Hoà Bình",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/PhamAnhQuan.webp"
        },
        {
            id: 20,
            name: "Lê Hải Dương",
            number: 11,
            position: "Outside Hitter",
            height: "175cm",
            reachHeight: "305cm",
            address: "Hải Dương",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/LeHaiDuong.webp"
        },
        {
            id: 21,
            name: "Nguyễn Tiến Bảo Hưng",
            number: 11,
            position: "Outside Hitter",
            height: "175cm",
            reachHeight: "300cm",
            address: "Nghệ An",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/BaoHung.webp"
        },
        {
            id: 22,
            name: "Lê Hải Nam",
            number: 11,
            position: "Middle Blocker",
            height: "172cm",
            reachHeight: "300cm",
            address: "---",
            born: "2005",
            age: 21,
            avatar: "images/players/middle/HaiNam.webp"
        },
        {
            id: 23,
            name: "Đồng Hữu Hiếu",
            number: 22,
            position: "Outside Hitter",
            height: "178cm",
            reachHeight: "320cm",
            address: "Hải Dương",
            born: "1997",
            age: 26,
            avatar: "images/players/middle/HuuHieu.webp"
        }
    ],
    junior: [
        {
            id: 9,
            name: "Artiukh Lyubov",
            number: 1,
            position: "Outside Hitter",
            height: "176cm",
            reachHeight: "285cm",
            address: "Moscow, Russia",
            born: "2005",
            age: 19,
            avatar: "images/players/junior/Liuba.webp"
        },
        {
            id: 10,
            name: "Phạm Thị Thanh Bình",
            number: 20,
            position: "Libero",
            height: "160cm",
            reachHeight: "260cm",
            address: "Quảng Bình",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/ThanhBinh.webp"
        },
        {
            id: 11,
            name: "Woohyeok Jang",
            number: 4,
            position: "Middle Blocker",
            height: "173cm",
            reachHeight: "265cm",
            address: "Korea",
            born: "2008",
            age: 17,
            avatar: "images/players/junior/JangWooheok.webp"
        },
        {
            id: 12,
            name: "Yelzhas Dualatuly",
            number: 14,
            position: "Outside Hitter",
            height: "174cm",
            reachHeight: "288cm",
            address: "Kazakhstan",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/YelzhasDualatuly.webp"
        },
        {
            id: 13,
            name: "Neo Jackson",
            number: 6,
            position: "Opposite",
            height: "172cm",
            reachHeight: "280cm",
            address: "India",
            born: "2008",
            age: 19,
            avatar: "images/players/junior/NeoJackson.webp"
        },
        {
            id: 14,
            name: "Trần Tuấn Kiệt",
            number: 10,
            position: "Middle Blocker",
            height: "180cm",
            reachHeight: "290cm",
            address: "Hà Nội",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/TranTuanKiet.webp"
        },
        {
            id: 15,
            name: "Phùng Kiến Quốc",
            number: 10,
            position: "Opposite",
            height: "175cm",
            reachHeight: "288cm",
            address: "Hà Nội",
            born: "2008",
            age: 18,
            avatar: "images/players/junior/PhungKienQuoc.webp"
        },
        {
            id: 16,
            name: "Ali Janjua",
            number: 11,
            position: "Middle Blocker",
            height: "183cm",
            reachHeight: "290cm",
            address: "Nam Định",
            born: "2006",
            age: 18,
            avatar: "images/players/junior/Ali.webp"
        }
    ]
};

// Performance Configuration - Simplified for immediate loading
const PERFORMANCE_CONFIG = {
    DEBOUNCE_DELAY: 200, // Debounce delay for search
    ANIMATION_DELAY: 30, // Faster animations
    PRELOAD_ALL_IMAGES: true // Load all images immediately
};

// Simplified Image Cache for immediate loading
class ImagePreloader {
    constructor() {
        this.loadedImages = new Set();
    }

    // Preload ALL images immediately
    async preloadAllImages() {
        const allAvatars = [
            ...playersData.middle.map(p => p.avatar),
            ...playersData.junior.map(p => p.avatar)
        ].filter(Boolean);

        console.log(`🖼️ Loading ALL ${allAvatars.length} player images immediately...`);

        const promises = allAvatars.map(url => this.preloadSingle(url));
        
        try {
            await Promise.allSettled(promises);
            console.log('✅ All player images loaded');
        } catch (error) {
            console.warn('⚠️ Some images failed to load');
        }
    }

    // Load single image
    preloadSingle(url) {
        return new Promise((resolve, reject) => {
            if (this.loadedImages.has(url)) {
                resolve();
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.loadedImages.add(url);
                resolve();
            };

            img.onerror = () => {
                console.warn(`❌ Failed to load: ${url}`);
                resolve(); // Don't reject, continue with other images
            };

            img.src = url;
        });
    }
}

// Global instance
const imagePreloader = new ImagePreloader();

// State management - GIỮ NGUYÊN
let currentTeam = 'middle';
let filteredPlayers = [];
let currentFilters = {
    search: '',
    position: '',
    height: ''
};

// DOM elements - GIỮ NGUYÊN
let searchInput, positionFilter, heightFilter, tabButtons, teamContents;

// Optimized debounce utility
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Enhanced initialization - PRELOAD ALL IMAGES
async function initPlayersPage() {
    console.log('🚀 Initializing players page - Loading ALL images...');

    // Get DOM elements - GIỮ NGUYÊN
    searchInput = document.getElementById('search-input');
    positionFilter = document.getElementById('position-filter');
    heightFilter = document.getElementById('height-filter');
    tabButtons = document.querySelectorAll('.tab-button');
    teamContents = document.querySelectorAll('.team-content');

    // Set up event listeners
    setupEventListeners();
    
    // Preload ALL images immediately
    await imagePreloader.preloadAllImages();
    
    // Initial render - GIỮ NGUYÊN
    renderPlayers();

    console.log('✅ Players page fully loaded with ALL images');
}

// Standard event listeners setup
function setupEventListeners() {
    // Enhanced search with debounce
    if (searchInput) {
        const debouncedSearch = debounce(handleSearch, PERFORMANCE_CONFIG.DEBOUNCE_DELAY);
        searchInput.addEventListener('input', debouncedSearch);
    }

    // Filter selects - GIỮ NGUYÊN
    if (positionFilter) {
        positionFilter.addEventListener('change', handlePositionFilter);
    }
    
    if (heightFilter) {
        heightFilter.addEventListener('change', handleHeightFilter);
    }

    // Team tabs - GIỮ NGUYÊN
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTeamSwitch);
    });
}

// Team switch handler - GIỮ NGUYÊN
function handleTeamSwitch(e) {
    const team = e.target.dataset.team;
    if (team !== currentTeam) {
        currentTeam = team;
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active content
        teamContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${team}-team`).classList.add('active');
        
        // Reset filters and render
        resetFilters();
        renderPlayers();

        console.log(`🔄 Switched to ${team} team`);
    }
}

// All handler functions - GIỮ NGUYÊN
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    renderPlayers();
}

function handlePositionFilter(e) {
    currentFilters.position = e.target.value;
    renderPlayers();
}

function handleHeightFilter(e) {
    currentFilters.height = e.target.value;
    renderPlayers();
}

function resetFilters() {
    currentFilters = {
        search: '',
        position: '',
        height: ''
    };
    
    if (searchInput) searchInput.value = '';
    if (positionFilter) positionFilter.value = '';
    if (heightFilter) heightFilter.value = '';
}

// Filter function - GIỮ NGUYÊN
function filterPlayers(players) {
    return players.filter(player => {
        // Search filter
        if (currentFilters.search && 
            !player.name.toLowerCase().includes(currentFilters.search) &&
            !player.position.toLowerCase().includes(currentFilters.search)) {
            return false;
        }
        
        // Position filter
        if (currentFilters.position && player.position !== currentFilters.position) {
            return false;
        }
        
        // Height filter
        if (currentFilters.height) {
            const height = parseInt(player.height);
            switch (currentFilters.height) {
                case 'under-180':
                    if (height >= 180) return false;
                    break;
                case '180-190':
                    if (height < 180 || height > 190) return false;
                    break;
                case 'over-190':
                    if (height <= 190) return false;
                    break;
            }
        }
        
        return true;
    });
}

// Player card creation - LOAD IMAGE IMMEDIATELY
function createPlayerCard(player) {
    const captainBadge = player.isCaptain ? `
        <div class="captain-badge">
            <i class="fas fa-crown"></i>
            <span>C</span>
        </div>
    ` : '';

    const initials = player.name.split(' ').map(n => n[0]).join('');
    
    return `
        <div class="player-card fade-in" data-player-id="${player.id}">
            ${captainBadge}
            <div class="player-avatar">
                <img src="${player.avatar}" 
                     alt="${player.name}" 
                     class="player-image"
                     onload="this.classList.add('loaded')"
                     onerror="handleImageError(this, '${initials}')">
                <div class="placeholder" style="display: none;">
                    <i class="fas fa-user"></i>
                    <span>${initials}</span>
                </div>
                <div class="player-number">${player.number}</div>
            </div>
            <div class="player-info">
                <div class="player-header">
                    <h3 class="player-name">${player.name}</h3>
                    <div class="player-position">${player.position}</div>
                </div>
                
                <div class="player-stats">
                    <div class="stat-row primary-stats">
                        <div class="stat-item height-stat">
                            <div class="stat-icon">
                                <i class="fas fa-ruler-vertical"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value">${player.height}</span>
                                <span class="stat-label">Height</span>
                            </div>
                        </div>
                        <div class="stat-item reach-stat">
                            <div class="stat-icon">
                                <i class="fas fa-hand-paper"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-value">${player.reachHeight}</span>
                                <span class="stat-label">Reach</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-row secondary-stats">
                        <div class="detail-item location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${player.address}</span>
                        </div>
                        <div class="detail-item birth">
                            <i class="fas fa-birthday-cake"></i>
                            <span>Born ${player.born}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render all players at once - NO LAZY LOADING
function renderPlayers() {
    const container = document.getElementById(`${currentTeam}-players`);
    if (!container) return;
    
    console.log('🎨 Rendering ALL players immediately...');
    
    // Show loading state briefly
    container.innerHTML = `
        <div class="loading-players">
            <div class="loading-spinner"></div>
            <p>Loading players...</p>
        </div>
    `;
    
    // Render immediately without delay
    requestAnimationFrame(() => {
        const players = playersData[currentTeam] || [];
        filteredPlayers = filterPlayers(players);
        
        if (filteredPlayers.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No players found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        // Render ALL players at once
        container.innerHTML = filteredPlayers
            .map(player => createPlayerCard(player))
            .join('');
        
        // Setup interactions immediately
        setupPlayerInteractions(container);
        
        // Animate all cards
        setTimeout(() => {
            container.querySelectorAll('.fade-in').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * PERFORMANCE_CONFIG.ANIMATION_DELAY);
            });
        }, 50);
    });
}

// Setup player interactions
function setupPlayerInteractions(container) {
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.player-card');
        if (card && !e.target.closest('.action-btn')) {
            const playerId = card.dataset.playerId;
            handlePlayerClick(playerId);
        }
    });
}

// Image error handler
function handleImageError(img, initials) {
    console.warn(`❌ Failed to load: ${img.src}`);
    
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('placeholder')) {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
        placeholder.querySelector('span').textContent = initials;
    }
}

// Player click handler - GIỮ NGUYÊN
function handlePlayerClick(playerId) {
    const player = [...playersData.middle, ...playersData.junior]
        .find(p => p.id == playerId);
    
    if (player) {
        showPlayerModal(player);
    }
}

// Modal functions - GIỮ NGUYÊN
function showPlayerModal(player) {
    const modalHTML = `
        <div class="player-modal-overlay" onclick="closePlayerModal()">
            <div class="player-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${player.name}</h2>
                    <button class="modal-close" onclick="closePlayerModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-avatar">
                        <img src="${player.avatar}" alt="${player.name}" 
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+JHtwbGF5ZXIubmFtZS5zcGxpdCgnICcpLm1hcChuID0+IG5bMF0pLmpvaW4oJycpfTwvdGV4dD48L3N2Zz4='">
                        <div class="modal-number">#${player.number}</div>
                    </div>
                    <div class="modal-info">
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Position:</span>
                                <span class="info-value">${player.position}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Height:</span>
                                <span class="info-value">${player.height}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Reach Height:</span>
                                <span class="info-value">${player.reachHeight}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Born:</span>
                                <span class="info-value">${player.born}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">From:</span>
                                <span class="info-value">${player.address}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Jersey:</span>
                                <span class="info-value">#${player.number}</span>
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

function closePlayerModal() {
    const modal = document.querySelector('.player-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Utility functions - GIỮ NGUYÊN
function viewPlayerStats(playerId) {
    const player = [...playersData.middle, ...playersData.junior]
        .find(p => p.id == playerId);
    
    if (player) {
        alert(`Viewing stats for ${player.name}`);
    }
}

function sharePlayer(playerId) {
    const player = [...playersData.middle, ...playersData.junior]
        .find(p => p.id == playerId);
    
    if (player && navigator.share) {
        navigator.share({
            title: `DVA Club - ${player.name}`,
            text: `Check out ${player.name}, ${player.position} for DVA Club`,
            url: window.location.href
        });
    } else if (player) {
        const text = `Check out ${player.name}, ${player.position} for DVA Club - ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Player info copied to clipboard!');
        });
    }
}

function exportPlayerData(team) {
    return playersData[team] || [];
}

function searchByNumber(number) {
    const allPlayers = [...playersData.middle, ...playersData.junior];
    return allPlayers.find(player => player.number == number);
}

function getPlayersByPosition(position) {
    const allPlayers = [...playersData.middle, ...playersData.junior];
    return allPlayers.filter(player => player.position === position);
}

// Service Worker registration for caching
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📦 Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker failed:', error);
            });
    }
}

// Initialize when DOM is loaded - LOAD ALL IMAGES
document.addEventListener('DOMContentLoaded', async () => {
    console.log('⚡ Starting players page - Loading ALL images immediately...');
    
    // Register service worker
    registerServiceWorker();
    
    // Initialize page and load ALL images
    await initPlayersPage();
    
    console.log('✅ ALL players and images loaded successfully');
});

// Make functions globally available
window.handleImageError = handleImageError;
window.viewPlayerStats = viewPlayerStats;
window.sharePlayer = sharePlayer;
window.closePlayerModal = closePlayerModal;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPlayersPage,
        filterPlayers,
        createPlayerCard,
        exportPlayerData,
        searchByNumber,
        getPlayersByPosition
    };
}

console.log('🚀 Players module loaded - ALL images will load immediately');
