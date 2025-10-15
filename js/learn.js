// Learn page functionality

// Sample coaches data - in real app, this would come from API
const coachesData = [
    {
        id: 1,
        name: "Trần Hà Linh",
        title: "Head Coach",
        avatar: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=MR",
        specialties: ["Technical Skills", "Team Strategy", "Youth Development"],
        experience: "12 years coaching experience",
        rating: 4.9,
        bio: "Maria is a former national team player with over 12 years of coaching experience. She specializes in developing young talent and has coached teams to multiple championship titles. Her passion for volleyball and dedication to her students makes her an exceptional mentor.",
        achievements: [
            "Former National Team Player (2008-2014)",
            "Led 5 teams to championship titles",
            "Certified Level IV Volleyball Coach",
            "Youth Development Specialist Award 2023"
        ]
    },
    {
        id: 2,
        name: "Trịnh Anh Thắng",
        title: "Skills Development Coach",
        avatar: "https://via.placeholder.com/300x300/3498db/ffffff?text=JW",
        specialties: ["Attack Training", "Blocking Technique", "Physical Conditioning"],
        experience: "8 years coaching experience",
        rating: 4.8,
        bio: "James brings elite-level experience as a former professional player. His expertise in attack techniques and physical conditioning has helped numerous players reach their potential. He's known for his analytical approach to the game.",
        achievements: [
            "Professional Player (2012-2018)",
            "Attack Technique Specialist",
            "Certified Strength & Conditioning Coach",
            "Developed 15+ scholarship recipients"
        ]
    },
    {
        id: 3,
        name: "Ngô Thành Công",
        title: "Development Coach",
        avatar: "https://via.placeholder.com/300x300/9b59b6/ffffff?text=SK",
        specialties: ["Beginner Training", "Basic Fundamentals", "Youth Motivation"],
        experience: "6 years coaching experience",
        rating: 4.9,
        bio: "Sarah specializes in working with young athletes and beginners. Her patient and encouraging approach helps new players build confidence while mastering fundamental skills. She's particularly gifted at making volleyball fun and accessible.",
        achievements: [
            "Youth Coach of the Year 2024",
            "Specialized in Ages 8-16 Training",
            "Child Psychology Certification",
            "100+ beginner students trained"
        ]
    },
    {
        id: 4,
        name: "Nguyễn Linh Chi",
        title: "Specialist Coach",
        avatar: "images\learn\Chi.png",
        specialties: ["Defensive Systems", "Libero Training", "Reception Skills"],
        experience: "10 years coaching experience",
        rating: 4.7,
        bio: "Alex is renowned for his defensive strategies and libero training programs. His systematic approach to defense has transformed many teams' performance. He focuses on reading the game and anticipation skills.",
        achievements: [
            "Former Professional Libero",
            "Defensive Systems Expert",
            "10 Years Club Coaching",
            "National Team Assistant Coach (2020-2022)"
        ]
    }
];

// State management
let currentScheduleDay = 'weekdays';

// DOM elements
let coachesContainer, coachModal, enrollmentModal;
let scheduleTabButtons, scheduleGrids;
let enrollmentForm, programInput;

// Initialize learn page
function initLearnPage() {
    // Get DOM elements
    coachesContainer = document.getElementById('coaches-container');
    coachModal = document.getElementById('coachModal');
    enrollmentModal = document.getElementById('enrollmentModal');
    scheduleTabButtons = document.querySelectorAll('.schedule-tab');
    scheduleGrids = document.querySelectorAll('.schedule-grid');
    enrollmentForm = document.getElementById('enrollmentForm');
    programInput = document.getElementById('program');

    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderCoaches();
}

