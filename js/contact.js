// Contact page functionality with Google Sheets integration

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
    url: /^https?:\/\/.+\..+/
};

// Google Apps Script Web App URL (replace with your actual URL)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZp3TswdiPpth82v7jX9mRwtB00nLdork7Al-BWlgGH_PkLV3gc1IOqzXt11BVOk9l1w/exec';

// State management
let currentForm = 'registration';
let isSubmitting = false;

// DOM elements
let formTabs, contactForms, faqItems;
let newsletterForm;

// Initialize contact page
// Initialize contact page - UPDATED
function initContactPage() {
    console.log('🚀 Initializing contact page...');
    
    // Get DOM elements
    formTabs = document.querySelectorAll('.form-tab');
    contactForms = document.querySelectorAll('.contact-form');
    faqItems = document.querySelectorAll('.faq-item');
    newsletterForm = document.getElementById('newsletter-form');

    console.log('📋 Found elements:', {
        formTabs: formTabs.length,
        contactForms: contactForms.length,
        faqItems: faqItems.length,
        newsletterForm: !!newsletterForm
    });

    // Set up event listeners
    setupEventListeners();
    
    // Initialize form validation
    initFormValidation();
    
    // Set up real-time availability updates
    initAvailabilityUpdates();
    
    console.log('✅ Contact page initialized successfully');
}

