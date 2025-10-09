// Donate page functionality

// Mock donation data (in production, this would come from API)
const donationData = [
    {
        id: 1,
        name: "Trần Thị A",
        avatar: "images/avatars/donor1.jpg",
        amount: 5000000,
        time: "2025-10-02T10:30:00Z",
        message: "Chúc CLB DVA ngày càng phát triển!",
        isTop: true,
        rank: 1
    },
    {
        id: 2,
        name: "Nguyễn Văn B",
        avatar: "images/avatars/donor2.jpg",
        amount: 2500000,
        time: "2025-10-07T14:20:00Z",
        message: "Ủng hộ đội bóng chuyền DVA",
        isTop: true,
        rank: 2
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "images/avatars/donor3.jpg",
        amount: 1800000,
        time: "2025-10-06T09:15:00Z",
        message: "Mong CLB có thêm nhiều thành tích tốt",
        isTop: true,
        rank: 3
    },
    {
        id: 4,
        name: "Phạm Thị D",
        avatar: "images/avatars/donor4.jpg",
        amount: 1500000,
        time: "2025-10-08T16:45:00Z",
        message: "Ủng hộ các bạn trẻ yêu thể thao",
        isTop: false,
        rank: 4
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        avatar: "images/avatars/donor5.jpg",
        amount: 1200000,
        time: "2025-10-05T11:30:00Z",
        message: "Chúc DVA Club thành công",
        isTop: false,
        rank: 5
    },
    {
        id: 6,
        name: "Ngô Thị F",
        avatar: "images/avatars/donor6.jpg",
        amount: 1000000,
        time: "2025-10-09T08:20:00Z",
        message: "Ủng hộ phong trào bóng chuyền",
        isTop: false,
        rank: 6
    },
    {
        id: 7,
        name: "Đinh Văn G",
        avatar: "images/avatars/donor7.jpg",
        amount: 800000,
        time: "2025-10-04T13:10:00Z",
        message: "Chúc các em có nhiều cup vàng",
        isTop: false,
        rank: 7
    },
    {
        id: 8,
        name: "Vũ Thị H",
        avatar: "images/avatars/donor8.jpg",
        amount: 750000,
        time: "2025-10-03T15:40:00Z",
        message: "Ủng hộ CLB DVA volleyball",
        isTop: false,
        rank: 8
    },
    {
        id: 9,
        name: "Bùi Văn I",
        avatar: "images/avatars/donor9.jpg",
        amount: 600000,
        time: "2025-10-08T12:25:00Z",
        message: "Mong DVA phát triển mạnh",
        isTop: false,
        rank: 9
    },
    {
        id: 10,
        name: "Đỗ Thị K",
        avatar: "images/avatars/donor10.jpg",
        amount: 500000,
        time: "2025-10-07T17:30:00Z",
        message: "Chúc DVA thành công rực rỡ",
        isTop: false,
        rank: 10
    },
    {
        id: 11,
        name: "Anonymous",
        avatar: null,
        amount: 300000,
        time: "2025-10-09T14:15:00Z",
        message: "Ủng hộ thầm lặng",
        isTop: false,
        rank: 11
    },
    {
        id: 12,
        name: "Lý Văn L",
        avatar: "images/avatars/donor12.jpg",
        amount: 250000,
        time: "2025-10-06T19:50:00Z",
        message: "Ủng hộ đam mê bóng chuyền",
        isTop: false,
        rank: 12
    }
];

// State management
let currentFilter = 'all';
let currentSort = 'amount';
let displayedDonations = [];
let selectedAmount = null;
let donationsPerPage = 8;
let currentPage = 1;

// DOM elements
let filterBtns, donationsList, loadMoreBtn;

// Initialize donate page
function initDonatePage() {
    // Get DOM elements
    filterBtns = document.querySelectorAll('.filter-btn');
    donationsList = document.getElementById('donations-list');
    loadMoreBtn = document.getElementById('load-more-donations');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize donation display
    renderDonations();
    
    // Update hero stats
    updateHeroStats();
    
    // Animate numbers on page load
    animateCounters();
    
    console.log('💰 Donate page initialized');
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreDonations);
    }
    
    // Quick amount buttons (set up in HTML with onclick)
    document.querySelectorAll('.amount-btn').forEach(btn => {
        if (!btn.classList.contains('custom')) {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount || e.target.textContent.replace(/[^0-9]/g, ''));
                selectAmount(amount);
            });
        }
    });
    
    // Custom amount input
    const customAmountInput = document.getElementById('custom-amount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', formatAmountInput);
        customAmountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                confirmCustomAmount();
            }
        });
    }
}

