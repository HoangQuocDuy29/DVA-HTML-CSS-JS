// Ranking page functionality

// Sample data - in real app, this would come from APIs
const rankingData = {
    leagueStandings: [
        {
            position: 1,
            team: "BVC",
            played: 20,
            wins: 17,
            losses: 3,
            setsFor: 53,
            setsAgainst: 18,
            setDiff: 35,
            points: 51,
            form: ['W', 'W', 'W', 'L', 'W'],
            category: 'champions'
        },
        {
            position: 2,
            team: "Văn Quán",
            played: 18,
            wins: 14,
            losses: 4,
            setsFor: 45,
            setsAgainst: 22,
            setDiff: 23,
            points: 42,
            form: ['W', 'W', 'L', 'W', 'W'],
            category: 'champions',
            
        },
        {
            position: 3,
            team: "DVA Middle",
            played: 19,
            wins: 13,
            losses: 6,
            setsFor: 42,
            setsAgainst: 28,
            setDiff: 14,
            points: 39,
            form: ['L', 'W', 'W', 'W', 'L'],
            category: 'playoffs',
            isDVA: true
        },
        {
            position: 4,
            team: "AVC",
            played: 18,
            wins: 12,
            losses: 6,
            setsFor: 38,
            setsAgainst: 26,
            setDiff: 12,
            points: 36,
            form: ['W', 'L', 'W', 'W', 'W'],
            category: 'playoffs'
        },
        {
            position: 5,
            team: "Sharks",
            played: 16,
            wins: 9,
            losses: 7,
            setsFor: 32,
            setsAgainst: 28,
            setDiff: 4,
            points: 27,
            form: ['W', 'L', 'W', 'L', 'W'],
            category: 'playoffs'
            
        },
        {
            position: 6,
            team: "Nippon",
            played: 18,
            wins: 8,
            losses: 10,
            setsFor: 30,
            setsAgainst: 35,
            setDiff: -5,
            points: 24,
            form: ['L', 'L', 'W', 'L', 'W'],
            category: 'playoffs'
        },
        {
            position: 7,
            team: "DVA Junior",
            played: 17,
            wins: 7,
            losses: 10,
            setsFor: 28,
            setsAgainst: 36,
            setDiff: -8,
            points: 21,
            form: ['W', 'L', 'L', 'W', 'L'],
            category: 'playoffs',
            isDVA: true
        },
        {
            position: 8,
            team: "BUV",
            played: 18,
            wins: 6,
            losses: 12,
            setsFor: 25,
            setsAgainst: 42,
            setDiff: -17,
            points: 18,
            form: ['L', 'L', 'W', 'L', 'L'],
            category: 'playoffs',
            

        },
        {
            position: 9,
            team: "Black Cats",
            played: 17,
            wins: 4,
            losses: 13,
            setsFor: 20,
            setsAgainst: 45,
            setDiff: -25,
            points: 12,
            form: ['L', 'L', 'L', 'W', 'L'],
            category: 'relegation'
        },
        {
            position: 10,
            team: "TVC",
            played: 16,
            wins: 2,
            losses: 14,
            setsFor: 15,
            setsAgainst: 47,
            setDiff: -32,
            points: 6,
            form: ['L', 'L', 'L', 'L', 'W'],
            category: 'relegation'
        }
    ],
    
    playerStats: {
        'top-scorers': [
            { name: "Michael Johnson", team: "DVA Middle", stat: 342, isDVA: true },
            { name: "Alex Thunder", team: "Thunder Bolts", stat: 318 },
            { name: "Ryan Martinez", team: "Lightning Strikes", stat: 295 },
            { name: "James Wilson", team: "DVA Middle", stat: 287, isDVA: true },
            { name: "Kevin Storm", team: "Storm Eagles", stat: 276 }
        ],
        'best-attackers': [
            { name: "James Wilson", team: "DVA Middle", stat: "89.5%", isDVA: true },
            { name: "Alex Thunder", team: "Thunder Bolts", stat: "87.2%" },
            { name: "Ryan Fire", team: "Phoenix Fire", stat: "85.8%" },
            { name: "Michael Johnson", team: "DVA Middle", stat: "84.3%", isDVA: true },
            { name: "Tommy Wave", team: "Wave Riders", stat: "82.7%" }
        ],
        'best-blockers': [
            { name: "Alex Rodriguez", team: "DVA Middle", stat: 156, isDVA: true,avatar: "images/ranking/MinhHieu.png" },
            { name: "Giant Mike", team: "Thunder Bolts", stat: 142 },
            { name: "Wall Steve", team: "Lightning Strikes", stat: 138 },
            { name: "Ethan Lee", team: "DVA Junior", stat: 125, isDVA: true },
            { name: "Block King", team: "Storm Eagles", stat: 119 }
        ],
        'best-setters': [
            { name: "Hoàng Quốc Duy", team: "DVA Middle", stat: 892, isDVA: true, avatar: "images/ranking/best-setter/QuocDuy.png" },
            { name: "Hoàng Minh Hiếu", team: "DVA Middle", stat: 856, isDVA: true, avatar: "images/ranking/best-setter/HoangMinhHieuu.png" },
            { name: "Trịnh Duy Đông", team: "DVA Middle", stat: 834, isDVA: true, avatar: "images/ranking/best-setter/DuyDong.png" },
            { name: "Nguyễn Ngọc Bảo", team: "DVA Middle", stat: 789, isDVA: true, avatar: "images/ranking/best-setter/Bao.png" },
            { name: "Hoàng Đình Trọng", team: "DVA Junior", stat: 767, isDVA: true, avatar: "images/ranking/best-setter/DinhTrong.png" }
        ]
    }
};