// Set up all event listeners
function setupEventListeners() {
    // Schedule tabs
    scheduleTabButtons.forEach(button => {
        button.addEventListener('click', handleScheduleTab);
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Modal background click to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Enrollment form
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentSubmit);
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Handle schedule tab switching
function handleScheduleTab(e) {
    const day = e.target.dataset.day;
    if (day !== currentScheduleDay) {
        currentScheduleDay = day;
        
        // Update active tab
        scheduleTabButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active schedule grid
        scheduleGrids.forEach(grid => grid.classList.remove('active'));
        document.getElementById(`${day}-schedule`).classList.add('active');
    }
}

// Render coaches grid
function renderCoaches() {
    if (!coachesContainer) return;
    
    // Show loading state
    coachesContainer.innerHTML = `
        <div class="loading-coaches">
            <div class="loading-spinner"></div>
            <p>Loading our expert coaches...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        coachesContainer.innerHTML = coachesData.map(coach => `
            <div class="coach-card fade-in" data-coach-id="${coach.id}">
                <div class="coach-avatar">
                    <img src="${coach.avatar}" 
                         alt="${coach.name}"
                         class="coach-image"
                         loading="eager"
                         decoding="async"
                         crossorigin="anonymous"
                         referrerpolicy="no-referrer"
                         onerror="handleCoachImageError(this, '${coach.name}');">
                    <div class="placeholder" style="display: none;">
                        <span>${coach.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                </div>
                <div class="coach-info">
                    <h4 class="coach-name">${coach.name}</h4>
                    <div class="coach-title">${coach.title}</div>
                    <div class="coach-specialties">
                        ${coach.specialties.map(specialty => `
                            <span class="specialty-tag">${specialty}</span>
                        `).join('')}
                    </div>
                    <div class="coach-experience">
                        <i class="fas fa-clock"></i> ${coach.experience}
                    </div>
                    <div class="coach-rating">
                        <div class="stars">
                            ${generateStars(coach.rating)}
                        </div>
                        <span class="rating-text">${coach.rating}/5.0</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click event listeners
        coachesContainer.querySelectorAll('.coach-card').forEach(card => {
            card.addEventListener('click', () => {
                const coachId = parseInt(card.dataset.coachId);
                openCoachModal(coachId);
            });
        });
        
        // Trigger fade in animation
        setTimeout(() => {
            coachesContainer.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
        
    }, 800); // Reduced loading time
}
// ✅ ENHANCED IMAGE ERROR HANDLER
function handleCoachImageError(img, coachName) {
    console.warn(`❌ Failed to load coach image: ${img.src}`);
    
    // Hide broken image, show placeholder
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('placeholder')) {
        placeholder.style.display = 'flex';
        // Update initials
        const span = placeholder.querySelector('span');
        if (span) {
            span.textContent = coachName.split(' ').map(n => n[0]).join('');
        }
    }
}
// ✅ BACKUP ALTERNATIVE - Use different image services
const alternativeImageServices = [
    'https://placehold.co/300x300/{color}/ffffff?text={initials}&font=roboto',
    'https://dummyimage.com/300x300/{color}/ffffff?text={initials}',
    'https://ui-avatars.com/api/?name={name}&size=300&background={color}&color=ffffff&format=png'
];
function generateBackupAvatar(name, color) {
    const initials = name.split(' ').map(n => n[0]).join('');
    const colorCode = color.replace('#', '');
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=300&background=${colorCode}&color=ffffff&format=png&rounded=true`;
}
// Enhanced coaches data with backup avatars
const enhancedCoachesData = coachesData.map(coach => ({
    ...coach,
    backupAvatar: generateBackupAvatar(coach.name, getRandomColor())
}));

function getRandomColor() {
    const colors = ['e74c3c', '3498db', '9b59b6', '27ae60', 'f39c12', '2c3e50'];
    return colors[Math.floor(Math.random() * colors.length)];
}
// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// ✅ ENHANCED MODAL WITH BETTER IMAGE HANDLING
function openCoachModal(coachId) {
    const coach = coachesData.find(c => c.id === coachId);
    if (!coach || !coachModal) return;
    
    const modalBody = document.getElementById('coachModalBody');
    modalBody.innerHTML = `
        <div class="coach-detail">
            <div class="coach-detail-avatar">
                <img src="${coach.avatar}" 
                     alt="${coach.name}"
                     class="coach-modal-image"
                     loading="eager"
                     decoding="async"
                     onerror="handleModalImageError(this, '${coach.name}');">
                <div class="placeholder" style="display: none;">
                    <span>${coach.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
            </div>
            <h3>${coach.name}</h3>
            <div class="coach-detail-title">${coach.title}</div>
            
            <div class="coach-bio">
                <p>${coach.bio}</p>
            </div>
            
            <div class="coach-specialties">
                <h4>Specialties:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;">
                    ${coach.specialties.map(specialty => `
                        <span class="specialty-tag">${specialty}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="coach-achievements">
                <h4>Achievements & Certifications:</h4>
                <ul>
                    ${coach.achievements.map(achievement => `
                        <li><i class="fas fa-trophy"></i> ${achievement}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="coach-rating" style="justify-content: center; margin-top: 2rem;">
                <div class="stars">
                    ${generateStars(coach.rating)}
                </div>
                <span class="rating-text">${coach.rating}/5.0 (Based on student reviews)</span>
            </div>
        </div>
    `;
    
    coachModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
// ✅ MODAL IMAGE ERROR HANDLER
function handleModalImageError(img, coachName) {
    console.warn(`❌ Failed to load modal image: ${img.src}`);
    
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('placeholder')) {
        placeholder.style.display = 'flex';
        const span = placeholder.querySelector('span');
        if (span) {
            span.textContent = coachName.split(' ').map(n => n[0]).join('');
        }
    }
}
// Open enrollment modal - called from HTML onclick
function openEnrollmentModal(program) {
    if (!enrollmentModal || !programInput) return;
    
    const programNames = {
        'foundation': 'Foundation Program ($80/month)',
        'intermediate': 'Skills Development ($120/month)',
        'advanced': 'Elite Training ($180/month)'
    };
    
    programInput.value = programNames[program] || program;
    enrollmentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    if (coachModal) coachModal.style.display = 'none';
    if (enrollmentModal) enrollmentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle enrollment form submission
function handleEnrollmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(enrollmentForm);
    const enrollmentData = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        enrollmentData[key] = value;
    }
    
    // Simple validation
    if (!enrollmentData.fullName || !enrollmentData.email || !enrollmentData.phone) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enrollmentData.email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(enrollmentData.phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number!');
        return;
    }
    
    // Age validation
    if (enrollmentData.age < 8 || enrollmentData.age > 60) {
        alert('Age must be between 8 and 60 years!');
        return;
    }
    
    // Show loading state
    const submitBtn = enrollmentForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Thank you ${enrollmentData.fullName}! Your enrollment application has been submitted successfully. We will contact you within 24 hours to confirm your spot and arrange payment.`);
        
        // Reset form and close modal
        enrollmentForm.reset();
        closeModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In a real app, this would send data to server
        console.log('Enrollment data:', enrollmentData);
        
    }, 2000);
}

// Update schedule availability (simulated real-time updates)
function updateScheduleAvailability() {
    const timeSlots = document.querySelectorAll('.time-slot .spots');
    
    timeSlots.forEach(slot => {
        if (!slot.classList.contains('full')) {
            // Randomly decrease available spots to simulate bookings
            if (Math.random() < 0.1) { // 10% chance per update
                const currentText = slot.textContent;
                const currentSpots = parseInt(currentText.match(/\d+/)?.[0] || 0);
                
                if (currentSpots > 0) {
                    const newSpots = currentSpots - 1;
                    if (newSpots === 0) {
                        slot.textContent = 'Full';
                        slot.classList.add('full');
                    } else {
                        slot.textContent = `${newSpots} spot${newSpots === 1 ? '' : 's'} left`;
                    }
                }
            }
        }
    });
}

// Get coach by specialization
function getCoachesBySpecialty(specialty) {
    return coachesData.filter(coach => 
        coach.specialties.some(spec => 
            spec.toLowerCase().includes(specialty.toLowerCase())
        )
    );
}

// Get available time slots
function getAvailableTimeSlots(day = 'weekdays') {
    const scheduleGrid = document.getElementById(`${day}-schedule`);
    if (!scheduleGrid) return [];
    
    const timeSlots = scheduleGrid.querySelectorAll('.time-slot');
    const availableSlots = [];
    
    timeSlots.forEach(slot => {
        const timeElement = slot.querySelector('.time');
        const programElement = slot.querySelector('.program');
        const spotsElement = slot.querySelector('.spots');
        
        if (!spotsElement.classList.contains('full')) {
            availableSlots.push({
                time: timeElement.textContent,
                program: programElement.textContent,
                spotsLeft: parseInt(spotsElement.textContent.match(/\d+/)?.[0] || 0)
            });
        }
    });
    
    return availableSlots;
}

// Filter coaches by rating
function getTopRatedCoaches(minRating = 4.8) {
    return coachesData.filter(coach => coach.rating >= minRating);
}

// Search coaches by name or specialty
function searchCoaches(query) {
    const lowercaseQuery = query.toLowerCase();
    return coachesData.filter(coach => 
        coach.name.toLowerCase().includes(lowercaseQuery) ||
        coach.title.toLowerCase().includes(lowercaseQuery) ||
        coach.specialties.some(specialty => 
            specialty.toLowerCase().includes(lowercaseQuery)
        )
    );
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLearnPage();
    
    // Start schedule updates simulation (every 30 seconds)
    setInterval(updateScheduleAvailability, 30000);
});

// Export functions for testing or other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLearnPage,
        renderCoaches,
        openCoachModal,
        openEnrollmentModal,
        getCoachesBySpecialty,
        getAvailableTimeSlots,
        searchCoaches,
        coachesData
    };
}
// Position data for learning
const learnPositionData = {
    1: {
        name: "Position 1 - Setter (S)",
        role: "Primary Playmaker/Secondary Server",
        description: "The quarterback of the team in 5-1 rotation. Controls the offense and distributes sets to attackers.",
        responsibilities: [
            "Set all balls to attackers (front & back row)",
            "Lead offensive plays and strategies",
            "Serve from right back position",
            "Back row defense when rotated to positions 1, 6, 5"
        ],
        skills: ["Setting precision", "Court vision", "Decision making", "Leadership", "Serving accuracy"]
    },
    2: {
        name: "Position 2 - Opposite Hitter (OP/OPP)",
        role: "Right Side Attacker/Blocker",
        description: "Positioned opposite to the setter. Primary attacker when setter is front row, key blocker against opponent's OH.",
        responsibilities: [
            "Attack from right side (front & back row)",
            "Block opponent's Outside Hitter (position 4)",
            "Secondary setting option when setter digs",
            "Right side defense coverage"
        ],
        skills: ["Power hitting", "Blocking technique", "Back row attacking", "Setting backup", "Court awareness"]
    },
    3:  {
        name: "Position 3 - Middle Blocker (MB)",
        role: "Quick Attacker/Primary Blocker",
        description: "The defensive wall and quick attack specialist. Tallest player, crucial for blocking system.",
        responsibilities: [
            "Execute quick attacks (1st tempo: quick, slide)",
            "Lead blocking on both sides (read or commit)",
            "Close block with OH/OP on wings",
            "Cover middle zone defense"
        ],
        skills: ["Quick attack timing", "Blocking footwork", "Reading opponent's sets", "Transition speed", "Slide technique"]
    },
    4: {
        name: "Position 4 - Outside Hitter (OH)",
        role: "Primary Attacker/Main Passer",
        description: "The most versatile and go-to attacker. Receives most sets, especially in critical situations.",
        responsibilities: [
            "Primary attacking option from left side",
            "Lead serve receive passing (Zone 4-5-6)",
            "Block opponent's Opposite (position 2)",
            "Back row attack (pipe/D) when rotated back"
        ],
        skills: ["Powerful attacking", "Consistent passing", "High ball control", "Blocking", "All-around versatility"]
    },
    5: {
        name: "Position 5 - Outside Hitter (OH) / Libero",
        role: "Left Back Defender/Passer",
        description: "Back row position often covered by Libero or OH rotated back. Critical for serve receive and defense.",
        responsibilities: [
            "Key serve receive position (left back)",
            "Dig balls from opponent's right side attacks",
            "Cover deep corner and line shots",
            "Support transition offense"
        ],
        skills: ["Passing accuracy", "Defensive positioning", "Digging technique", "Court coverage", "Ball control"]
    },
    6: {
        name: "Position 6 - Libero/Middle Back",
        role: "Defensive Anchor/Passing Leader",
        description: "The heart of back row defense, usually played by Libero. Commands serve receive and defensive formations.",
        responsibilities: [
            "Anchor middle back defense",
            "Lead serve receive system (call plays)",
            "Dig tips, roll shots, and off-speed attacks",
            "Communicate defensive adjustments",
            "Replace MB in back row (Libero rule)"
        ],
        skills: ["Elite passing", "Defensive reading", "Leadership", "Communication", "Quick reflexes"]
    }
};