// Handle filter change
function handleFilterChange(e) {
    const newFilter = e.target.dataset.period;
    if (newFilter !== currentFilter) {
        currentFilter = newFilter;
        
        // Update active filter
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Reset pagination
        currentPage = 1;
        
        // Re-render donations
        renderDonations();
        
        console.log('📊 Filter changed to:', currentFilter);
    }
}

// Filter donations based on time period
function filterDonations() {
    const now = new Date();
    let filtered = [...donationData];
    
    switch (currentFilter) {
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = donationData.filter(donation => new Date(donation.time) >= weekAgo);
            break;
        case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            filtered = donationData.filter(donation => new Date(donation.time) >= monthAgo);
            break;
        case 'all':
        default:
            // No filtering needed
            break;
    }
    
    return filtered;
}

// Sort donations
function sortDonations(donations) {
    return donations.sort((a, b) => {
        switch (currentSort) {
            case 'amount':
                return b.amount - a.amount;
            case 'recent':
                return new Date(b.time) - new Date(a.time);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return b.amount - a.amount;
        }
    });
}

// Handle sort change
function sortDonations(sortType) {
    currentSort = sortType;
    currentPage = 1;
    renderDonations();
    console.log('🔄 Sort changed to:', sortType);
}

// Render donations list
function renderDonations() {
    if (!donationsList) return;
    
    // Get filtered and sorted donations
    let filtered = filterDonations();
    let sorted = sortDonations(filtered);
    
    // Get non-top donations for the list
    const listDonations = sorted.filter(d => !d.isTop);
    const donationsToShow = listDonations.slice(0, currentPage * donationsPerPage);
    
    // Render donation items
    donationsList.innerHTML = donationsToShow.map((donation, index) => 
        createDonationItemHTML(donation, index + 4) // Start from rank 4 since top 3 are shown separately
    ).join('');
    
    // Update load more button
    if (donationsToShow.length >= listDonations.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // Animate items
    setTimeout(() => {
        donationsList.querySelectorAll('.donation-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }, 100);
}

// Create donation item HTML
function createDonationItemHTML(donation, rank) {
    return `
        <div class="donation-item" style="opacity: 0; transform: translateX(-20px); transition: all 0.3s ease;">
            <div class="donation-rank">${rank}</div>
            <div class="donation-avatar">
                <img src="${donation.avatar || 'images/avatars/default.jpg'}" alt="${donation.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="avatar-placeholder" style="display: none;">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <div class="donor-details">
                <div class="donor-name">${donation.name}</div>
                ${donation.message ? `<div class="donor-message">"${donation.message}"</div>` : ''}
            </div>
            <div class="donation-info">
                <div class="donation-amount">${formatCurrency(donation.amount)}</div>
                <div class="donation-time">${formatTimeAgo(donation.time)}</div>
            </div>
        </div>
    `;
}

// Load more donations
function loadMoreDonations() {
    currentPage++;
    renderDonations();
}

// Update hero statistics
function updateHeroStats() {
    const totalAmount = donationData.reduce((sum, donation) => sum + donation.amount, 0);
    const totalDonors = donationData.length;
    
    // Update DOM elements
    const totalDonorsElement = document.getElementById('total-donors');
    const totalAmountElement = document.getElementById('total-amount');
    
    if (totalDonorsElement) {
        totalDonorsElement.textContent = totalDonors;
    }
    
    if (totalAmountElement) {
        totalAmountElement.textContent = formatCurrencyShort(totalAmount);
    }
}

// Amount selection functions
function selectAmount(amount) {
    selectedAmount = amount;
    
    // Update button states
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Find and select the clicked button
    const clickedBtn = Array.from(document.querySelectorAll('.amount-btn')).find(btn => {
        const btnAmount = parseInt(btn.textContent.replace(/[^0-9]/g, '')) * (btn.textContent.includes('K') ? 1000 : (btn.textContent.includes('M') ? 1000000 : 1));
        return btnAmount === amount;
    });
    
    if (clickedBtn) {
        clickedBtn.classList.add('selected');
    }
    
    // Show selected amount
    const selectedAmountElement = document.getElementById('selected-amount');
    const amountDisplayElement = document.getElementById('amount-display');
    
    if (selectedAmountElement && amountDisplayElement) {
        selectedAmountElement.style.display = 'inline-flex';
        amountDisplayElement.textContent = formatCurrency(amount);
    }
    
    console.log('💰 Amount selected:', formatCurrency(amount));
}

// Show custom amount modal
function showCustomAmount() {
    const modal = document.getElementById('amount-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('custom-amount');
            if (input) {
                input.focus();
            }
        }, 300);
    }
}

// Close custom amount modal
function closeAmountModal() {
    const modal = document.getElementById('amount-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Set custom amount suggestion
function setCustomAmount(amount) {
    const input = document.getElementById('custom-amount');
    if (input) {
        input.value = amount.toLocaleString('vi-VN');
        formatAmountInput();
    }
}

// Format amount input as user types
function formatAmountInput() {
    const input = document.getElementById('custom-amount');
    if (input) {
        const value = input.value.replace(/[^0-9]/g, '');
        if (value) {
            input.value = parseInt(value).toLocaleString('vi-VN');
        }
    }
}

// Confirm custom amount
function confirmCustomAmount() {
    const input = document.getElementById('custom-amount');
    if (input && input.value) {
        const amount = parseInt(input.value.replace(/[^0-9]/g, ''));
        
        if (amount < 10000) {
            alert('Số tiền tối thiểu là 10,000 VNĐ');
            return;
        }
        
        if (amount > 100000000) {
            alert('Số tiền tối đa là 100,000,000 VNĐ');
            return;
        }
        
        selectAmount(amount);
        closeAmountModal();
        
        // Clear input
        input.value = '';
    }
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Find the clicked button and show feedback
        const buttons = document.querySelectorAll('.copy-btn');
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes(text)) {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2000);
            }
        });
        
        // Show toast notification
        showToast('Đã sao chép: ' + text);
        
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('Không thể sao chép. Vui lòng thử lại.');
    });
}

