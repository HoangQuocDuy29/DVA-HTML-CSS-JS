// Bonus page functionality

// Quiz data
const quizData = [
    {
        id: 1,
        question: "How many players are on the court for each team in volleyball?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "Each volleyball team has 6 players on the court at any time."
    },
    {
        id: 2,
        question: "What is the maximum number of touches a team can have before sending the ball over the net?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "A team can touch the ball a maximum of 3 times before sending it over the net."
    },
    {
        id: 3,
        question: "In a 5-1 rotation system, how many setters are there?",
        options: ["1", "2", "3", "5"],
        correct: 0,
        explanation: "In a 5-1 system, there is 1 setter and 5 attackers."
    },
    {
        id: 4,
        question: "What is the standard height of a volleyball net for men's competition?",
        options: ["2.24m", "2.34m", "2.43m", "2.53m"],
        correct: 2,
        explanation: "The standard height for men's volleyball net is 2.43 meters."
    },
    {
        id: 5,
        question: "Which position is specialized for defense and cannot attack above the net height?",
        options: ["Setter", "Middle Blocker", "Libero", "Outside Hitter"],
        correct: 2,
        explanation: "The Libero is a specialized defensive position that cannot attack above net height."
    }
];

// Position information
const positionData = {
    1: {
        name: "Position 1 - Right Back",
        role: "Server/Right Back",
        responsibilities: "Primary server, back row defense, and right side coverage. This player rotates to serve and must be ready for defensive plays."
    },
    2: {
        name: "Position 2 - Right Front",
        role: "Right Side Hitter/Blocker",
        responsibilities: "Right side attack, blocking middle and outside attacks. Often a strong blocker who can hit from the right side."
    },
    3: {
        name: "Position 3 - Middle Front",
        role: "Middle Blocker",
        responsibilities: "Primary blocker, quick attacks in the middle. The tallest player who can block anywhere along the net and hit quick sets."
    },
    4: {
        name: "Position 4 - Left Front",
        role: "Outside Hitter",
        responsibilities: "Primary attacker from the left side, passing, and blocking. Usually the go-to attacker for consistent offense."
    },
    5: {
        name: "Position 5 - Left Back",
        role: "Left Back",
        responsibilities: "Back row defense, passing, and left side coverage. Must be ready for hard-driven attacks and tips."
    },
    6: {
        name: "Position 6 - Middle Back",
        role: "Middle Back/Libero",
        responsibilities: "Back row defense, passing serve receive, and covering the middle of the court. Often where the Libero plays."
    }
};

// State management
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswers = [];
let reactionTestActive = false;
let reactionStartTime = 0;
let memoryGameLevel = 1;
let memorySequence = [];
let userSequence = [];

// DOM elements
let gameModal, quizContent;

// Initialize bonus page
function initBonusPage() {
    // Get DOM elements
    gameModal = document.getElementById('quiz-modal');
    quizContent = document.getElementById('quiz-content');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize interactive elements
    initializeInteractiveElements();
}

// Set up event listeners
function setupEventListeners() {
    // Position guide
    const positions = document.querySelectorAll('.position');
    positions.forEach(position => {
        position.addEventListener('click', showPositionInfo);
    });
    
    // Statistics calculator
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateStats);
    }
    
    // Input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', validateNumberInput);
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Game Functions

// Start Quiz
function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswers = [];
    
    if (!gameModal || !quizContent) return;
    
    gameModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    renderQuizQuestion();
}

