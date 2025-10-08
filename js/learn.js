// Learn page functionality

// Sample coaches data - in real app, this would come from API
const coachesData = [
    {
        id: 1,
        name: "Maria Rodriguez",
        title: "Head Coach & Founder",
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
        name: "James Wilson",
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
        name: "Sarah Kim",
        title: "Junior Development Coach",
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
        name: "Alex Thompson",
        title: "Defense Specialist Coach",
        avatar: "https://via.placeholder.com/300x300/27ae60/ffffff?text=AT",
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
    },
    {
        id: 5,
        name: "Lisa Chen",
        title: "Setting & Strategy Coach",
        avatar: "https://via.placeholder.com/300x300/f39c12/ffffff?text=LC",
        specialties: ["Setting Technique", "Game Strategy", "Team Coordination"],
        experience: "9 years coaching experience",
        rating: 4.8,
        bio: "Lisa is a master strategist who excels in developing game plans and training setters. Her tactical knowledge and ability to read opponents makes her invaluable for competitive teams. She focuses on game intelligence.",
        achievements: [
            "Former College All-American Setter",
            "Tactical Analysis Specialist",
            "Team Strategy Development Expert",
            "Coached 3 Championship Teams"
        ]
    },
    {
        id: 6,
        name: "Michael Foster",
        title: "Elite Performance Coach",
        avatar: "https://via.placeholder.com/300x300/e67e22/ffffff?text=MF",
        specialties: ["Elite Training", "Competition Prep", "Mental Coaching"],
        experience: "15 years coaching experience",
        rating: 4.9,
        bio: "Michael works with our most advanced players, preparing them for collegiate and professional opportunities. His comprehensive approach includes mental conditioning and competition psychology. He's helped dozens of players earn scholarships.",
        achievements: [
            "15 Years Elite Level Coaching",
            "Mental Performance Specialist",
            "50+ Scholarship Recipients",
            "Olympic Training Center Consultant"
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
            <i class="fas fa-spinner"></i>
            <p>Loading our expert coaches...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        coachesContainer.innerHTML = coachesData.map(coach => `
            <div class="coach-card fade-in" data-coach-id="${coach.id}">
                <div class="coach-avatar">
                    <img src="${coach.avatar}" alt="${coach.name}" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
        
    }, 1000); // Simulate loading time
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

// Open coach detail modal
function openCoachModal(coachId) {
    const coach = coachesData.find(c => c.id === coachId);
    if (!coach || !coachModal) return;
    
    const modalBody = document.getElementById('coachModalBody');
    modalBody.innerHTML = `
        <div class="coach-detail">
            <div class="coach-detail-avatar">
                <img src="${coach.avatar}" alt="${coach.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