// Quiz questions for learning
const learningQuizData = [
    {
        question: "How many players are on the court for each team during play?",
        options: ["5 players", "6 players", "7 players", "8 players"],
        correct: 1,
        explanation: "Each volleyball team has exactly 6 players on the court at any time - 3 in the front row and 3 in the back row."
    },
    {
        question: "What is the standard height of the net for men's volleyball?",
        options: ["2.24 meters", "2.43 meters", "2.50 meters", "2.35 meters"],
        correct: 1,
        explanation: "The standard net height for men's volleyball is 2.43 meters (7 feet 11⅝ inches)."
    },
    {
        question: "What does a '5-1' rotation system mean?",
        options: ["5 attackers and 1 setter", "5 sets and 1 match", "5 substitutions allowed", "5 timeouts per set"],
        correct: 0,
        explanation: "A 5-1 rotation means there are 5 attackers and 1 setter who sets from all positions as they rotate."
    },
    {
        question: "Which position is NOT allowed to attack above the net height from the back row?",
        options: ["Outside Hitter", "Setter", "Libero", "Middle Blocker"],
        correct: 2,
        explanation: "The Libero is a defensive specialist who cannot attack the ball above net height from anywhere on court."
    },
    {
        question: "How many times can a team touch the ball before sending it over the net?",
        options: ["2 touches maximum", "3 touches maximum", "4 touches maximum", "Unlimited touches"],
        correct: 1,
        explanation: "A team can touch the ball a maximum of 3 times before sending it over the net (not counting blocks)."
    }
];

