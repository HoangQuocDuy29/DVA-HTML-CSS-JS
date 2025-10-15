// Ranking page functionality - Load ALL Images Immediately
// Tối ưu để hiển thị TẤT CẢ ảnh ngay lập tức

// Sample data - GIỮ NGUYÊN TOÀN BỘ
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
            category: 'champions'
        },
        {
            position: 3,
            team: "AVC",
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
            team: "Sharks",
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
            team: "DVA Middle",
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
            category: 'playoffs'
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
            { name: "Đặng Văn Huy", team: "BVC", stat: 350, avatar: "images/ranking/top-scorers/VanHuy.webp" },
            { name: "Hoàng Minh Hiếu", team: "DVA Middle", stat: 342, isDVA: true, avatar: "images/ranking/top-scorers/HoangMinhHieuu.webp" },
            { name: "Nguyễn Đức Hoàng", team: "DVA Middle", stat: 318, isDVA: true, avatar: "images/ranking/top-scorers/NguyenDucHoang.webp" },
            { name: "Nguyễn Ngọc Bảo", team: "DVA Middle", stat: 287, isDVA: true, avatar: "images/ranking/top-scorers/NguyenNgocBao.webp" },
            { name: "Phạm Huy Giáp", team: "Sharks", stat: 280, avatar: "images/ranking/top-scorers/PhamHuyGiap.webp" },
            { name: "Nguyễn Văn Phương", team: "BVC", stat: 276, avatar: "images/ranking/top-scorers/VanPhuong.webp" },
            { name: "Bùi Ngọc Chiến", team: "DVA Middle", stat: 260, isDVA: true, avatar: "images/ranking/top-scorers/BuiNgocChien.webp" },
            { name: "Lê Quang Duy", team: "BUV", stat: 256, avatar: "images/ranking/top-scorers/LeDuyy.webp" },
            { name: "Lê Xuân Khánh", team: "AVC", stat: 276, avatar: "images/ranking/top-scorers/LeXuanKhanhh.webp" },
            { name: "Ngô Thành Công", team: "Nippon", stat: 270, avatar: "images/ranking/top-scorers/ThanhCong.webp" },
            { name: "Hà Minh Huy", team: "Nippon", stat: 269, avatar: "images/ranking/top-scorers/Pho.webp" },
            { name: "Lê Hải Nam", team: "DVA Middle", stat: 265, avatar: "images/ranking/top-scorers/HaiNam.webp" }
        ],
        'best-attackers': [
            { name: "Bùi Ngọc Chiến", team: "DVA Middle", stat: "89.5%", isDVA: true, avatar: "images/ranking/best-attacker/BuiNgocChien.webp" },
            { name: "Nguyễn Quang Hưng", team: "DVA Middle", stat: "87.2%", avatar: "images/ranking/best-attacker/QuangHung.webp" },
            { name: "Phan Tiến Nam", team: "DVA Middle", stat: "85.8%", avatar: "images/ranking/best-attacker/PhanTienNam.webp" },
            { name: "Phạm Anh Quân", team: "DVA Middle", stat: "84.3%", isDVA: true, avatar: "images/ranking/best-attacker/PhamAnhQuan.webp" },
            { name: "Cao Minh Chiến", team: "DVA Middle", stat: "82.7%", avatar: "images/ranking/best-attacker/CaoMinhChien.webp" },
            { name: "Hồ Nam Giang", team: "DVA Middle", stat: "81.7%", avatar: "images/ranking/best-attacker/HoNamGiang.webp" },
            { name: "Nguyễn Kim Phong", team: "BVC", stat: "80.7%", avatar: "images/ranking/best-attacker/Phong.webp" },
            { name: "Đăng Hải", team: "BVC", stat: "83.5%", avatar: "images/ranking/best-attacker/DangHai.webp" }
        ],
        'best-blockers': [
            { name: "Đoàn Nam Cường", team: "DVA Middle", stat: 156, isDVA: true, avatar: "images/ranking/best-blocker/DoanNamCuong.webp" },
            { name: "Nguyễn Văn Phương", team: "BVC", stat: 142, isDVA: true, avatar: "images/ranking/best-blocker/VanPhuong.webp" },
            { name: "Nguyễn Minh Tuấn Anh", team: "DVA Middle", stat: 138, isDVA: true, avatar: "images/ranking/best-blocker/TuanAnh.webp" },
            { name: "Dương Văn Đại", team: "DVA Middle", stat: 125, isDVA: true, avatar: "images/ranking/best-blocker/DuongVanDai.webp" },
            { name: "Lê Hải Dương", team: "DVA Middle", stat: 119, isDVA: true, avatar: "images/ranking/best-blocker/LeHaiDuong.webp" },
            { name: "Đặng Đình Hưởng", team: "AVC", stat: 110, isDVA: true, avatar: "images/ranking/best-blocker/DinhHuong.webp" }
        ],
        'best-setters': [
            { name: "Hoàng Quốc Duy", team: "DVA Middle", stat: 892, isDVA: true, avatar: "images/ranking/best-setter/QuocDuy.webp" },
            { name: "Nguyễn Đức Hoàng", team: "DVA Middle", stat: 870, isDVA: true, avatar: "images/ranking/best-setter/NguyenDucHoang.webp" },
            { name: "Hoàng Minh Hiếu", team: "DVA Middle", stat: 856, isDVA: true, avatar: "images/ranking/best-setter/HoangMinhHieuu.webp" },
            { name: "Trịnh Duy Đông", team: "DVA Middle", stat: 834, isDVA: true, avatar: "images/ranking/best-setter/DuyDong.webp" },
            { name: "Nguyễn Ngọc Bảo", team: "DVA Middle", stat: 789, isDVA: true, avatar: "images/ranking/best-setter/Bao.webp" },
            { name: "Hoàng Đình Trọng", team: "DVA Junior", stat: 767, isDVA: true, avatar: "images/ranking/best-setter/DinhTrong.webp" }
        ]
    }
};