// Social sharing functions
function shareOnSocial(platform) {
    const url = window.location.href;
    const text = 'Hãy cùng ủng hộ DVA Volleyball Club - nơi nuôi dưỡng tài năng và đạt được những chiến thắng!';
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        case 'zalo':
            shareUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatCurrencyShort(amount) {
    if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(1) + 'B';
    } else if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toString();
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'vừa xong';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ trước`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày trước`;
    } else {
        return date.toLocaleDateString('vi-VN');
    }
}

// Toast notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.hero-stats .number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const targetValue = parseFloat(target);
            let current = 0;
            const increment = targetValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                }
                counter.textContent = current.toFixed(1);
            }, 50);
        }
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe support cards
    document.querySelectorAll('.support-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe donation cards
    document.querySelectorAll('.donation-card').forEach(card => {
        observer.observe(card);
    });
}

// Add CSS for scroll animations
function addScrollAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .support-card,
        .donation-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .support-card.animate-in,
        .donation-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDonatePage();
    initScrollAnimations();
    addScrollAnimationCSS();
});

// Make functions globally available
window.selectAmount = selectAmount;
window.showCustomAmount = showCustomAmount;
window.closeAmountModal = closeAmountModal;
window.setCustomAmount = setCustomAmount;
window.confirmCustomAmount = confirmCustomAmount;
window.copyToClipboard = copyToClipboard;
window.shareOnSocial = shareOnSocial;
window.sortDonations = sortDonations;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDonatePage,
        selectAmount,
        formatCurrency,
        formatTimeAgo,
        donationData
    };
}

// Auto-refresh donation data every 5 minutes (in production)
setInterval(() => {
    console.log('🔄 Auto-refreshing donation data...');
    // In production, this would fetch from API
    renderDonations();
    updateHeroStats();
}, 5 * 60 * 1000);