// Initialize learning interactive tools
function initLearningTools() {
    // Set up position guide interactions
    setupPositionGuide();
    
    // Initialize quiz system
    initLearningQuiz();
    
    console.log('🎓 Learning tools initialized');
}

// Setup position guide interactions
function setupPositionGuide() {
    const positions = document.querySelectorAll('.court-position');
    positions.forEach(position => {
        position.addEventListener('click', showLearnPositionInfo);
        position.addEventListener('mouseenter', highlightPosition);
        position.addEventListener('mouseleave', removeHighlight);
    });
}

// Show position information in learning context
function showLearnPositionInfo(e) {
    const position = e.currentTarget.dataset.position;
    const info = learnPositionData[position];
    
    if (!info) return;
    
    // Remove active class from all positions
    document.querySelectorAll('.court-position').forEach(pos => {
        pos.classList.remove('active');
    });
    
    // Add active class to clicked position
    e.currentTarget.classList.add('active');
    
    const infoPanel = document.getElementById('learn-position-content');
    
    infoPanel.innerHTML = `
        <div class="position-details">
            <h5 class="position-title">${info.name}</h5>
            <div class="position-role-badge">${info.role}</div>
            
            <p class="position-description">${info.description}</p>
            
            <div class="responsibilities-section">
                <h6><i class="fas fa-tasks"></i> Key Responsibilities:</h6>
                <ul class="responsibilities-list">
                    ${info.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            
            <div class="skills-section">
                <h6><i class="fas fa-star"></i> Required Skills:</h6>
                <div class="skills-tags">
                    ${info.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="position-tip">
                <i class="fas fa-lightbulb"></i>
                <strong>Learning Tip:</strong> Practice the specific skills for this position during training sessions.
            </div>
        </div>
    `;
}

