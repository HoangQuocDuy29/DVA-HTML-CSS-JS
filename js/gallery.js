// Gallery page functionality

// Gallery data
const galleryData = [
    {
        id: 1,
        title: "Championship Victory Celebration",
        category: "awards",
        date: "2025-10-08",
        description: "Team celebrating our regional championship victory with the trophy.",
        image: "images/gallery/championship-trophy.jpg",
        thumbnail: "images/gallery/thumbs/championship-trophy-thumb.jpg"
    },
    {
        id: 2,
        title: "Intense Training Session",
        category: "training",
        date: "2025-10-05",
        description: "Players during an intense training session focusing on spike techniques.",
        image: "images/gallery/training-session.jpg",
        thumbnail: "images/gallery/thumbs/training-session-thumb.jpg"
    },
    {
        id: 3,
        title: "Team Building Event",
        category: "events",
        date: "2025-10-03",
        description: "Annual team building event strengthening bonds between players.",
        image: "images/gallery/team-building.jpg",
        thumbnail: "images/gallery/thumbs/team-building-thumb.jpg"
    },
    {
        id: 4,
        title: "Match Point Victory",
        category: "matches",
        date: "2025-10-01",
        description: "The decisive moment that secured our championship victory.",
        image: "images/gallery/match-point.jpg",
        thumbnail: "images/gallery/thumbs/match-point-thumb.jpg"
    },
    {
        id: 5,
        title: "DVA Middle Team 2025",
        category: "team",
        date: "2025-09-28",
        description: "Official team photo of DVA Middle Team for the 2025 season.",
        image: "images/gallery/team-photo.jpg",
        thumbnail: "images/gallery/thumbs/team-photo-thumb.jpg"
    },
    {
        id: 6,
        title: "Blocking Practice",
        category: "training",
        date: "2025-09-25",
        description: "Players practicing blocking techniques at the net.",
        image: "images/gallery/blocking-practice.jpg",
        thumbnail: "images/gallery/thumbs/blocking-practice-thumb.jpg"
    },
    {
        id: 7,
        title: "Community Volleyball Festival",
        category: "events",
        date: "2025-09-22",
        description: "DVA Club hosting the annual community volleyball festival.",
        image: "images/gallery/community-festival.jpg",
        thumbnail: "images/gallery/thumbs/community-festival-thumb.jpg"
    },
    {
        id: 8,
        title: "Championship Finals",
        category: "matches",
        date: "2025-09-20",
        description: "Action shot from the championship finals match.",
        image: "images/gallery/finals-action.jpg",
        thumbnail: "images/gallery/thumbs/finals-action-thumb.jpg"
    },
    {
        id: 9,
        title: "Golden Medal Ceremony",
        category: "awards",
        date: "2025-09-18",
        description: "Medal ceremony after winning the regional championship.",
        image: "images/gallery/medal-ceremony.jpg",
        thumbnail: "images/gallery/thumbs/medal-ceremony-thumb.jpg"
    },
    {
        id: 10,
        title: "Junior Team Training",
        category: "training",
        date: "2025-09-15",
        description: "Junior team members during their weekly training session.",
        image: "images/gallery/junior-training.jpg",
        thumbnail: "images/gallery/thumbs/junior-training-thumb.jpg"
    },
    {
        id: 11,
        title: "Setter Training Focus",
        category: "training",
        date: "2025-09-12",
        description: "Specialized training session for setters improving their technique.",
        image: "images/gallery/setter-training.jpg",
        thumbnail: "images/gallery/thumbs/setter-training-thumb.jpg"
    },
    {
        id: 12,
        title: "Team Celebration Dinner",
        category: "team",
        date: "2025-09-10",
        description: "Team dinner celebrating our successful season.",
        image: "images/gallery/team-dinner.jpg",
        thumbnail: "images/gallery/thumbs/team-dinner-thumb.jpg"
    }
];

// State management
let currentFilter = 'all';
let filteredPhotos = [];
let displayedPhotos = [];
let photosPerPage = 8;
let currentPage = 1;
let currentPhotoIndex = 0;

// DOM elements
let filterTabs, galleryGrid, loadMoreBtn, photoModal, modalImage, modalTitle, modalDescription, modalDate, modalCategory;

// Initialize gallery page
function initGalleryPage() {
    // Get DOM elements
    filterTabs = document.querySelectorAll('.filter-tab');
    galleryGrid = document.getElementById('gallery-grid');
    loadMoreBtn = document.getElementById('load-more-photos');
    photoModal = document.getElementById('photo-modal');
    modalImage = document.getElementById('modal-image');
    modalTitle = document.getElementById('modal-title');
    modalDescription = document.getElementById('modal-description');
    modalDate = document.getElementById('modal-date');
    modalCategory = document.getElementById('modal-category');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderGallery();
}