// Dream Team data - GIỮ NGUYÊN
const dreamTeamData = {
    champions: [
        {
            rank: 1,
            team: "BVC",
            logo: "images/ranking/dream-team/champions/BVC.webp",
            title: "Champion",
            finalScore: "2-1",
            record: "",
            tournament: "DVA Open Cup"
        },
        {
            rank: 2,
            team: "Văn Quán",
            logo: "images/ranking/dream-team/champions/van-quan.webp",
            title: "Runner-up",
            finalScore: "1-2",
            record: "",
            tournament: "DVA Open Cup"
        },
        {
            rank: 3,
            team: "AVC",
            logo: "images/ranking/dream-team/champions/AVC.webp",
            title: "3rd Place",
            finalScore: "2-0",
            record: "",
            tournament: "DVA Open Cup"
        }
    ],
    awards: {
        'outside-hitters': [
            {
                name: "Kim Phong",
                team: "BVC",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/Phong.webp",
                stats: { attackPercent: "89.5%", points: 342 },
                award: "gold"
            },
            {
                name: "Cao Cường",
                team: "Văn Quán",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/CaoCuong.webp",
                stats: { attackPercent: "87.2%", points: 318 },
                award: "silver"
            }
        ],
        'middle-blockers': [
            {
                name: "Văn Phương",
                team: "BVC",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/VanPhuong.webp",
                stats: { blocks: 156, blockPercent: "78.5%" },
                award: "gold"
            },
            {
                name: "Đình Hưởng",
                team: "AVC",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/DinhHuong.webp",
                stats: { blocks: 142, blockPercent: "76.2%" },
                award: "silver"
            }
        ],
        'opposite-hitter': [
            {
                name: "Đình Khang",
                team: "Văn Quán",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/DinhKhang.webp",
                stats: { attackPercent: "85.8%", points: 289 },
                award: "gold"
            }
        ],
        'setter': [
            {
                name: "Văn Huy",
                team: "BVC",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/VanHuy.webp",
                stats: { assists: 892, setPercent: "94.2%" },
                award: "gold"
            }
        ],
        'libero': [
            {
                name: "Duy Phan",
                team: "Sharks",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/DuyPhan.webp",
                stats: { digs: 456, digPercent: "92.8%" },
                award: "gold"
            }
        ],
        'mvp': [
            {
                name: "Đăng Hải",
                team: "BVC",
                isDVA: false,
                avatar: "images/ranking/dream-team/dream-team-awards/DangHai.webp",
                stats: { overallRating: "9.2/10", impactScore: "98.5%" },
                award: "mvp"
            }
        ]
    }
};

