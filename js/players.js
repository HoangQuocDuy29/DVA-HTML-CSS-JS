// Players page functionality

// Sample player data - in real app, this would come from an API
const playersData = {
    middle: [
        {
            id: 1,
            name: "Hoàng Quốc Duy",
            number: 29,
            position: "Setter",
            height: "160cm",
            address: "Thái Bình, Việt Nam",
            age: 22,
            avatar: "images/players/HoangQuocDuy.png"
        },
        {
            id: 2,
            name: "Alex Rodriguez",
            number: 8,
            position: "Middle Blocker",
            height: "203cm",
            address: "New York, USA",
            age: 27,
            avatar: "https://via.placeholder.com/300x300/764ba2/ffffff?text=AR"
        },
        {
            id: 3,
            name: "David Chen",
            number: 5,
            position: "Setter",
            height: "185cm",
            address: "Los Angeles, USA",
            age: 24,
            avatar: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=DC"
        },
        {
            id: 4,
            name: "Ryan Thompson",
            number: 15,
            position: "Libero",
            height: "175cm",
            address: "Texas, USA",
            age: 23,
            avatar: "https://via.placeholder.com/300x300/f39c12/ffffff?text=RT"
        },
        {
            id: 5,
            name: "James Wilson",
            number: 9,
            position: "Opposite",
            height: "198cm",
            address: "Florida, USA",
            age: 26,
            avatar: "https://via.placeholder.com/300x300/27ae60/ffffff?text=JW"
        },
        {
            id: 6,
            name: "Kevin Martinez",
            number: 3,
            position: "Outside Hitter",
            height: "190cm",
            address: "Arizona, USA",
            age: 25,
            avatar: "https://via.placeholder.com/300x300/9b59b6/ffffff?text=KM"
        }
    ],
    junior: [
        {
            id: 7,
            name: "Artiukh Lyubov",
            number: 1,
            position: "Outside Hitter",
            height: "176cm",
            address: "Moscow, Russia",
            age: 19,
            avatar: "images/players/Lyuba.png"
        },
        {
            id: 8,
            name: "Phạm Thị Thanh Bình",
            number: 20,
            position: "Libero",
            height: "160cm",
            address: "Quảng Bình",
            age: 18,
            avatar: "images/players/PhamThiThanhBinhh.png"
        },
        {
            id: 9,
            name: "Sam Davis",
            number: 4,
            position: "Setter",
            height: "180cm",
            address: "Nevada, USA",
            age: 17,
            avatar: "https://via.placeholder.com/300x300/2980b9/ffffff?text=SD"
        },
        {
            id: 10,
            name: "Chris Brown",
            number: 14,
            position: "Libero",
            height: "172cm",
            address: "Colorado, USA",
            age: 18,
            avatar: "https://via.placeholder.com/300x300/d35400/ffffff?text=CB"
        },
        {
            id: 11,
            name: "Noah Garcia",
            number: 6,
            position: "Opposite",
            height: "192cm",
            address: "Utah, USA",
            age: 19,
            avatar: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=NG"
        },
        {
            id: 12,
            name: "Ethan Lee",
            number: 10,
            position: "Middle Blocker",
            height: "195cm",
            address: "Idaho, USA",
            age: 18,
            avatar: "https://via.placeholder.com/300x300/c0392b/ffffff?text=EL"
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

// Create player card HTML
function createPlayerCard(player) {
    return `
        <div class="player-card fade-in" data-player-id="${player.id}">
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
                <h3 class="player-name">${player.name}</h3>
                <div class="player-position">${player.position}</div>
                <div class="player-details">
                    <div class="detail-item">
                        <i class="fas fa-ruler-vertical"></i>
                        <span><strong>Height:</strong> ${player.height}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><strong>From:</strong> ${player.address}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-birthday-cake"></i>
                        <span><strong>Age:</strong> ${player.age}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tshirt"></i>
                        <span><strong>Jersey:</strong> #${player.number}</span>
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
            card.addEventListener('click', () => {
                const playerId = card.dataset.playerId;
                handlePlayerClick(playerId);
            });
        });
        
        // Trigger fade in animation
        setTimeout(() => {
            container.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
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
        alert(`Viewing details for ${player.name}\nPosition: ${player.position}\nHeight: ${player.height}`);
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