// Set up event listeners
function setupEventListeners() {
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterChange);
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePhotos);
    }
    
    // Modal controls
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    if (modalClose) {
        modalClose.addEventListener('click', closePhotoModal);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', showPreviousPhoto);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', showNextPhoto);
    }
    
    // Close modal on overlay click
    if (photoModal) {
        photoModal.addEventListener('click', (e) => {
            if (e.target === photoModal) {
                closePhotoModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Handle filter change
function handleFilterChange(e) {
    const newFilter = e.target.dataset.category;
    if (newFilter !== currentFilter) {
        currentFilter = newFilter;
        
        // Update active tab
        filterTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Reset and render
        currentPage = 1;
        renderGallery();
    }
}

// Filter photos based on category
function filterPhotos() {
    if (currentFilter === 'all') {
        return galleryData;
    }
    return galleryData.filter(photo => photo.category === currentFilter);
}

// Create photo card HTML
function createPhotoCard(photo, index) {
    return `
        <div class="photo-card fade-in" data-photo-index="${index}">
            <div class="photo-image">
                <img src="${photo.thumbnail || photo.image}" alt="${photo.title}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder-image" style="display: none;">
                    <i class="fas fa-image"></i>
                    <span>Photo</span>
                </div>
            </div>
            <div class="photo-overlay">
                <div class="photo-title">${photo.title}</div>
                <div class="photo-meta">
                    <span class="photo-date">${formatDate(photo.date)}</span>
                    <span class="photo-category">${photo.category}</span>
                </div>
            </div>
        </div>
    `;
}

// Render gallery grid
function renderGallery() {
    if (!galleryGrid) return;
    
    // Show loading state
    galleryGrid.innerHTML = `
        <div class="loading-photos">
            <i class="fas fa-spinner"></i>
            <p>Loading photos...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        filteredPhotos = filterPhotos();
        const photosToShow = filteredPhotos.slice(0, currentPage * photosPerPage);
        
        if (photosToShow.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-images"></i>
                    <h3>No photos found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        // Render photo cards
        galleryGrid.innerHTML = photosToShow.map((photo, index) => createPhotoCard(photo, index)).join('');
        
        // Update load more button
        if (photosToShow.length >= filteredPhotos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // Add click event listeners
        galleryGrid.querySelectorAll('.photo-card').forEach(card => {
            card.addEventListener('click', () => {
                const photoIndex = parseInt(card.dataset.photoIndex);
                showPhotoModal(photoIndex);
            });
        });
        
        // Trigger fade in animation
        setTimeout(() => {
            galleryGrid.querySelectorAll('.fade-in').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
        
    }, 500);
}

// Load more photos
function loadMorePhotos() {
    currentPage++;
    renderGallery();
}

// Show photo modal
function showPhotoModal(photoIndex) {
    if (!photoModal || !filteredPhotos[photoIndex]) return;
    
    currentPhotoIndex = photoIndex;
    const photo = filteredPhotos[photoIndex];
    
    // Update modal content
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    modalDate.textContent = formatDate(photo.date);
    modalCategory.textContent = photo.category.charAt(0).toUpperCase() + photo.category.slice(1);
    
    // Show modal
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close photo modal
function closePhotoModal() {
    if (!photoModal) return;
    
    photoModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Show previous photo
function showPreviousPhoto() {
    if (currentPhotoIndex > 0) {
        showPhotoModal(currentPhotoIndex - 1);
    } else {
        showPhotoModal(filteredPhotos.length - 1);
    }
}

// Show next photo
function showNextPhoto() {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
        showPhotoModal(currentPhotoIndex + 1);
    } else {
        showPhotoModal(0);
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (!photoModal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closePhotoModal();
            break;
        case 'ArrowLeft':
            showPreviousPhoto();
            break;
        case 'ArrowRight':
            showNextPhoto();
            break;
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Export functions
function exportGalleryData() {
    return {
        total: galleryData.length,
        filtered: filteredPhotos.length,
        displayed: currentPage * photosPerPage,
        currentFilter,
        currentPage,
        categories: [...new Set(galleryData.map(p => p.category))]
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGalleryPage();
});

// Make functions available globally
window.closePhotoModal = closePhotoModal;
window.showPreviousPhoto = showPreviousPhoto;
window.showNextPhoto = showNextPhoto;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGalleryPage,
        filterPhotos,
        createPhotoCard,
        exportGalleryData
    };
}
