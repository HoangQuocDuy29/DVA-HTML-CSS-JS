// Players page functionality

// Updated player data with new fields
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
            avatar: "images/players/middle/HoangQuocDuy.png",
            isCaptain: true
        },
        {
            id: 2,
            name: "Nùng Gia Bảo",
            number: 12,
            position: "Middle Blocker",
            height: "170cm",
            reachHeight: "285cm",
            address: "Lai Châu",
            born: "2005",
            age: 18,
            avatar: "images/players/middle/NungGiaBao.png"
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
            avatar: "images/players/middle/TrinhVanHuy.png"
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
            avatar: "images/players/middle/HaXuanQuann.png"
        },
        {
            id: 5,
            name: "Dương Văn Đại",
            number: 20,
            position: "Middle Blocker",
            height: "180cm",
            reachHeight: "290cm",
            address: "Thái Bình",
            born: "1998",
            age: 26,
            avatar: "images/players/middle/DuongVanDaii.png"
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
            avatar: "images/players/middle/NguyenDinhVu.png"
        },
        {
            id: 7,
            name: "Nguyễn Quang Hưng",
            number: 9,
            position: "Outside Hitter",
            height: "180cm",
            reachHeight: "330cm",
            address: "Phú Thọ",
            born: "2004",
            age: 21,
            avatar: "images/players/middle/NguyenQuangHungg.png"
        }
    ],
    junior: [
        {
            id: 8,
            name: "Artiukh Lyubov",
            number: 1,
            position: "Outside Hitter",
            height: "176cm",
            reachHeight: "285cm",
            address: "Moscow, Russia",
            born: "2005",
            age: 19,
            avatar: "images/players/junior/Liuba.png"
        },
        {
            id: 9,
            name: "Phạm Thị Thanh Bình",
            number: 20,
            position: "Libero",
            height: "160cm",
            reachHeight: "260cm",
            address: "Quảng Bình",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/ThanhBinh.png"
        },
        {
            id: 10,
            name: "Jang Wooheok",
            number: 4,
            position: "Outside Hitter",
            height: "170cm",
            reachHeight: "280cm",
            address: "Korea",
            born: "2008",
            age: 17,
            avatar: "images/players/junior/JangWooheok.png"
        },
        {
            id: 11,
            name: "Yelzhas Dualatuly",
            number: 14,
            position: "Outside Hitter",
            height: "175cm",
            reachHeight: "290cm",
            address: "Kazakhstan",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/YelzhasDualatuly.png"
        },
        {
            id: 12,
            name: "Neo Jackson",
            number: 6,
            position: "Opposite",
            height: "172cm",
            reachHeight: "280cm",
            address: "India",
            born: "2008",
            age: 19,
            avatar: "images/players/junior/NeoJackson.png"
        },
        {
            id: 13,
            name: "Trần Tuấn Kiệt",
            number: 10,
            position: "Middle Blocker",
            height: "176cm",
            reachHeight: "290cm",
            address: "Hà Nội",
            born: "2007",
            age: 18,
            avatar: "images/players/junior/TranTuanKiet.png"
        },
        {
            id: 14,
            name: "Phùng Kiến Quốc",
            number: 10,
            position: "Opposite",
            height: "170cm",
            reachHeight: "270cm",
            address: "Hà Nội",
            born: "2008",
            age: 18,
            avatar: "images/players/junior/PhungKienQuoc.png"
        }
    ]
};

// State management
let currentTeam = 'middle';
let filteredPlayers = [];
let currentFilters = {
    search: '',
    position: '',
    height: ''
};

// DOM elements
let searchInput, positionFilter, heightFilter, tabButtons, teamContents;

// Initialize players page
function initPlayersPage() {
    // Get DOM elements
    searchInput = document.getElementById('search-input');
    positionFilter = document.getElementById('position-filter');
    heightFilter = document.getElementById('height-filter');
    tabButtons = document.querySelectorAll('.tab-button');
    teamContents = document.querySelectorAll('.team-content');

    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderPlayers();
}