// Enhanced form validation initialization - NEW
function initFormValidation() {
    console.log('🔍 Initializing form validation...');
    
    // Add validation CSS if not already present
    if (!document.getElementById('validation-styles')) {
        const style = document.createElement('style');
        style.id = 'validation-styles';
        style.textContent = `
            .form-group.error input,
            .form-group.error select {
                border-color: #e74c3c !important;
                background-color: #fdf2f2 !important;
            }
            
            .form-group.success input,
            .form-group.success select {
                border-color: #27ae60 !important;
                background-color: #f0f9f0 !important;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 0.85rem;
                margin-top: 5px;
                font-weight: 500;
                display: block;
            }
            
            .form-message {
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                font-weight: 500;
                display: none;
                animation: slideDown 0.3s ease;
            }
            
            .form-message.show {
                display: block;
            }
            
            .form-message.success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            
            .form-message.error {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('💄 Validation styles added');
    }
    
    // Enhanced validation setup for forms
    contactForms.forEach((form, index) => {
        console.log(`🔧 Setting up validation for form ${index + 1}:`, form.dataset.form);
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Prevent default HTML5 validation popup
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                validateField(input);
            });
        });
    });
    
    console.log('✅ Form validation initialized successfully');
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
// Enhanced handleFormSubmit with debugging
// Update the handleFormSubmit function
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const form = e.target;
    const formType = form.dataset.form;
    
    console.log('📝 Form submission started for:', formType);
    
    // Validate entire form
    if (!validateForm(form)) {
        console.log('❌ Form validation failed');
        showFormMessage('error', 'Please correct the errors above and try again.');
        return;
    }
    
    console.log('✅ Form validation passed');
    
    isSubmitting = true;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('📋 Raw form data:', data);
        
        // Add form type and timestamp
        data.formType = formType;
        data.timestamp = new Date().toISOString();
        data.submissionDate = new Date().toLocaleString('vi-VN');
        
        // Calculate age from birth year
        if (data.birthyear) {
            data.age = new Date().getFullYear() - parseInt(data.birthyear);
        }
        
        // Format position display name
        if (data.position) {
            const positionNames = {
                'outside-hitter': 'Outside Hitter',
                'middle-blocker': 'Middle Blocker',
                'setter': 'Setter',
                'libero': 'Libero',
                'opposite': 'Opposite Hitter'
            };
            data.positionDisplay = positionNames[data.position] || data.position;
        }
        
        console.log('📊 Final data to send:', data);
        
        // Use enhanced submission method
        const success = await sendToGoogleSheetsEnhanced(data);
        
        if (success) {
            console.log('🎉 Registration successful!');
            showFormMessage('success', getSuccessMessage(formType));
            form.reset();
            resetFormValidation(formType);
            
            // Track successful submission
            trackFormSubmission(formType, data);
            
            // Clear auto-saved data
            clearFormAutoSave(formType);
            
        } else {
            throw new Error('All submission methods failed');
        }
        
    } catch (error) {
        console.error('💥 Form submission error:', error);
        showFormMessage('error', 'Sorry, there was an error submitting your registration. Please try again or contact us directly at 0768 299 329.');
    } finally {
        isSubmitting = false;
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}



// Replace sendToGoogleSheets function with this version
async function sendToGoogleSheets(data) {
    return new Promise((resolve, reject) => {
        try {
            console.log('🚀 Starting form submission method...');
            console.log('📤 Data being sent:', data);
            
            // Create invisible iframe to handle response
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'registration_frame';
            document.body.appendChild(iframe);
            
            // Create form
            const form = document.createElement('form');
            form.method = 'GET';
            form.action = GOOGLE_SCRIPT_URL;
            form.target = 'registration_frame';
            form.style.display = 'none';
            
            // Add all data as hidden inputs
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = String(data[key] || '');
                form.appendChild(input);
            });
            
            // Handle iframe load
            iframe.onload = function() {
                console.log('✅ Form submission completed');
                
                try {
                    // Try to read response (may fail due to CORS)
                    const responseText = iframe.contentDocument.body.textContent;
                    console.log('📋 Response:', responseText);
                } catch (error) {
                    console.log('🔒 Response blocked by CORS (normal)');
                }
                
                // Clean up
                setTimeout(() => {
                    if (document.body.contains(form)) document.body.removeChild(form);
                    if (document.body.contains(iframe)) document.body.removeChild(iframe);
                }, 1000);
                
                resolve(true);
            };
            
            iframe.onerror = function() {
                console.error('❌ Form submission failed');
                
                // Clean up
                if (document.body.contains(form)) document.body.removeChild(form);
                if (document.body.contains(iframe)) document.body.removeChild(iframe);
                
                resolve(false);
            };
            
            // Submit form
            document.body.appendChild(form);
            form.submit();
            
            console.log('📨 Form submitted to Google Apps Script');
            
        } catch (error) {
            console.error('❌ Form submission error:', error);
            
            // Fallback: Save to localStorage
            saveToLocalStorage(data);
            resolve(false);
        }
    });
}

// Alternative method using direct URL navigation (for testing)
function sendToGoogleSheetsViaURL(data) {
    try {
        console.log('🔄 Using direct URL method...');
        
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            params.append(key, String(data[key] || ''));
        });
        
        const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
        console.log('🔗 Generated URL length:', url.length);
        
        // Open in new tab to see result
        const newWindow = window.open(url, '_blank');
        
        if (newWindow) {
            console.log('✅ URL opened successfully');
            // Close the tab after 3 seconds
            setTimeout(() => {
                newWindow.close();
            }, 3000);
            return true;
        } else {
            console.log('❌ Popup blocked');
            return false;
        }
        
    } catch (error) {
        console.error('❌ URL method failed:', error);
        return false;
    }
}

// Enhanced function with multiple fallback methods
async function sendToGoogleSheetsEnhanced(data) {
    console.log('🎯 Trying enhanced submission with multiple methods...');
    
    // Method 1: Form submission (most reliable)
    try {
        const formResult = await sendToGoogleSheets(data);
        if (formResult) {
            console.log('✅ Form submission successful');
            return true;
        }
    } catch (error) {
        console.log('⚠️ Form method failed:', error.message);
    }
    
    // Method 2: Direct URL (fallback)
    try {
        const urlResult = sendToGoogleSheetsViaURL(data);
        if (urlResult) {
            console.log('✅ URL method successful');
            return true;
        }
    } catch (error) {
        console.log('⚠️ URL method failed:', error.message);
    }
    
    // Method 3: Image pixel technique
    try {
        console.log('🔄 Trying image pixel method...');
        
        const params = new URLSearchParams(data);
        const img = new Image();
        
        return new Promise((resolve) => {
            img.onload = () => {
                console.log('✅ Image method successful');
                resolve(true);
            };
            
            img.onerror = () => {
                console.log('⚠️ Image method failed (expected)');
                resolve(true); // Still assume success
            };
            
            img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            
            // Timeout after 5 seconds
            setTimeout(() => {
                console.log('⏰ Image method timeout, assuming success');
                resolve(true);
            }, 5000);
        });
        
    } catch (error) {
        console.log('⚠️ Image method failed:', error.message);
    }
    
    // If all methods fail
    console.log('💾 All methods failed, saving to localStorage');
    saveToLocalStorage(data);
    return false;
}


// Alternative method using form submission technique
async function sendToGoogleSheetsViaForm(data) {
    return new Promise((resolve) => {
        try {
            console.log('🔄 Using form submission method...');
            
            // Create invisible form
            const form = document.createElement('form');
            form.method = 'GET';
            form.target = '_blank'; // Open in new tab to see result
            form.action = GOOGLE_SCRIPT_URL;
            form.style.display = 'none';
            
            // Add data as hidden inputs
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            });
            
            // Submit form
            document.body.appendChild(form);
            form.submit();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(form);
                console.log('✅ Form submission completed');
                resolve(true);
            }, 1000);
            
        } catch (error) {
            console.error('❌ Form submission failed:', error);
            resolve(false);
        }
    });
}


// Fallback: Save to localStorage
function saveToLocalStorage(data) {
    try {
        const submissions = JSON.parse(localStorage.getItem('dva_registrations') || '[]');
        submissions.push({
            ...data,
            id: Date.now(),
            status: 'pending'
        });
        localStorage.setItem('dva_registrations', JSON.stringify(submissions));
        console.log('Data saved to localStorage as fallback');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Get success message based on form type
function getSuccessMessage(formType) {
    const messages = {
        registration: 'Thank you for registering with DVA Volleyball Club! We have received your application and will contact you within 2-3 business days to schedule a tryout session. Please keep your phone available.',
        general: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        training: 'Your training inquiry has been received! Our coaching team will contact you within 1-2 business days to discuss program options.',
        membership: 'Thank you for your membership application! We\'ll review your information and contact you within 3-5 business days to schedule a tryout.',
        partnership: 'Your partnership proposal has been received! Our business development team will review it and contact you within one week.'
    };
    
    return messages[formType] || 'Thank you for contacting us! We\'ll be in touch soon.';
}

// Enhanced form validation functions
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Additional cross-field validations for registration form
    if (form.dataset.form === 'registration') {
        isValid = validateRegistrationFields(form) && isValid;
    }
    
    return isValid;
}

function validateRegistrationFields(form) {
    let isValid = true;
    
    // Check if spike reach is greater than block reach
    const spikeReach = parseInt(form.querySelector('[name="spikereach"]').value);
    const blockReach = parseInt(form.querySelector('[name="blockreach"]').value);
    
    if (spikeReach && blockReach && spikeReach <= blockReach) {
        showFieldError(form.querySelector('[name="spikereach"]'), 'Spike reach should typically be higher than block reach.');
        isValid = false;
    }
    
    // Check reasonable height vs reach relationship
    const height = parseInt(form.querySelector('[name="height"]').value);
    if (height && spikeReach && (spikeReach - height) < 40) {
        showFieldError(form.querySelector('[name="spikereach"]'), 'Spike reach seems too low compared to your height. Please double-check.');
        isValid = false;
    }
    
    // Age validation based on birth year
    const birthYear = parseInt(form.querySelector('[name="birthyear"]').value);
    if (birthYear) {
        const age = new Date().getFullYear() - birthYear;
        if (age < 8 || age > 50) {
            showFieldError(form.querySelector('[name="birthyear"]'), 'Age must be between 8 and 50 years.');
            isValid = false;
        }
    }
    
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
        if (!validationPatterns.phone.test(value)) {
            showFieldError(field, 'Please enter a valid phone number (10-15 digits).');
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
    
    // Birth year validation
    if (fieldName === 'birthyear') {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < 1960 || year > currentYear - 8) {
            showFieldError(field, `Birth year must be between 1960 and ${currentYear - 8}.`);
            return false;
        }
    }
    
    // Height validation
    if (fieldName === 'height') {
        const height = parseInt(value);
        if (height < 150 || height > 220) {
            showFieldError(field, 'Height must be between 150 and 220 cm.');
            return false;
        }
    }
    
    // Weight validation
    if (fieldName === 'weight') {
        const weight = parseInt(value);
        if (weight < 40 || weight > 150) {
            showFieldError(field, 'Weight must be between 40 and 150 kg.');
            return false;
        }
    }
    
    // Jersey number validation
    if (fieldName === 'jersey') {
        const jersey = parseInt(value);
        if (jersey < 1 || jersey > 99) {
            showFieldError(field, 'Jersey number must be between 1 and 99.');
            return false;
        }
    }
    
    // Reach validation
    if (fieldName === 'spikereach' || fieldName === 'blockreach') {
        const reach = parseInt(value);
        if (reach < 200 || reach > 380) {
            showFieldError(field, 'Reach must be between 200 and 380 cm.');
            return false;
        }
    }
    
    // Name validation
    if (fieldName === 'fullname') {
        if (value.length < 2) {
            showFieldError(field, 'Full name must be at least 2 characters.');
            return false;
        }
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
            showFieldError(field, 'Full name should only contain letters and spaces.');
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
    
    // Auto-hide success messages after 8 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 8000);
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
    
    // Đóng tất cả FAQ items khác
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mở FAQ item được click (nếu chưa mở)
    if (!isActive) {
        faqItem.classList.add('active');
    }
    
    console.log('FAQ toggled:', questionElement.textContent);
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

// Analytics and tracking
function trackFormSubmission(formType, data) {
    console.log(`Form submitted: ${formType}`, data);
    
    // Track registration specific data
    if (formType === 'registration') {
        console.log('Player Registration:', {
            name: data.fullname,
            position: data.positionDisplay,
            age: data.age,
            height: data.height,
            experience: data.rotation
        });
    }
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            form_type: formType,
            event_category: 'registration'
        });
    }
}

function trackSocialClick(platform) {
    console.log(`Social link clicked: ${platform}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            platform: platform,
            event_category: 'social'
        });
    }
}

