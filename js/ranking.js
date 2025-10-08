// Ranking page functionality

// Sample data - in real app, this would come from APIs
const rankingData = {
    leagueStandings: [
        {
            position: 1,
            team: "Thunder Bolts",
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
            team: "DVA Middle",
            played: 18,
            wins: 14,
            losses: 4,
            setsFor: 45,
            setsAgainst: 22,
            setDiff: 23,
            points: 42,
            form: ['W', 'W', 'L', 'W', 'W'],
            category: 'champions',
            isDVA: true
        },
        {
            position: 3,
            team: "Lightning Strikes",
            played: 19,
            wins: 13,
            losses: 6,
            setsFor: 42,
            setsAgainst: 28,
            setDiff: 14,
            points: 39,
            form: ['L', 'W', 'W', 'W', 'L'],
            category: 'playoffs'
        },
        {
            position: 4,
            team: "Wave Riders",
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
            team: "DVA Junior",
            played: 16,
            wins: 9,
            losses: 7,
            setsFor: 32,
            setsAgainst: 28,
            setDiff: 4,
            points: 27,
            form: ['W', 'L', 'W', 'L', 'W'],
            category: 'playoffs',
            isDVA: true
        },
        {
            position: 6,
            team: "Storm Eagles",
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
            team: "Cyber Wolves",
            played: 17,
            wins: 7,
            losses: 10,
            setsFor: 28,
            setsAgainst: 36,
            setDiff: -8,
            points: 21,
            form: ['W', 'L', 'L', 'W', 'L'],
            category: 'mid-table'
        },
        {
            position: 8,
            team: "Phoenix Fire",
            played: 18,
            wins: 6,
            losses: 12,
            setsFor: 25,
            setsAgainst: 42,
            setDiff: -17,
            points: 18,
            form: ['L', 'L', 'W', 'L', 'L'],
            category: 'mid-table'
        },
        {
            position: 9,
            team: "Ice Bears",
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
            team: "Desert Scorpions",
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
            { name: "Alex Rodriguez", team: "DVA Middle", stat: 156, isDVA: true },
            { name: "Giant Mike", team: "Thunder Bolts", stat: 142 },
            { name: "Wall Steve", team: "Lightning Strikes", stat: 138 },
            { name: "Ethan Lee", team: "DVA Junior", stat: 125, isDVA: true },
            { name: "Block King", team: "Storm Eagles", stat: 119 }
        ],
        'best-setters': [
            { name: "David Chen", team: "DVA Middle", stat: 892, isDVA: true },
            { name: "Set Master", team: "Thunder Bolts", stat: 856 },
            { name: "Quick Hands", team: "Wave Riders", stat: 834 },
            { name: "Sam Davis", team: "DVA Junior", stat: 789, isDVA: true },
            { name: "Assist Pro", team: "Lightning Strikes", stat: 767 }
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
            <div class="player-avatar-small">
                ${player.name.split(' ').map(n => n[0]).join('')}
            </div>
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
