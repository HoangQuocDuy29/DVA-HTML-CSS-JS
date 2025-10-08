// Contact page functionality

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    url: /^https?:\/\/.+\..+/
};

// State management
let currentForm = 'general';
let isSubmitting = false;

// DOM elements
let formTabs, contactForms, faqItems;
let newsletterForm;

// Initialize contact page
function initContactPage() {
    // Get DOM elements
    formTabs = document.querySelectorAll('.form-tab');
    contactForms = document.querySelectorAll('.contact-form');
    faqItems = document.querySelectorAll('.faq-item');
    newsletterForm = document.getElementById('newsletter-form');

    // Set up event listeners
    setupEventListeners();
    
    // Initialize form validation
    initFormValidation();
    
    // Set up real-time availability updates
    initAvailabilityUpdates();
}

// Set up all event listeners
function setupEventListeners() {
    // Form tabs
    formTabs.forEach(tab => {
        tab.addEventListener('click', handleFormTabSwitch);
    });

    // Contact forms
    contactForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });

    // FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => toggleFAQ(question));
        }
    });

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Social links tracking
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = e.currentTarget.className.split(' ').pop();
            trackSocialClick(platform);
        });
    });
}

// Handle form tab switching
function handleFormTabSwitch(e) {
    const formType = e.target.dataset.form;
    if (formType !== currentForm) {
        currentForm = formType;
        
        // Update active tab
        formTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update active form
        contactForms.forEach(form => form.classList.remove('active'));
        document.querySelector(`[data-form="${formType}"]`).classList.add('active');
        
        // Clear any previous messages
        clearFormMessages();
        
        // Reset form validation
        resetFormValidation(formType);
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const form = e.target;
    const formType = form.dataset.form;
    
    // Validate entire form
    if (!validateForm(form)) {
        showFormMessage('error', 'Please correct the errors above and try again.');
        return;
    }
    
    isSubmitting = true;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading">Submitting</span>';
    submitBtn.disabled = true;
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle checkbox arrays (for training schedule)
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length > 0) {
            const checkboxData = {};
            checkboxes.forEach(checkbox => {
                const name = checkbox.name;
                if (!checkboxData[name]) {
                    checkboxData[name] = [];
                }
                checkboxData[name].push(checkbox.value);
            });
            Object.assign(data, checkboxData);
        }
        
        // Add form type and timestamp
        data.formType = formType;
        data.timestamp = new Date().toISOString();
        
        // Simulate API call
        const success = await submitContactForm(data);
        
        if (success) {
            showFormMessage('success', getSuccessMessage(formType));
            form.reset();
            resetFormValidation(formType);
            
            // Track successful submission
            trackFormSubmission(formType);
            
        } else {
            throw new Error('Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
        isSubmitting = false;
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Simulate form submission API call
async function submitContactForm(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate occasional failures for testing
    if (Math.random() < 0.1) { // 10% failure rate
        throw new Error('Network error');
    }
    
    // Log the data (in real app, this would be sent to server)
    console.log('Form submitted:', data);
    
    return true;
}

// Get success message based on form type
function getSuccessMessage(formType) {
    const messages = {
        general: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        training: 'Your training inquiry has been received! Our coaching team will contact you within 1-2 business days to discuss program options.',
        membership: 'Thank you for your membership application! We\'ll review your information and contact you within 3-5 business days to schedule a tryout.',
        partnership: 'Your partnership proposal has been received! Our business development team will review it and contact you within one week.'
    };
    
    return messages[formType] || 'Thank you for contacting us! We\'ll be in touch soon.';
}

// Form validation functions
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (isRequired && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !isRequired) {
        return true;
    }
    
    // Email validation
    if (fieldType === 'email' || fieldName.includes('email')) {
        if (!validationPatterns.email.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' || fieldName.includes('phone')) {
        const cleanPhone = value.replace(/\s/g, '');
        if (!validationPatterns.phone.test(cleanPhone)) {
            showFieldError(field, 'Please enter a valid phone number.');
            return false;
        }
    }
    
    // URL validation
    if (fieldType === 'url' || fieldName.includes('website')) {
        if (value && !validationPatterns.url.test(value)) {
            showFieldError(field, 'Please enter a valid URL (starting with http:// or https://).');
            return false;
        }
    }
    
    // Age validation
    if (fieldName === 'age') {
        const age = parseInt(value);
        if (age < 8 || age > 60) {
            showFieldError(field, 'Age must be between 8 and 60 years.');
            return false;
        }
    }
    
    // Height validation
    if (fieldName === 'height') {
        const height = parseInt(value);
        if (height && (height < 150 || height > 220)) {
            showFieldError(field, 'Height must be between 150 and 220 cm.');
            return false;
        }
    }
    
    // Text length validation
    if (fieldName === 'message' || fieldName === 'goals' || fieldName === 'experience' || fieldName === 'proposal') {
        if (value.length < 10) {
            showFieldError(field, 'Please provide more details (at least 10 characters).');
            return false;
        }
        if (value.length > 1000) {
            showFieldError(field, 'Please keep your message under 1000 characters.');
            return false;
        }
    }
    
    // Mark field as valid
    field.closest('.form-group').classList.add('success');
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function resetFormValidation(formType) {
    const form = document.querySelector(`[data-form="${formType}"]`);
    if (form) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
}

// Form messages
function showFormMessage(type, message) {
    const activeForm = document.querySelector('.contact-form.active');
    if (!activeForm) return;
    
    let messageElement = activeForm.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        activeForm.insertBefore(messageElement, activeForm.firstChild);
    }
    
    messageElement.className = `form-message ${type} show`;
    messageElement.textContent = message;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }
}

function clearFormMessages() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(message => {
        message.classList.remove('show');
    });
}

// FAQ functionality
function toggleFAQ(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Newsletter form handling
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const consentCheckbox = form.querySelector('input[type="checkbox"]');
    const submitBtn = form.querySelector('button');
    
    // Validate email
    if (!validationPatterns.email.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }
    
    // Check consent
    if (!consentCheckbox.checked) {
        alert('Please agree to receive marketing emails.');
        consentCheckbox.focus();
        return;
    }
    
    // Show loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
        
        // Track newsletter signup
        trackNewsletterSignup(emailInput.value);
        
    } catch (error) {
        alert('Sorry, there was an error. Please try again.');
        console.error('Newsletter signup error:', error);
    } finally {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }
}