// Image Preloader for ALL ranking images
class RankingImagePreloader {
    constructor() {
        this.loadedImages = new Set();
        this.totalImages = 0;
        this.loadedCount = 0;
    }

    // Preload ALL ranking images immediately
    async preloadAllImages() {
        console.log('🖼️ Starting to load ALL ranking images immediately...');

        // Collect all image URLs
        const allImageUrls = this.collectAllImageUrls();
        this.totalImages = allImageUrls.length;

        console.log(`🖼️ Found ${this.totalImages} ranking images to load...`);

        const promises = allImageUrls.map(url => this.preloadSingle(url));
        
        try {
            await Promise.allSettled(promises);
            console.log(`✅ Ranking image loading completed: ${this.loadedCount}/${this.totalImages} successful`);
        } catch (error) {
            console.warn('⚠️ Some ranking images failed to load');
        }
    }

    // Collect all image URLs from ranking data
    collectAllImageUrls() {
        const imageUrls = [];

        // Player stats avatars
        Object.values(rankingData.playerStats).forEach(category => {
            category.forEach(player => {
                if (player.avatar) {
                    imageUrls.push(player.avatar);
                }
            });
        });

        // Dream team champion logos
        dreamTeamData.champions.forEach(champion => {
            if (champion.logo) {
                imageUrls.push(champion.logo);
            }
        });

        // Dream team award avatars
        Object.values(dreamTeamData.awards).forEach(category => {
            category.forEach(player => {
                if (player.avatar) {
                    imageUrls.push(player.avatar);
                }
            });
        });

        // Remove duplicates
        return [...new Set(imageUrls)];
    }