// State management
let currentCategory = 'league';
let currentTableFilter = 'all';
let currentTableView = 'detailed';
let currentSortColumn = 'position';
let currentSortDirection = 'asc';

// DOM elements
let categoryButtons, rankingContents, seasonSelect;
let leagueTableBody, filterButtons, viewButtons, sortableHeaders;

// Initialize ranking page
function initRankingPage() {
    // Get DOM elements
    categoryButtons = document.querySelectorAll('.category-btn');
    rankingContents = document.querySelectorAll('.ranking-content');
    seasonSelect = document.getElementById('season-select');
    leagueTableBody = document.getElementById('league-table-body');
    filterButtons = document.querySelectorAll('.filter-btn');
    viewButtons = document.querySelectorAll('.view-btn');
    sortableHeaders = document.querySelectorAll('.sortable');

    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderLeagueTable();
    renderPlayerStats('top-scorers');
}

// Set up all event listeners
function setupEventListeners() {
    // Category navigation
    categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategorySwitch);
    });

    // Season selector
    if (seasonSelect) {
        seasonSelect.addEventListener('change', handleSeasonChange);
    }

    // Table filters
    filterButtons.forEach(button => {
        button.addEventListener('click', handleTableFilter);
    });

    // View toggle
    viewButtons.forEach(button => {
        button.addEventListener('click', handleViewToggle);
    });

    // Sortable headers
    sortableHeaders.forEach(header => {
        header.addEventListener('click', handleSort);
    });

    // Player stats categories
    const statsButtons = document.querySelectorAll('.stats-btn');
    statsButtons.forEach(button => {
        button.addEventListener('click', handleStatsCategory);
    });

    // Tournament tabs
    const tournamentButtons = document.querySelectorAll('.tournament-btn');
    tournamentButtons.forEach(button => {
        button.addEventListener('click', handleTournamentSwitch);
    });
}