// External integrations (placeholders)
function openLiveChat() {
    // In a real app, this would integrate with chat service like Intercom, Zendesk, etc.
    alert('Live chat feature coming soon! For now, please use the contact forms or call us directly.');
}

function openDirections(facility) {
    const addresses = {
        main: '123 Sports Complex Drive, District 1, Ho Chi Minh City, Vietnam',
        secondary: '456 Athletic Center Blvd, District 3, Ho Chi Minh City, Vietnam'
    };
    
    const address = addresses[facility];
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    window.open(googleMapsUrl, '_blank');
}

function openMap() {
    // Open Google Maps with both locations
    const url = 'https://www.google.com/maps/search/?api=1&query=DVA+Volleyball+Club+Ho+Chi+Minh+City';
    window.open(url, '_blank');
}

// Analytics and tracking
function trackFormSubmission(formType) {
    // In a real app, this would integrate with Google Analytics, Mixpanel, etc.
    console.log(`Form submitted: ${formType}`);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            form_type: formType,
            event_category: 'contact'
        });
    }
}

function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            platform: platform,
            event_category: 'social'
        });
    }
}

function trackNewsletterSignup(email) {
    console.log(`Newsletter signup: ${email}`);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            event_category: 'marketing'
        });
    }
}

// Real-time availability updates (simulated)
function initAvailabilityUpdates() {
    // Simulate real-time updates for training availability, response times, etc.
    setInterval(updateAvailability, 60000); // Update every minute
}

function updateAvailability() {
    // Update response time estimates
    const responseElements = document.querySelectorAll('.method-response p');
    responseElements.forEach(element => {
        if (element.textContent.includes('within')) {
            // Randomly update response times to simulate dynamic data
            const hours = Math.floor(Math.random() * 24) + 1;
            element.innerHTML = `<i class="fas fa-reply"></i> Response within ${hours} hours`;
        }
    });
    
    // Update facility hours based on current time (simplified)
    updateFacilityStatus();
}

function updateFacilityStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach((card, index) => {
        const isMainFacility = index === 0;
        let isOpen = false;
        
        if (isMainFacility) {
            // Main facility: Mon-Fri 6AM-10PM, Sat-Sun 8AM-8PM
            if (isWeekend) {
                isOpen = currentHour >= 8 && currentHour < 20;
            } else {
                isOpen = currentHour >= 6 && currentHour < 22;
            }
        } else {
            // Secondary facility: Mon-Fri 5PM-10PM, Sat-Sun 9AM-6PM
            if (isWeekend) {
                isOpen = currentHour >= 9 && currentHour < 18;
            } else {
                isOpen = currentHour >= 17 && currentHour < 22;
            }
        }
        
        // Add/remove open status indicator
        let statusElement = card.querySelector('.facility-status');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.className = 'facility-status';
            card.querySelector('.facility-info').insertBefore(statusElement, card.querySelector('.facility-address').nextSibling);
        }
        
        statusElement.innerHTML = isOpen 
            ? '<i class="fas fa-circle" style="color: #27ae60;"></i> Currently Open'
            : '<i class="fas fa-circle" style="color: #e74c3c;"></i> Currently Closed';
        
        statusElement.style.cssText = 'margin-bottom: 1rem; font-weight: 600; color: #666;';
    });
}

// Form auto-save functionality (optional enhancement)
function initFormAutoSave() {
    contactForms.forEach(form => {
        const formType = form.dataset.form;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Load saved data
            const savedValue = localStorage.getItem(`contact_form_${formType}_${input.name}`);
            if (savedValue && input.type !== 'checkbox') {
                input.value = savedValue;
            }
            
            // Save data on change
            input.addEventListener('input', utils.debounce(() => {
                if (input.value.trim()) {
                    localStorage.setItem(`contact_form_${formType}_${input.name}`, input.value);
                } else {
                    localStorage.removeItem(`contact_form_${formType}_${input.name}`);
                }
            }, 500));
        });
    });
}

// Clear saved form data after successful submission
function clearFormAutoSave(formType) {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith(`contact_form_${formType}_`)) {
            localStorage.removeItem(key);
        }
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContactPage();
    initFormAutoSave();
    updateFacilityStatus(); // Initial status update
});

// Export functions for testing or other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initContactPage,
        handleFormSubmit,
        validateField,
        toggleFAQ,
        openDirections,
        trackFormSubmission
    };
}

// Make functions available globally for HTML onclick handlers
window.openLiveChat = openLiveChat;
window.openDirections = openDirections;
window.openMap = openMap;
window.toggleFAQ = toggleFAQ;