// Highlight position on hover
function highlightPosition(e) {
    if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.3)';
    }
}

// Remove highlight on mouse leave
function removeHighlight(e) {
    if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
    }
}

// Initialize learning quiz
function initLearningQuiz() {
    // Quiz will be initialized when startLearningQuiz is called
    console.log('📝 Learning quiz system ready');
}

// Start learning quiz
function startLearningQuiz() {
    const modal = document.getElementById('learning-quiz-modal');
    const container = document.getElementById('learning-quiz-container');
    
    if (!modal || !container) {
        console.error('Quiz modal elements not found');
        return;
    }
    
    // Reset quiz state
    window.currentQuizQuestion = 0;
    window.quizScore = 0;
    window.quizAnswers = [];
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start first question
    renderLearningQuiz();
    
    console.log('🎯 Learning quiz started');
}

// Render learning quiz question
function renderLearningQuiz() {
    const container = document.getElementById('learning-quiz-container');
    
    if (window.currentQuizQuestion >= learningQuizData.length) {
        showLearningQuizResults();
        return;
    }
    
    const question = learningQuizData[window.currentQuizQuestion];
    const progress = ((window.currentQuizQuestion + 1) / learningQuizData.length) * 100;
    
    container.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
            <span class="progress-text">Question ${window.currentQuizQuestion + 1} of ${learningQuizData.length}</span>
        </div>
        
        <div class="quiz-question">
            <h4>${question.question}</h4>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectLearningAnswer(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Handle learning quiz answer selection
function selectLearningAnswer(selectedIndex) {
    const question = learningQuizData[window.currentQuizQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        window.quizScore++;
    }
    
    window.quizAnswers.push({
        question: window.currentQuizQuestion,
        selected: selectedIndex,
        correct: isCorrect
    });
    
    // Show feedback
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show explanation and next button
    const container = document.getElementById('learning-quiz-container');
    container.innerHTML += `
        <div class="quiz-feedback">
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <span>${isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </div>
            <div class="explanation">
                <h5>Explanation:</h5>
                <p>${question.explanation}</p>
            </div>
            <button class="next-question-btn" onclick="nextLearningQuestion()">
                ${window.currentQuizQuestion + 1 >= learningQuizData.length ? 'See Results' : 'Next Question'}
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

// Go to next learning quiz question
function nextLearningQuestion() {
    window.currentQuizQuestion++;
    renderLearningQuiz();
}

// Show learning quiz results
function showLearningQuizResults() {
    const container = document.getElementById('learning-quiz-container');
    const percentage = Math.round((window.quizScore / learningQuizData.length) * 100);
    
    let resultMessage = '';
    let resultClass = '';
    
    if (percentage >= 80) {
        resultMessage = 'Excellent! You have a strong understanding of volleyball fundamentals.';
        resultClass = 'excellent';
    } else if (percentage >= 60) {
        resultMessage = 'Good job! You have a solid foundation in volleyball knowledge.';
        resultClass = 'good';
    } else {
        resultMessage = 'Keep studying! Review the learning materials to improve your understanding.';
        resultClass = 'needs-work';
    }
    
    container.innerHTML = `
        <div class="quiz-results ${resultClass}">
            <div class="result-icon">
                <i class="fas ${percentage >= 60 ? 'fa-trophy' : 'fa-book'}"></i>
            </div>
            <h3>Quiz Complete!</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                    <span class="score-text">${window.quizScore}/${learningQuizData.length}</span>
                </div>
            </div>
            <p class="result-message">${resultMessage}</p>
            
            <div class="quiz-actions">
                <button class="quiz-action-btn primary" onclick="startLearningQuiz()">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
                <button class="quiz-action-btn secondary" onclick="closeLearningQuiz()">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
            
            <div class="learning-suggestions">
                <h5>📚 Continue Learning:</h5>
                <ul>
                    <li>Practice with the Position Guide above</li>
                    <li>Review volleyball rules and techniques</li>
                    <li>Watch instructional videos</li>
                    <li>Join training sessions at DVA Club</li>
                </ul>
            </div>
        </div>
    `;
}

// Close learning quiz
function closeLearningQuiz() {
    const modal = document.getElementById('learning-quiz-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Make functions globally available
window.handleCoachImageError = handleCoachImageError;
window.handleModalImageError = handleModalImageError;
window.startLearningQuiz = startLearningQuiz;
window.selectLearningAnswer = selectLearningAnswer;
window.nextLearningQuestion = nextLearningQuestion;
window.closeLearningQuiz = closeLearningQuiz;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLearningTools();
});