// Render quiz question
function renderQuizQuestion() {
    if (currentQuizQuestion >= quizData.length) {
        showQuizResults();
        return;
    }
    
    const question = quizData[currentQuizQuestion];
    const progressPercent = ((currentQuizQuestion + 1) / quizData.length) * 100;
    
    quizContent.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-bar">
                <div class="progress" style="width: ${progressPercent}%"></div>
            </div>
            <span class="question-counter">Question ${currentQuizQuestion + 1} of ${quizData.length}</span>
        </div>
        
        <div class="question-container">
            <h3 class="question">${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" onclick="selectAnswer(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Select quiz answer
function selectAnswer(selectedIndex) {
    const question = quizData[currentQuizQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        quizScore++;
    }
    
    quizAnswers.push({
        question: currentQuizQuestion,
        selected: selectedIndex,
        correct: isCorrect
    });
    
    // Show feedback
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show explanation
    quizContent.innerHTML += `
        <div class="explanation">
            <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
            <p>${question.explanation}</p>
            <button class="next-btn" onclick="nextQuestion()">
                ${currentQuizQuestion + 1 >= quizData.length ? 'See Results' : 'Next Question'}
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

// Next question
function nextQuestion() {
    currentQuizQuestion++;
    renderQuizQuestion();
}

// Show quiz results
function showQuizResults() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    let resultMessage = '';
    let resultClass = '';
    
    if (percentage >= 80) {
        resultMessage = 'Excellent! You\'re a volleyball expert!';
        resultClass = 'excellent';
    } else if (percentage >= 60) {
        resultMessage = 'Good job! You know your volleyball well.';
        resultClass = 'good';
    } else if (percentage >= 40) {
        resultMessage = 'Not bad, but there\'s room for improvement.';
        resultClass = 'average';
    } else {
        resultMessage = 'Keep learning! Practice makes perfect.';
        resultClass = 'needs-improvement';
    }
    
    quizContent.innerHTML = `
        <div class="quiz-results ${resultClass}">
            <div class="result-icon">
                <i class="fas ${percentage >= 60 ? 'fa-trophy' : 'fa-medal'}"></i>
            </div>
            <h3>Quiz Complete!</h3>
            <div class="score-display">
                <span class="score">${quizScore}/${quizData.length}</span>
                <span class="percentage">${percentage}%</span>
            </div>
            <p class="result-message">${resultMessage}</p>
            
            <div class="quiz-actions">
                <button class="btn btn-primary" onclick="startQuiz()">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
                <button class="btn btn-secondary" onclick="closeModal('quiz-modal')">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
}

// Start Reaction Test
function startReactionTest() {
    if (reactionTestActive) return;
    
    const testArea = document.createElement('div');
    testArea.className = 'reaction-test-overlay';
    testArea.innerHTML = `
        <div class="reaction-test-modal">
            <div class="reaction-header">
                <h3>Reaction Test</h3>
                <button onclick="closeReactionTest()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="reaction-content">
                <div class="reaction-circle" id="reaction-circle">
                    <span id="reaction-text">Wait for GREEN</span>
                </div>
                <div class="reaction-instructions">
                    <p>Click the circle as fast as possible when it turns green!</p>
                </div>
                <div class="reaction-results" id="reaction-results" style="display: none;">
                    <h4>Your Reaction Time</h4>
                    <div class="reaction-time">
                        <span id="reaction-time-value">0</span>ms
                    </div>
                    <p id="reaction-rating"></p>
                    <button class="btn btn-primary" onclick="startReactionTest()">Try Again</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(testArea);
    document.body.style.overflow = 'hidden';
    
    // Start the test
    setTimeout(() => {
        startReactionSequence();
    }, 1000);
}

// Start reaction sequence
function startReactionSequence() {
    reactionTestActive = true;
    const circle = document.getElementById('reaction-circle');
    const text = document.getElementById('reaction-text');
    
    // Random delay between 1-5 seconds
    const delay = Math.random() * 4000 + 1000;
    
    setTimeout(() => {
        circle.style.background = '#27ae60';
        text.textContent = 'CLICK NOW!';
        reactionStartTime = Date.now();
        
        circle.onclick = () => {
            if (reactionTestActive) {
                const reactionTime = Date.now() - reactionStartTime;
                showReactionResults(reactionTime);
                reactionTestActive = false;
            }
        };
    }, delay);
}

// Show reaction results
function showReactionResults(time) {
    const results = document.getElementById('reaction-results');
    const timeValue = document.getElementById('reaction-time-value');
    const rating = document.getElementById('reaction-rating');
    
    timeValue.textContent = time;
    
    let ratingText = '';
    if (time < 200) {
        ratingText = 'Excellent! Lightning fast reflexes!';
    } else if (time < 300) {
        ratingText = 'Great! Above average reaction time.';
    } else if (time < 400) {
        ratingText = 'Good! Average reaction time.';
    } else {
        ratingText = 'Keep practicing to improve your reaction time.';
    }
    
    rating.textContent = ratingText;
    results.style.display = 'block';
    
    document.getElementById('reaction-circle').style.display = 'none';
}

// Close reaction test
function closeReactionTest() {
    const overlay = document.querySelector('.reaction-test-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
    reactionTestActive = false;
}

// Start Memory Game
function startMemoryGame() {
    memoryGameLevel = 1;
    memorySequence = [];
    userSequence = [];
    
    const gameArea = document.createElement('div');
    gameArea.className = 'memory-game-overlay';
    gameArea.innerHTML = `
        <div class="memory-game-modal">
            <div class="memory-header">
                <h3>Formation Memory Game</h3>
                <div class="level-display">Level: <span id="memory-level">1</span></div>
                <button onclick="closeMemoryGame()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="memory-content">
                <div class="memory-court">
                    <div class="memory-positions">
                        ${[1,2,3,4,5,6].map(pos => `
                            <div class="memory-position" data-position="${pos}" onclick="selectMemoryPosition(${pos})">
                                ${pos}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="memory-instructions">
                    <p id="memory-instruction">Watch the sequence, then repeat it!</p>
                </div>
                <div class="memory-controls">
                    <button class="btn btn-primary" onclick="nextMemoryLevel()">Start Level 1</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(gameArea);
    document.body.style.overflow = 'hidden';
}

// Next memory level
function nextMemoryLevel() {
    // Generate new sequence
    memorySequence.push(Math.floor(Math.random() * 6) + 1);
    userSequence = [];
    
    document.getElementById('memory-level').textContent = memoryGameLevel;
    document.getElementById('memory-instruction').textContent = 'Watch the sequence!';
    
    // Disable clicking
    const positions = document.querySelectorAll('.memory-position');
    positions.forEach(pos => pos.style.pointerEvents = 'none');
    
    // Show sequence
    showMemorySequence();
}

// Show memory sequence
function showMemorySequence() {
    let index = 0;
    
    const showNext = () => {
        if (index < memorySequence.length) {
            const position = document.querySelector(`[data-position="${memorySequence[index]}"]`);
            position.style.background = '#e74c3c';
            position.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                position.style.background = '#3498db';
                position.style.transform = 'scale(1)';
                index++;
                setTimeout(showNext, 300);
            }, 600);
        } else {
            // Enable clicking
            const positions = document.querySelectorAll('.memory-position');
            positions.forEach(pos => pos.style.pointerEvents = 'auto');
            document.getElementById('memory-instruction').textContent = 'Now repeat the sequence!';
        }
    };
    
    showNext();
}

// Select memory position
function selectMemoryPosition(position) {
    userSequence.push(position);
    
    // Visual feedback
    const posElement = document.querySelector(`[data-position="${position}"]`);
    posElement.style.background = '#f39c12';
    setTimeout(() => {
        posElement.style.background = '#3498db';
    }, 200);
    
    // Check if sequence matches
    if (userSequence.length === memorySequence.length) {
        const correct = userSequence.every((pos, index) => pos === memorySequence[index]);
        
        if (correct) {
            memoryGameLevel++;
            if (memoryGameLevel <= 15) {
                setTimeout(() => {
                    nextMemoryLevel();
                }, 1000);
            } else {
                document.getElementById('memory-instruction').textContent = 'Congratulations! You completed all levels!';
            }
        } else {
            document.getElementById('memory-instruction').textContent = 'Wrong sequence! Try again.';
            setTimeout(() => {
                showMemorySequence();
            }, 1500);
        }
    }
}

// Close memory game
function closeMemoryGame() {
    const overlay = document.querySelector('.memory-game-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
}

// Position Guide Functions

// Show position info
function showPositionInfo(e) {
    const position = e.target.dataset.position;
    const info = positionData[position];
    
    if (!info) return;
    
    const infoDiv = document.getElementById('position-info');
    infoDiv.innerHTML = `
        <h4>${info.name}</h4>
        <div class="position-role">
            <strong>Role:</strong> ${info.role}
        </div>
        <p><strong>Responsibilities:</strong> ${info.responsibilities}</p>
    `;
}

// Statistics Calculator

// Calculate stats
function calculateStats() {
    const successfulAttacks = parseInt(document.getElementById('successful-attacks').value) || 0;
    const totalAttacks = parseInt(document.getElementById('total-attacks').value) || 0;
    const successfulServes = parseInt(document.getElementById('successful-serves').value) || 0;
    const totalServes = parseInt(document.getElementById('total-serves').value) || 0;
    
    const attackRate = totalAttacks > 0 ? ((successfulAttacks / totalAttacks) * 100).toFixed(1) : 0;
    const serveRate = totalServes > 0 ? ((successfulServes / totalServes) * 100).toFixed(1) : 0;
    
    document.getElementById('attack-rate').textContent = attackRate + '%';
    document.getElementById('serve-rate').textContent = serveRate + '%';
    
    const results = document.getElementById('stats-results');
    results.style.display = 'block';
    
    // Color code the results
    const attackElement = document.getElementById('attack-rate');
    const serveElement = document.getElementById('serve-rate');
    
    attackElement.style.color = attackRate >= 50 ? '#27ae60' : attackRate >= 30 ? '#f39c12' : '#e74c3c';
    serveElement.style.color = serveRate >= 80 ? '#27ae60' : serveRate >= 60 ? '#f39c12' : '#e74c3c';
}

// Validate number input
function validateNumberInput(e) {
    const value = parseInt(e.target.value);
    if (value < 0) {
        e.target.value = 0;
    }
}

// Modal Functions

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBonusPage();
});

// Make functions available globally
window.startQuiz = startQuiz;
window.startReactionTest = startReactionTest;
window.startMemoryGame = startMemoryGame;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.selectMemoryPosition = selectMemoryPosition;
window.nextMemoryLevel = nextMemoryLevel;
window.calculateStats = calculateStats;
window.closeModal = closeModal;
window.closeReactionTest = closeReactionTest;
window.closeMemoryGame = closeMemoryGame;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBonusPage,
        startQuiz,
        calculateStats,
        quizData,
        positionData
    };
}