// Handle category switching
function handleCategorySwitch(e) {
    const category = e.target.dataset.category;
    if (category !== currentCategory) {
        currentCategory = category;
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active content
        rankingContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${category}-content`).classList.add('active');
        
        // Load specific content based on category
        switch (category) {
            case 'league':
                renderLeagueTable();
                break;
            case 'player':
                renderPlayerStats('top-scorers');
                break;
            case 'dream-team':
                // Force re-render every time dream team is accessed
                setTimeout(() => {
                    renderDreamTeam();
                }, 100);
                break;
            case 'tournament':
                // Tournament data is static in HTML for this demo
                break;
            case 'season':
                // Season records are static in HTML for this demo
                break;
        }
    }
}

// Handle season change
function handleSeasonChange(e) {
    const season = e.target.value;
    console.log(`Loading data for season: ${season}`);
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        renderLeagueTable();
        hideLoadingState();
    }, 1000);
}

// Handle table filtering
function handleTableFilter(e) {
    const filter = e.target.dataset.filter;
    if (filter !== currentTableFilter) {
        currentTableFilter = filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderLeagueTable();
    }
}

// Handle view toggle
function handleViewToggle(e) {
    const view = e.target.dataset.view;
    if (view !== currentTableView) {
        currentTableView = view;
        
        // Update active button
        viewButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderLeagueTable();
    }
}

// Handle table sorting
function handleSort(e) {
    const column = e.target.dataset.sort;
    
    if (currentSortColumn === column) {
        // Toggle direction
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // New column
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    // Update header indicators
    sortableHeaders.forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    
    e.target.classList.add(`sort-${currentSortDirection}`);
    
    renderLeagueTable();
}

// Handle stats category switching
function handleStatsCategory(e) {
    const category = e.target.dataset.stats;
    
    // Update active button
    document.querySelectorAll('.stats-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    renderPlayerStats(category);
}

// Handle tournament switching
function handleTournamentSwitch(e) {
    const tournament = e.target.dataset.tournament;
    
    // Update active button
    document.querySelectorAll('.tournament-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // In a real app, this would load different tournament data
    console.log(`Switching to tournament: ${tournament}`);
}

// Filter league table data
function filterTableData(data) {
    switch (currentTableFilter) {
        case 'top6':
            return data.filter(team => team.position <= 6);
        case 'bottom6':
            return data.filter(team => team.position > 4);
        case 'all':
        default:
            return data;
    }
}

// Sort league table data
function sortTableData(data) {
    return [...data].sort((a, b) => {
        let aValue = a[currentSortColumn];
        let bValue = b[currentSortColumn];
        
        // Handle numeric values
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return currentSortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // Handle string values
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return currentSortDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        return 0;
    });
}

// Render league table
function renderLeagueTable() {
    if (!leagueTableBody) return;
    
    let data = rankingData.leagueStandings;
    
    // Apply filters and sorting
    data = filterTableData(data);
    
    if (currentSortColumn !== 'position') {
        data = sortTableData(data);
    }
    
    leagueTableBody.innerHTML = data.map((team, index) => `
        <tr class="${team.category} ${team.isDVA ? 'dva-team' : ''}" data-team="${team.team}">
            <td class="position">${team.position}</td>
            <td class="team-name">${team.team}</td>
            <td>${team.played}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.setsFor}</td>
            <td>${team.setsAgainst}</td>
            <td class="${team.setDiff >= 0 ? 'positive' : 'negative'}">${team.setDiff > 0 ? '+' : ''}${team.setDiff}</td>
            <td><strong>${team.points}</strong></td>
            <td>
                <div class="form-indicators">
                    ${team.form.map(result => `
                        <span class="form-result ${result === 'W' ? 'win' : result === 'L' ? 'loss' : 'draw'}">${result}</span>
                    `).join('')}
                </div>
            </td>
        </tr>
    `).join('');

    // Add click event listeners to table rows
    document.querySelectorAll('#league-table-body tr').forEach(row => {
        row.addEventListener('click', () => {
            const teamName = row.dataset.team;
            handleTeamClick(teamName);
        });
    });
}
// Create player avatar with image path support
function createPlayerAvatar(player, rank) {
    const avatarClass = `player-avatar-small rank-${rank}-avatar`;
    const initials = getPlayerInitials(player.name);
    
    // Check if player has avatar path
    if (player.avatar) {
        return `
            <div class="${avatarClass}" data-player="${player.name}">
                <img src="${player.avatar}" 
                     alt="${player.name}" 
                     onerror="handleAvatarError(this, '${initials}')"
                     onload="handleAvatarLoad(this)">
            </div>
        `;
    } else {
        // Fallback to initials
        return `
            <div class="${avatarClass}" data-player="${player.name}">
                <span class="avatar-initials">${initials}</span>
            </div>
        `;
    }
}
// Get player initials from full name
function getPlayerInitials(fullName) {
    return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2); // Limit to 2 characters
}
// Handle avatar image load success
function handleAvatarLoad(imgElement) {
    const avatarContainer = imgElement.parentElement;
    avatarContainer.classList.remove('loading', 'error');
    
    // Add subtle animation on load
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.style.opacity = '1';
    }, 100);
    
    console.log('✅ Avatar loaded successfully:', imgElement.alt);
}

// Handle avatar image load error
function handleAvatarError(imgElement, initials) {
    const avatarContainer = imgElement.parentElement;
    const playerName = imgElement.alt;
    
    console.log('❌ Avatar failed to load for:', playerName);
    
    // Remove the broken image
    imgElement.remove();
    
    // Add error class and fallback initials
    avatarContainer.classList.add('error');
    avatarContainer.innerHTML = `<span class="avatar-initials">${initials}</span>`;
    
    // Log for debugging
    console.log(`🔄 Fallback to initials "${initials}" for ${playerName}`);
}
// Enhanced function to add/update player avatar paths
function updatePlayerAvatars(updates) {
    // Updates should be in format: { playerName: avatarPath }
    Object.keys(updates).forEach(playerName => {
        const avatarPath = updates[playerName];
        
        // Update in all stat categories
        Object.keys(rankingData.playerStats).forEach(category => {
            const playerIndex = rankingData.playerStats[category].findIndex(
                player => player.name === playerName
            );
            
            if (playerIndex !== -1) {
                rankingData.playerStats[category][playerIndex].avatar = avatarPath;
            }
        });
    });
    
    console.log('🎨 Updated player avatars:', updates);
    
    // Re-render current stats if on player stats page
    if (currentCategory === 'player') {
        const activeStatsBtn = document.querySelector('.stats-btn.active');
        if (activeStatsBtn) {
            const currentStatsCategory = activeStatsBtn.dataset.stats;
            renderPlayerStats(currentStatsCategory);
        }
    }
}// Utility function to get player by name
function getPlayerByName(playerName) {
    for (const category of Object.keys(rankingData.playerStats)) {
        const player = rankingData.playerStats[category].find(p => p.name === playerName);
        if (player) {
            return player;
        }
    }
    return null;
}

// Enhanced function to add new player with avatar
function addPlayerToStats(category, playerData) {
    if (!rankingData.playerStats[category]) {
        rankingData.playerStats[category] = [];
    }
    
    // Ensure player has required fields
    const player = {
        name: playerData.name,
        team: playerData.team,
        stat: playerData.stat,
        isDVA: playerData.isDVA || false,
        avatar: playerData.avatar || null
    };
    
    rankingData.playerStats[category].push(player);
    
    console.log(`➕ Added player ${player.name} to ${category}`);
    
    // Re-render if currently viewing this category
    const activeStatsBtn = document.querySelector('.stats-btn.active');
    if (activeStatsBtn && activeStatsBtn.dataset.stats === category) {
        renderPlayerStats(category);
    }
}

// Function to preload avatar images
function preloadAvatars() {
    const allPlayers = [];
    
    // Collect all players with avatars
    Object.values(rankingData.playerStats).forEach(category => {
        category.forEach(player => {
            if (player.avatar) {
                allPlayers.push(player);
            }
        });
    });
    
    console.log(`🖼️ Preloading ${allPlayers.length} player avatars...`);
    
    allPlayers.forEach(player => {
        const img = new Image();
        img.onload = () => console.log(`✅ Preloaded: ${player.name}`);
        img.onerror = () => console.log(`❌ Failed to preload: ${player.name}`);
        img.src = player.avatar;
    });
}
// Make functions globally available
window.handleAvatarLoad = handleAvatarLoad;
window.handleAvatarError = handleAvatarError;
window.updatePlayerAvatars = updatePlayerAvatars;
window.addPlayerToStats = addPlayerToStats;

// Initialize avatar preloading when page loads
document.addEventListener('DOMContentLoaded', () => {
    initRankingPage();
    
    // Preload avatars after a short delay
    setTimeout(preloadAvatars, 1000);
});

// Render player stats
function renderPlayerStats(category) {
    const container = document.getElementById('player-stats-container');
    if (!container) return;
    
    const stats = rankingData.playerStats[category] || [];
    const isPercentage = category === 'best-attackers';
    const statLabel = {
        'top-scorers': 'Total Points',
        'best-attackers': 'Attack Success',
        'best-blockers': 'Total Blocks',
        'best-setters': 'Total Assists'
    }[category] || 'Statistic';

    container.innerHTML = stats.map((player, index) => `
        <div class="player-stat-card fade-in ${player.isDVA ? 'dva-player' : ''}" data-player="${player.name}">
            <div class="stat-rank rank-${index + 1}">${index + 1}</div>
            ${createPlayerAvatar(player, index + 1)}
            <h4 class="player-name">${player.name}</h4>
            <div class="player-team">${player.team}</div>
            <div class="stat-value">${player.stat}${isPercentage ? '' : ''}</div>
            <div class="stat-label">${statLabel}</div>
        </div>
    `).join('');

    // Add click event listeners
    container.querySelectorAll('.player-stat-card').forEach(card => {
        card.addEventListener('click', () => {
            const playerName = card.dataset.player;
            handlePlayerClick(playerName);
        });
    });

    // Trigger fade in animation
    setTimeout(() => {
        container.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

// Handle team click
function handleTeamClick(teamName) {
    alert(`Viewing detailed stats for ${teamName}`);
    // In a real app, this would navigate to team detail page or show modal
}

// Handle player click
function handlePlayerClick(playerName) {
    alert(`Viewing detailed stats for ${playerName}`);
    // In a real app, this would navigate to player detail page or show modal
}

// Show loading state
function showLoadingState() {
    if (leagueTableBody) {
        leagueTableBody.innerHTML = `
            <tr>
                <td colspan="10" class="loading-content">
                    <i class="fas fa-spinner"></i>
                    <p>Loading standings...</p>
                </td>
            </tr>
        `;
    }
}

// Hide loading state
function hideLoadingState() {
    // Loading state is removed when table is re-rendered
}

// Update team performance cards with live data
function updateTeamPerformance() {
    const dvaMiddle = rankingData.leagueStandings.find(team => team.team === "DVA Middle");
    const dvaJunior = rankingData.leagueStandings.find(team => team.team === "DVA Junior");
    
    if (dvaMiddle) {
        // Update DVA Middle stats in real-time
        console.log('DVA Middle current position:', dvaMiddle.position);
    }
    
    if (dvaJunior) {
        // Update DVA Junior stats in real-time
        console.log('DVA Junior current position:', dvaJunior.position);
    }
}

// Export functions for team comparison
function compareTeams(team1, team2) {
    const teamData1 = rankingData.leagueStandings.find(team => team.team === team1);
    const teamData2 = rankingData.leagueStandings.find(team => team.team === team2);
    
    if (teamData1 && teamData2) {
        return {
            team1: teamData1,
            team2: teamData2,
            comparison: {
                positionDiff: teamData1.position - teamData2.position,
                pointsDiff: teamData1.points - teamData2.points,
                winRateDiff: (teamData1.wins / teamData1.played) - (teamData2.wins / teamData2.played)
            }
        };
    }
    
    return null;
}

// Get league position trend
function getPositionTrend(teamName, weeks = 5) {
    // In a real app, this would fetch historical position data
    // For demo, returning mock trend data
    const trends = {
        "DVA Middle": [3, 2, 2, 1, 2],
        "DVA Junior": [6, 5, 4, 5, 5]
    };
    
    return trends[teamName] || [];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initRankingPage();
});

// Export functions for testing or other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRankingPage,
        renderLeagueTable,
        renderPlayerStats,
        compareTeams,
        getPositionTrend,
        handleCategorySwitch,
        handleTableFilter
    };
}
// Dream Team data - Updated
const dreamTeamData = {
    champions: [
        {
            rank: 1,
            team: "BVC",
            logo: "images/ranking/dream-team/champions/BVC1.png",
            title: "Champion",
            finalScore: "2-1",
            record: "",
            tournament: "DVA Open Cup"
        },
        {
            rank: 2,
            team: "Văn Quán",
            logo: "images/ranking/dream-team/champions/van-quan.png",
            title: "Runner-up",
            finalScore: "1-2",
            record: "",
            tournament: "DVA Open Cup"
        },
        {
            rank: 3,
            team: "DVA Middle",
            logo: "images/ranking/dream-team/champions/DVA.png",
            title: "3rd Place",
            finalScore: "2-1",
            record: "",
            tournament: "DVA Open Cup"
        }
    ],
    awards: {
        'outside-hitters': [
            {
                name: "Michael Johnson",
                team: "DVA Middle",
                isDVA: true,
                avatar: "images/ranking/players/michael-johnson.jpg",
                stats: { attackPercent: "89.5%", points: 342 },
                award: "gold"
            },
            {
                name: "Alex Thunder",
                team: "Thunder Bolts",
                isDVA: false,
                avatar: "images/ranking/players/alex-thunder.jpg",
                stats: { attackPercent: "87.2%", points: 318 },
                award: "silver"
            }
        ],
        'middle-blockers': [
            {
                name: "Alex Rodriguez",
                team: "DVA Middle",
                isDVA: true,
                avatar: "images/ranking/players/alex-rodriguez.jpg",
                stats: { blocks: 156, blockPercent: "78.5%" },
                award: "gold"
            },
            {
                name: "Giant Mike",
                team: "Thunder Bolts",
                isDVA: false,
                avatar: "images/ranking/players/giant-mike.jpg",
                stats: { blocks: 142, blockPercent: "76.2%" },
                award: "silver"
            }
        ],
        'opposite-hitter': [
            {
                name: "Ryan Fire",
                team: "Phoenix Fire",
                isDVA: false,
                avatar: "images/ranking/players/ryan-fire.jpg",
                stats: { attackPercent: "85.8%", points: 289 },
                award: "gold"
            }
        ],
        'setter': [
            {
                name: "Hoàng Quốc Duy",
                team: "DVA Middle",
                isDVA: true,
                avatar: "images/ranking/players/hoang-quoc-duy.jpg",
                stats: { assists: 892, setPercent: "94.2%" },
                award: "gold"
            }
        ],
        'libero': [
            {
                name: "Libero Master",
                team: "Lightning Strikes",
                isDVA: false,
                avatar: "images/ranking/players/libero-master.jpg",
                stats: { digs: 456, digPercent: "92.8%" },
                award: "gold"
            }
        ],
        'mvp': [
            {
                name: "Hoàng Quốc Duy", // Changed from Libero Master to match your data
                team: "DVA Middle",
                isDVA: true,
                avatar: "images/ranking/players/hoang-quoc-duy.jpg", // Updated avatar
                stats: { overallRating: "9.2/10", impactScore: "98.5%" },
                award: "mvp"
            }
        ]
    }
};
function handleCategorySwitch(e) {
    const category = e.target.dataset.category;
    if (category !== currentCategory) {
        currentCategory = category;
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active content
        rankingContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${category}-content`).classList.add('active');
        
        // Load specific content based on category
        switch (category) {
            case 'league':
                renderLeagueTable();
                break;
            case 'player':
                renderPlayerStats('top-scorers');
                break;
            case 'dream-team':
                // Force re-render every time dream team is accessed
                setTimeout(() => {
                    renderDreamTeam();
                }, 100);
                break;
            case 'tournament':
                // Tournament data is static in HTML for this demo
                break;
            case 'season':
                // Season records are static in HTML for this demo
                break;
        }
    }
}