    // Load single image
    preloadSingle(url) {
        return new Promise((resolve) => {
            if (this.loadedImages.has(url)) {
                resolve();
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.loadedImages.add(url);
                this.loadedCount++;
                console.log(`✅ Loaded: ${url} (${this.loadedCount}/${this.totalImages})`);
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
const rankingImagePreloader = new RankingImagePreloader();

// State management - GIỮ NGUYÊN
let currentCategory = 'league';
let currentTableFilter = 'all';
let currentTableView = 'detailed';
let currentSortColumn = 'position';
let currentSortDirection = 'asc';

// DOM elements - GIỮ NGUYÊN
let categoryButtons, rankingContents, seasonSelect;
let leagueTableBody, filterButtons, viewButtons, sortableHeaders;

// Enhanced initialization with image preloading
async function initRankingPage() {
    console.log('🚀 Initializing ranking page with ALL image preloading...');

    // Get DOM elements - GIỮ NGUYÊN
    categoryButtons = document.querySelectorAll('.category-btn');
    rankingContents = document.querySelectorAll('.ranking-content');
    seasonSelect = document.getElementById('season-select');
    leagueTableBody = document.getElementById('league-table-body');
    filterButtons = document.querySelectorAll('.filter-btn');
    viewButtons = document.querySelectorAll('.view-btn');
    sortableHeaders = document.querySelectorAll('.sortable');

    // Set up event listeners - GIỮ NGUYÊN
    setupEventListeners();
    
    // Preload ALL images immediately
    await rankingImagePreloader.preloadAllImages();
    
    // Initial render - GIỮ NGUYÊN
    renderLeagueTable();
    renderPlayerStats('top-scorers');

    console.log('✅ Ranking page fully loaded with ALL images');
}

// All event listeners - GIỮ NGUYÊN
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

// Enhanced category switch handler
function handleCategorySwitch(e) {
    const category = e.target.dataset.category;
    if (category !== currentCategory) {
        currentCategory = category;
        
        // Update active button - GIỮ NGUYÊN
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active content - GIỮ NGUYÊN
        rankingContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${category}-content`).classList.add('active');
        
        // Load specific content based on category - GIỮ NGUYÊN
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

// All other handler functions - GIỮ NGUYÊN
function handleSeasonChange(e) {
    const season = e.target.value;
    console.log(`Loading data for season: ${season}`);
    
    showLoadingState();
    
    setTimeout(() => {
        renderLeagueTable();
        hideLoadingState();
    }, 1000);
}

function handleTableFilter(e) {
    const filter = e.target.dataset.filter;
    if (filter !== currentTableFilter) {
        currentTableFilter = filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderLeagueTable();
    }
}

function handleViewToggle(e) {
    const view = e.target.dataset.view;
    if (view !== currentTableView) {
        currentTableView = view;
        
        viewButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderLeagueTable();
    }
}

function handleSort(e) {
    const column = e.target.dataset.sort;
    
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    sortableHeaders.forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    
    e.target.classList.add(`sort-${currentSortDirection}`);
    
    renderLeagueTable();
}

function handleStatsCategory(e) {
    const category = e.target.dataset.stats;
    
    document.querySelectorAll('.stats-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    renderPlayerStats(category);
}

function handleTournamentSwitch(e) {
    const tournament = e.target.dataset.tournament;
    
    document.querySelectorAll('.tournament-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    console.log(`Switching to tournament: ${tournament}`);
}

// Data manipulation functions - GIỮ NGUYÊN
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

function sortTableData(data) {
    return [...data].sort((a, b) => {
        let aValue = a[currentSortColumn];
        let bValue = b[currentSortColumn];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return currentSortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return currentSortDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        return 0;
    });
}

// League table render - GIỮ NGUYÊN
function renderLeagueTable() {
    if (!leagueTableBody) return;
    
    let data = rankingData.leagueStandings;
    
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

    document.querySelectorAll('#league-table-body tr').forEach(row => {
        row.addEventListener('click', () => {
            const teamName = row.dataset.team;
            handleTeamClick(teamName);
        });
    });
}

// Enhanced player avatar creation - LOAD IMMEDIATELY
function createPlayerAvatar(player, rank) {
    const avatarClass = `player-avatar-small rank-${rank}-avatar`;
    const initials = getPlayerInitials(player.name);
    
    // Always load image immediately, no lazy loading
    if (player.avatar) {
        return `
            <div class="${avatarClass}" data-player="${player.name}">
                <img src="${player.avatar}" 
                     alt="${player.name}" 
                     class="player-avatar-img loaded"
                     onload="handleAvatarLoad(this)"
                     onerror="handleAvatarError(this, '${initials}')">
            </div>
        `;
    } else {
        return `
            <div class="${avatarClass}" data-player="${player.name}">
                <span class="avatar-initials">${initials}</span>
            </div>
        `;
    }
}

// Enhanced player stats rendering - NO LAZY LOADING
function renderPlayerStats(category) {
    const container = document.getElementById('player-stats-container');
    if (!container) return;
    
    console.log(`🎨 Rendering ${category} with ALL images immediately...`);
    
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
    }, 50);
}

// Enhanced Dream Team rendering - LOAD ALL IMAGES IMMEDIATELY
function renderDreamTeam() {
    console.log('🏆 Rendering Dream Team with ALL images immediately...');
    
    clearDreamTeamContent();
    
    renderChampionshipPodium();
    renderDreamTeamAwards();
    
    setTimeout(() => {
        animatePodiumCards();
        animateDreamTeamCards();
        setupDreamTeamInteractions();
    }, 100);
}

// Enhanced championship podium - IMMEDIATE IMAGE LOADING
function renderChampionshipPodium() {
    const podiumContainer = document.querySelector('.podium-container');
    if (!podiumContainer) {
        console.error('❌ Podium container not found');
        return;
    }
    
    console.log('🏆 Rendering championship podium with immediate image loading...');
    
    const sortedChampions = [
        dreamTeamData.champions.find(c => c.rank === 2),
        dreamTeamData.champions.find(c => c.rank === 1),
        dreamTeamData.champions.find(c => c.rank === 3)
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
                    <img src="${champion.logo}" 
                         alt="${champion.team}" 
                         class="team-logo-img loaded"
                         onload="this.classList.add('loaded')"
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
    
    console.log('✅ Championship podium rendered with immediate loading');
}

// Enhanced dream team awards - IMMEDIATE IMAGE LOADING
function renderDreamTeamAwards() {
    const dreamTeamGrid = document.querySelector('.dream-team-grid');
    if (!dreamTeamGrid) {
        console.error('❌ Dream team grid not found');
        return;
    }
    
    console.log('🏅 Rendering dream team awards with immediate image loading...');
    
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
    
    console.log('✅ Dream team awards rendered with immediate loading');
}

// Enhanced player award card - IMMEDIATE IMAGE LOADING
function createPlayerAwardCard(player, index) {
    const awardClass = player.award === 'mvp' ? 'mvp-award' : 
                      player.award === 'gold' ? 'gold-award' : 
                      player.award === 'silver' ? 'silver-award' : 'gold-award';
    
    const badgeIcon = player.award === 'mvp' ? 'fas fa-crown' : 'fas fa-medal';
    const badgeText = player.award === 'mvp' ? 'MVP' : 
                     player.award === 'gold' ? 'Gold' : 'Silver';
    
    const initials = getPlayerInitials(player.name);
    const statsHTML = generateStatsHTML(player.stats);
    
    return `
        <div class="dream-team-card ${awardClass}" data-player="${player.name}" data-award="${player.award}">
            <div class="award-badge ${player.award === 'mvp' ? 'mvp-badge' : ''}">
                <i class="${badgeIcon}"></i>
                <span>${badgeText}</span>
            </div>
            <div class="player-avatar-dream">
                <img src="${player.avatar}" 
                     alt="${player.name}" 
                     class="dream-team-avatar loaded"
                     onload="this.classList.add('loaded')"
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

// All utility functions - GIỮ NGUYÊN
function getPlayerInitials(fullName) {
    return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
}

function handleAvatarLoad(imgElement) {
    const avatarContainer = imgElement.parentElement;
    avatarContainer.classList.remove('loading', 'error');
    
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.style.opacity = '1';
    }, 50);
    
    console.log('✅ Avatar loaded:', imgElement.alt);
}

function handleAvatarError(imgElement, initials) {
    const avatarContainer = imgElement.parentElement;
    const playerName = imgElement.alt;
    
    console.log('❌ Avatar failed to load for:', playerName);
    
    imgElement.remove();
    
    avatarContainer.classList.add('error');
    avatarContainer.innerHTML = `<span class="avatar-initials">${initials}</span>`;
    
    console.log(`🔄 Fallback to initials "${initials}" for ${playerName}`);
}

// All remaining functions - GIỮ NGUYÊN
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

function animatePodiumCards() {
    const podiumCards = document.querySelectorAll('.podium-card');
    
    podiumCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateDreamTeamCards() {
    const dreamCards = document.querySelectorAll('.dream-team-card');
    
    dreamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100 + 500);
    });
}

function setupDreamTeamInteractions() {
    document.querySelectorAll('.podium-card').forEach(card => {
        card.addEventListener('click', handleTeamCardClick);
    });
    
    document.querySelectorAll('.dream-team-card').forEach(card => {
        card.addEventListener('click', handleDreamTeamCardClick);
    });
    
    document.querySelectorAll('.award-badge').forEach(badge => {
        badge.addEventListener('mouseenter', handleAwardHover);
    });
}

function handleTeamCardClick(e) {
    const teamName = e.currentTarget.querySelector('.team-name').textContent;
    console.log(`🏆 Viewing team details: ${teamName}`);
    showTeamDetailsModal(teamName);
}

function handleDreamTeamCardClick(e) {
    const playerName = e.currentTarget.querySelector('.player-name').textContent;
    console.log(`⭐ Viewing player award details: ${playerName}`);
    showPlayerAwardModal(playerName);
}

function handleAwardHover(e) {
    const badge = e.currentTarget;
    const card = badge.closest('.dream-team-card');
    
    card.style.boxShadow = '0 20px 40px rgba(243, 156, 18, 0.3)';
    
    setTimeout(() => {
        card.style.boxShadow = '';
    }, 2000);
}

function showTeamDetailsModal(teamName) {
    alert(`🏆 ${teamName} Tournament Performance:\n\n• Detailed match results\n• Player statistics\n• Tournament journey\n• Awards won`);
}

function showPlayerAwardModal(playerName) {
    alert(`⭐ ${playerName} Award Details:\n\n• Tournament performance\n• Key statistics\n• Match highlights\n• Award criteria`);
}

// Data update functions - GIỮ NGUYÊN
function updatePlayerAvatars(updates) {
    Object.keys(updates).forEach(playerName => {
        const avatarPath = updates[playerName];
        
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
    
    if (currentCategory === 'player') {
        const activeStatsBtn = document.querySelector('.stats-btn.active');
        if (activeStatsBtn) {
            const currentStatsCategory = activeStatsBtn.dataset.stats;
            renderPlayerStats(currentStatsCategory);
        }
    }
}

function updateDreamTeamData(newData) {
    if (newData.champions) {
        dreamTeamData.champions = newData.champions;
    }
    
    if (newData.awards) {
        Object.keys(newData.awards).forEach(category => {
            dreamTeamData.awards[category] = newData.awards[category];
        });
    }
    
    if (currentCategory === 'dream-team') {
        renderDreamTeam();
    }
    
    console.log('🔄 Dream Team data updated and re-rendered');
}

function handleTeamClick(teamName) {
    alert(`Viewing detailed stats for ${teamName}`);
}

function handlePlayerClick(playerName) {
    alert(`Viewing detailed stats for ${playerName}`);
}

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

function hideLoadingState() {
    // Loading state is removed when table is re-rendered
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

// Enhanced initialization with ALL image preloading
document.addEventListener('DOMContentLoaded', async () => {
    console.log('⚡ Starting ranking page with ALL image preloading...');
    
    // Register service worker
    registerServiceWorker();
    
    // Initialize page and preload ALL images
    await initRankingPage();
    
    console.log('✅ ALL ranking images and content loaded successfully');
});

// Global function exports - GIỮ NGUYÊN
window.handleAvatarLoad = handleAvatarLoad;
window.handleAvatarError = handleAvatarError;
window.updatePlayerAvatars = updatePlayerAvatars;
window.updateDreamTeamData = updateDreamTeamData;

// Export for testing - GIỮ NGUYÊN
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRankingPage,
        renderLeagueTable,
        renderPlayerStats,
        renderDreamTeam,
        handleCategorySwitch,
        handleTableFilter
    };
}

console.log('🚀 Optimized Ranking module loaded - ALL images will load immediately');
