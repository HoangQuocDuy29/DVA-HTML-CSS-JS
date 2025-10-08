// Requirements page functionality

// State management
let currentTab = 'attitude';
let animationTimers = [];

// DOM elements
let tabButtons, tabContents, progressBars;

// Initialize requirements page
function initRequirementsPage() {
    // Get DOM elements
    tabButtons = document.querySelectorAll('.req-tab');
    tabContents = document.querySelectorAll('.tab-content');
    progressBars = document.querySelectorAll('.progress-bar');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Animate progress bars when visible
    observeProgressBars();
}

// Set up all event listeners
function setupEventListeners() {
    // Tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabSwitch);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard navigation for tabs
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Handle tab switching
function handleTabSwitch(e) {
    const tabType = e.target.dataset.tab || e.target.parentElement.dataset.tab;
    if (tabType && tabType !== currentTab) {
        currentTab = tabType;
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active') || e.target.parentElement.classList.add('active');
        
        // Update active content
        tabContents.forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById(`${tabType}-tab`);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // Trigger animations for newly visible content
            triggerContentAnimations(targetContent);
        }
        
        // Update URL hash without scrolling
        history.replaceState(null, null, `#${tabType}`);
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (e.target.classList.contains('req-tab')) {
        let index = Array.from(tabButtons).indexOf(e.target);
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                index = index > 0 ? index - 1 : tabButtons.length - 1;
                tabButtons[index].click();
                tabButtons[index].focus();
                break;
            case 'ArrowRight':
                e.preventDefault();
                index = index < tabButtons.length - 1 ? index + 1 : 0;
                tabButtons[index].click();
                tabButtons[index].focus();
                break;
            case 'Home':
                e.preventDefault();
                tabButtons[0].click();
                tabButtons[0].focus();
                break;
            case 'End':
                e.preventDefault();
                tabButtons[tabButtons.length - 1].click();
                tabButtons[tabButtons.length - 1].focus();
                break;
        }
    }
}

// Initialize animations
function initializeAnimations() {
    // Set up intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Trigger animations for content
function triggerContentAnimations(container) {
    const animatedElements = container.querySelectorAll('.fade-in');
    animatedElements.forEach((el, index) => {
        // Reset animation
        el.classList.remove('visible');
        
        // Trigger animation with delay
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

// Observe and animate progress bars
function observeProgressBars() {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Animate individual progress bar
function animateProgressBar(progressBar) {
    const percentage = progressBar.dataset.percentage;
    if (percentage) {
        // Reset width
        progressBar.style.width = '0%';
        
        // Animate to target percentage
        setTimeout(() => {
            progressBar.style.width = percentage + '%';
        }, 100);
    }
}

// Utility functions
function highlightRequirement(requirementId) {
    const element = document.getElementById(requirementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.background = '#fff3cd';
        element.style.border = '2px solid #ffeaa7';
        
        setTimeout(() => {
            element.style.background = '';
            element.style.border = '';
        }, 3000);
    }
}

function showSkillDemo(skillType) {
    // In a real application, this could show video demonstrations
    const demoMessages = {
        serve: 'Serve demonstration: Focus on consistent contact point and follow-through.',
        spike: 'Spike demonstration: Three-step approach, jump timing, and arm swing technique.',
        block: 'Block demonstration: Proper hand positioning and timing with the attacker.'
    };
    
    alert(demoMessages[skillType] || 'Skill demonstration not available.');
}

function calculateSkillLevel() {
    // Simulate skill level calculation based on user input
    // In a real app, this would integrate with assessment forms
    const skills = {
        serve_accuracy: 70,
        spike_success: 50,
        block_touches: 30,
        attendance: 80
    };
    
    const average = Object.values(skills).reduce((a, b) => a + b, 0) / Object.values(skills).length;
    
    let level = '';
    if (average >= 70) level = 'Advanced';
    else if (average >= 50) level = 'Intermediate';
    else level = 'Beginner';
    
    return { level, average: Math.round(average), skills };
}

// Export functions for testing or external use
function exportRequirementData() {
    return {
        currentTab,
        requirements: {
            attitude: [
                'Team Spirit',
                'Competitive Spirit', 
                'Discipline',
                'Fair Play'
            ],
            technical: [
                'Serving (60% accuracy)',
                'Spiking (50% success)',
                'Blocking (30% touch rate)'
            ],
            additional: [
                'Physical Fitness',
                'Experience (6-12 months)',
                'Commitment (6 months minimum)'
            ]
        }
    };
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initRequirementsPage();
    
    // Handle initial hash if present
    const hash = window.location.hash.substring(1);
    if (hash && ['attitude', 'technical', 'additional'].includes(hash)) {
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash && ['attitude', 'technical', 'additional'].includes(hash)) {
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRequirementsPage,
        handleTabSwitch,
        calculateSkillLevel,
        exportRequirementData,
        highlightRequirement,
        showSkillDemo
    };
}

// Make functions available globally for HTML onclick handlers
window.showSkillDemo = showSkillDemo;
window.highlightRequirement = highlightRequirement;
window.calculateSkillLevel = calculateSkillLevel;