// Enhanced Render Dream Team content với dynamic rendering
function renderDreamTeam() {
    console.log('🏆 Rendering Dream Team content dynamically');
    
    // Always clear and re-render
    clearDreamTeamContent();
    
    // Render Championship Podium
    renderChampionshipPodium();
    
    // Render Dream Team Awards  
    renderDreamTeamAwards();
    
    // Add animations with delay to ensure content is rendered
    setTimeout(() => {
        animatePodiumCards();
        animateDreamTeamCards();
        setupDreamTeamInteractions();
    }, 200);
}
// Clear existing content before re-rendering
function clearDreamTeamContent() {
    const podiumContainer = document.querySelector('.podium-container');
    const dreamTeamGrid = document.querySelector('.dream-team-grid');
    
    if (podiumContainer) {
        podiumContainer.innerHTML = '<div class="loading">Loading champions...</div>';
    }
    
    if (dreamTeamGrid) {
        dreamTeamGrid.innerHTML = '<div class="loading">Loading awards...</div>';
    }
}
// Render Championship Podium dynamically
function renderChampionshipPodium() {
    const podiumContainer = document.querySelector('.podium-container');
    if (!podiumContainer) {
        console.error('❌ Podium container not found');
        return;
    }
    
    console.log('🏆 Rendering championship podium...');
    
    // Sort champions: 2nd, 1st, 3rd for podium display
    const sortedChampions = [
        dreamTeamData.champions.find(c => c.rank === 2), // Second place
        dreamTeamData.champions.find(c => c.rank === 1), // First place  
        dreamTeamData.champions.find(c => c.rank === 3)  // Third place
    ].filter(Boolean);
    
    if (sortedChampions.length === 0) {
        podiumContainer.innerHTML = '<div class="no-data">No championship data available</div>';
        return;
    }
    
    podiumContainer.innerHTML = sortedChampions.map((champion, index) => {
        const position = champion.rank === 1 ? 'first-place' : 
                        champion.rank === 2 ? 'second-place' : 'third-place';
        
        const crownClass = champion.rank === 1 ? 'champion' : '';
        const logoClass = champion.rank === 1 ? 'champion-logo' : '';
        const crownIcon = champion.rank === 1 ? 'fas fa-crown' : 'fas fa-medal';
        
        return `
            <div class="podium-card ${position}" data-rank="${champion.rank}">
                <div class="rank-crown ${crownClass}">
                    <i class="${crownIcon}"></i>
                    <span class="rank-number">${champion.rank}</span>
                </div>
                <div class="team-logo ${logoClass}">
                    <img src="${champion.logo}" alt="${champion.team}" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="logo-placeholder" style="display: none;">
                        <i class="fas fa-volleyball-ball"></i>
                    </div>
                </div>
                <h4 class="team-name">${champion.team}</h4>
                <div class="rank-title">${champion.title}</div>
                ${champion.rank === 1 ? `
                    <div class="champion-badge">
                        <i class="fas fa-trophy"></i>
                        <span>${champion.tournament} Winner</span>
                    </div>
                ` : ''}
                <div class="team-stats">
                    <div class="stat">
                        <span class="label">${champion.rank === 3 ? '3rd Place Game' : 'Final Score'}</span>
                        <span class="value">${champion.finalScore}</span>
                    </div>
                    ${champion.record ? `
                        <div class="stat">
                            <span class="label">Record</span>
                            <span class="value">${champion.record}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Championship podium rendered successfully');
}

// Render Dream Team Awards dynamically
function renderDreamTeamAwards() {
    const dreamTeamGrid = document.querySelector('.dream-team-grid');
    if (!dreamTeamGrid) {
        console.error('❌ Dream team grid not found');
        return;
    }
    
    console.log('🏅 Rendering dream team awards...');
    
    // Award categories configuration
    const awardCategories = [
        {
            key: 'outside-hitters',
            title: 'Best Outside Hitters',
            icon: 'fas fa-volleyball-ball',
            isMultiple: true
        },
        {
            key: 'middle-blockers', 
            title: 'Best Middle Blockers',
            icon: 'fas fa-shield-alt',
            isMultiple: true
        },
        {
            key: 'opposite-hitter',
            title: 'Best Opposite Hitter', 
            icon: 'fas fa-crosshairs',
            isMultiple: false
        },
        {
            key: 'setter',
            title: 'Best Setter',
            icon: 'fas fa-hands', 
            isMultiple: false
        },
        {
            key: 'libero',
            title: 'Best Libero',
            icon: 'fas fa-user-shield',
            isMultiple: false
        },
        {
            key: 'mvp',
            title: 'Most Valuable Player',
            icon: 'fas fa-star',
            isMultiple: false
        }
    ];
    
    dreamTeamGrid.innerHTML = awardCategories.map(category => {
        const awards = dreamTeamData.awards[category.key] || [];
        
        if (awards.length === 0) {
            return `
                <div class="award-category">
                    <h4 class="category-title">
                        <i class="${category.icon}"></i>
                        ${category.title}
                    </h4>
                    <div class="awards-group ${!category.isMultiple ? 'single-award' : ''}">
                        <div class="no-awards">No awards data available</div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="award-category" data-category="${category.key}">
                <h4 class="category-title">
                    <i class="${category.icon}"></i>
                    ${category.title}
                </h4>
                <div class="awards-group ${!category.isMultiple ? 'single-award' : ''}">
                    ${awards.map((player, index) => createPlayerAwardCard(player, index)).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Dream team awards rendered successfully');
}

// Create individual player award card
function createPlayerAwardCard(player, index) {
    const awardClass = player.award === 'mvp' ? 'mvp-award' : 
                      player.award === 'gold' ? 'gold-award' : 
                      player.award === 'silver' ? 'silver-award' : 'gold-award';
    
    const badgeIcon = player.award === 'mvp' ? 'fas fa-crown' : 'fas fa-medal';
    const badgeText = player.award === 'mvp' ? 'MVP' : 
                     player.award === 'gold' ? 'Gold' : 'Silver';
    
    const initials = getPlayerInitials(player.name);
    
    // Generate stats HTML based on what stats are available
    const statsHTML = generateStatsHTML(player.stats);
    
    return `
        <div class="dream-team-card ${awardClass}" data-player="${player.name}" data-award="${player.award}">
            <div class="award-badge ${player.award === 'mvp' ? 'mvp-badge' : ''}">
                <i class="${badgeIcon}"></i>
                <span>${badgeText}</span>
            </div>
            <div class="player-avatar-dream">
                <img src="${player.avatar}" alt="${player.name}" 
                     onerror="handleAvatarError(this, '${initials}')">
            </div>
            <h5 class="player-name">${player.name}</h5>
            <div class="player-team ${player.isDVA ? 'dva-team' : ''}">${player.team}</div>
            <div class="award-stats">
                ${statsHTML}
            </div>
        </div>
    `;
}

// Add debugging function to test data changes
function testDreamTeamUpdate() {
    console.log('🧪 Testing Dream Team update...');
    
    // Update MVP player name as example
    updatePlayerAward('mvp', 'Hoàng Quốc Duy', {
        name: 'Hoàng Quốc Duy - Updated',
        stats: { overallRating: "9.8/10", impactScore: "99.9%" }
    });
    
    console.log('✅ Test update completed');
}

// Add CSS for loading and no-data states
const additionalStyles = `
<style>
.loading, .no-data, .no-awards {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
}

.loading i {
    font-size: 2rem;
    color: #e74c3c;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
    display: block;
}

.no-data, .no-awards {
    background: #f8f9fa;
    border-radius: 10px;
    border: 2px dashed #ddd;
}
</style>
`;

// Add styles to head if not already present
if (!document.getElementById('dream-team-dynamic-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'dream-team-dynamic-styles';
    styleElement.innerHTML = additionalStyles;
    document.head.appendChild(styleElement);
}

// Generate stats HTML based on available stats
function generateStatsHTML(stats) {
    const statMappings = {
        attackPercent: 'Attack %',
        points: 'Points',
        blocks: 'Blocks', 
        blockPercent: 'Block %',
        assists: 'Assists',
        setPercent: 'Set %',
        digs: 'Digs',
        digPercent: 'Dig %',
        overallRating: 'Overall Rating',
        impactScore: 'Impact Score'
    };
    
    return Object.entries(stats).map(([key, value]) => {
        const label = statMappings[key] || key;
        return `
            <div class="stat">
                <span class="label">${label}</span>
                <span class="value">${value}</span>
            </div>
        `;
    }).join('');
}

// Update Dream Team data function
function updateDreamTeamData(newData) {
    // Merge new data with existing data
    if (newData.champions) {
        dreamTeamData.champions = newData.champions;
    }
    
    if (newData.awards) {
        Object.keys(newData.awards).forEach(category => {
            dreamTeamData.awards[category] = newData.awards[category];
        });
    }
    
    // Re-render if currently viewing dream team
    if (currentCategory === 'dream-team') {
        renderDreamTeam();
    }
    
    console.log('🔄 Dream Team data updated and re-rendered');
}

// Add new award category
function addAwardCategory(categoryKey, categoryData) {
    dreamTeamData.awards[categoryKey] = categoryData;
    
    // Re-render if currently viewing dream team
    if (currentCategory === 'dream-team') {
        renderDreamTeam();
    }
    
    console.log(`➕ Added new award category: ${categoryKey}`);
}

// Update specific player award
function updatePlayerAward(categoryKey, playerName, newData) {
    const category = dreamTeamData.awards[categoryKey];
    if (!category) return false;
    
    const playerIndex = category.findIndex(p => p.name === playerName);
    if (playerIndex === -1) return false;
    
    // Merge new data with existing player data
    dreamTeamData.awards[categoryKey][playerIndex] = {
        ...dreamTeamData.awards[categoryKey][playerIndex],
        ...newData
    };
    
    // Re-render if currently viewing dream team
    if (currentCategory === 'dream-team') {
        renderDreamTeam();
    }
    
    console.log(`🔄 Updated ${playerName} in ${categoryKey}`);
    return true;
}

// Export new functions
window.updateDreamTeamData = updateDreamTeamData;
window.addAwardCategory = addAwardCategory;
window.updatePlayerAward = updatePlayerAward;
window.testDreamTeamUpdate = testDreamTeamUpdate;
console.log('🔄 Dynamic Dream Team system updated - HTML content will now sync with JS data');
// Update initialization to use dynamic rendering
document.addEventListener('DOMContentLoaded', () => {
    initRankingPage();
    
    // Initialize dream team rendering if it's the active category
    if (currentCategory === 'dream-team') {
        setTimeout(renderDreamTeam, 100);
    }
});

console.log('🏆 Dynamic Dream Team rendering system loaded');