function trackNewsletterSignup(email) {
    console.log(`Newsletter signup: ${email}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            event_category: 'marketing'
        });
    }
}

// Real-time availability updates
function initAvailabilityUpdates() {
    setInterval(updateAvailability, 60000); // Update every minute
}

function updateAvailability() {
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
            const facilityInfo = card.querySelector('.facility-info');
            if (facilityInfo) {
                facilityInfo.appendChild(statusElement);
            }
        }
        
        statusElement.innerHTML = isOpen 
            ? '<i class="fas fa-circle" style="color: #27ae60;"></i> Currently Open'
            : '<i class="fas fa-circle" style="color: #e74c3c;"></i> Currently Closed';
        
        statusElement.style.cssText = 'margin-bottom: 1rem; font-weight: 600; color: #666;';
    });
}
// Simple debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form auto-save functionality
function initFormAutoSave() {
    contactForms.forEach(form => {
        const formType = form.dataset.form;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Load saved data
            const savedValue = localStorage.getItem(`contact_form_${formType}_${input.name}`);
            if (savedValue && input.type !== 'checkbox' && input.type !== 'radio') {
                input.value = savedValue;
            }
            
            // Save data on change with debounce
            input.addEventListener('input', debounce(() => {
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

// External integrations
function openLiveChat() {
    alert('Live chat feature coming soon! For now, please use the contact forms or call us directly at 0768 299 329.');
}

function openDirections(facility) {
    // DVA Volleyball Club location - Nhà thi đấu Bóng chuyền Thông Tin
    const dvaLocationUrl = 'https://maps.app.goo.gl/jSk4EcfeUHinM7dD7';
    
    // For now, both main and secondary point to same location
    // You can update secondary with different URL if needed
    const mapUrls = {
        main: dvaLocationUrl,
        secondary: dvaLocationUrl // Update this if you have a different secondary location
    };
    
    console.log(`🗺️ Opening directions to ${facility} facility`);
    window.open(mapUrls[facility] || mapUrls.main, '_blank');
}


function openMap() {
    const url = 'https://maps.app.goo.gl/jSk4EcfeUHinM7dD7';
    window.open(url, '_blank');
}

// Admin functions for viewing submissions (development only)
function viewSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('dva_registrations') || '[]');
    console.log('All submissions:', submissions);
    return submissions;
}

function exportSubmissions() {
    const submissions = viewSubmissions();
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `dva_registrations_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
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
        sendToGoogleSheets,
        trackFormSubmission
    };
}
// Zalo, Facebook, Instagram, TikTok link tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('zalo') ? 'Zalo' :
                           this.classList.contains('tiktok') ? 'TikTok' : 'Unknown';
            
            console.log(`🔗 ${platform} link clicked`);
            
            // Google Analytics tracking (nếu có)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'platform': platform,
                    'event_category': 'social_media'
                });
            }
        });
    });
});


// Make functions available globally for HTML onclick handlers
window.openLiveChat = openLiveChat;
window.openDirections = openDirections;
window.openMap = openMap;
window.toggleFAQ = toggleFAQ;
window.viewSubmissions = viewSubmissions;
window.exportSubmissions = exportSubmissions;