// Set up all event listeners
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(handleSearch, 300));
    }

    // Filter selects
    if (positionFilter) {
        positionFilter.addEventListener('change', handlePositionFilter);
    }
    
    if (heightFilter) {
        heightFilter.addEventListener('change', handleHeightFilter);
    }

    // Team tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTeamSwitch);
    });
}

// Handle search functionality
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    renderPlayers();
}

// Handle position filter
function handlePositionFilter(e) {
    currentFilters.position = e.target.value;
    renderPlayers();
}

// Handle height filter
function handleHeightFilter(e) {
    currentFilters.height = e.target.value;
    renderPlayers();
}

// Handle team switching
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
        
        // Reset filters when switching teams
        resetFilters();
        renderPlayers();
    }
}

// Reset all filters
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

// Filter players based on current filters
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

// Create modern player card HTML - Without footer
function createPlayerCard(player) {
    const captainBadge = player.isCaptain ? `
        <div class="captain-badge">
            <i class="fas fa-crown"></i>
            <span>C</span>
        </div>
    ` : '';
    
    return `
        <div class="player-card fade-in" data-player-id="${player.id}">
            ${captainBadge}
            <div class="player-avatar">
                <img src="${player.avatar}" alt="${player.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder" style="display: none;">
                    <i class="fas fa-user"></i>
                    <span>${player.name.split(' ').map(n => n[0]).join('')}</span>
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


// Render players grid
function renderPlayers() {
    const container = document.getElementById(`${currentTeam}-players`);
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `
        <div class="loading-players">
            <i class="fas fa-spinner"></i>
            <p>Loading players...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
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
        
        // Render player cards
        container.innerHTML = filteredPlayers
            .map(player => createPlayerCard(player))
            .join('');
        
        // Add click event listeners to player cards
        container.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on action buttons
                if (e.target.closest('.action-btn')) return;
                
                const playerId = card.dataset.playerId;
                handlePlayerClick(playerId);
            });
        });
        
        // Trigger fade in animation
        setTimeout(() => {
            container.querySelectorAll('.fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
    }, 500); // Simulate loading time
}

// Handle player card click
function handlePlayerClick(playerId) {
    const player = [...playersData.middle, ...playersData.junior]
        .find(p => p.id == playerId);
    
    if (player) {
        // In a real app, this would navigate to a player detail page
        showPlayerModal(player);
    }
}

// Show player modal (enhanced version)
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
                             onerror="this.src='https://via.placeholder.com/200x200/667eea/ffffff?text=${player.name.split(' ').map(n => n[0]).join('')}'">
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

// Close player modal
function closePlayerModal() {
    const modal = document.querySelector('.player-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Player action functions
function viewPlayerStats(playerId) {
    const player = [...playersData.middle, ...playersData.junior]
        .find(p => p.id == playerId);
    
    if (player) {
        alert(`Viewing stats for ${player.name}`);
        // In real app, this would show detailed statistics
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
        // Fallback for browsers without native sharing
        const text = `Check out ${player.name}, ${player.position} for DVA Club - ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Player info copied to clipboard!');
        });
    }
}

// Export data for other modules (if needed)
function exportPlayerData(team) {
    return playersData[team] || [];
}

// Search by player number
function searchByNumber(number) {
    const allPlayers = [...playersData.middle, ...playersData.junior];
    return allPlayers.find(player => player.number == number);
}

// Get players by position
function getPlayersByPosition(position) {
    const allPlayers = [...playersData.middle, ...playersData.junior];
    return allPlayers.filter(player => player.position === position);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPlayersPage();
});

// Make functions available globally
window.viewPlayerStats = viewPlayerStats;
window.sharePlayer = sharePlayer;
window.closePlayerModal = closePlayerModal;

// Export functions for testing
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
