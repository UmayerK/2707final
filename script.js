document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    allNavLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Initialize page-specific functionality
    initializePageFunctions();

    const video = document.getElementById('heroVideo');
    if (video) {
        console.log("Video element found");
        
        // Log the video source
        console.log("Video source:", video.currentSrc);
        
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Video playing successfully");
            }).catch(error => {
                console.error("Error playing video:", error);
            });
        }
        
        // Add event listeners to monitor video state
        video.addEventListener('playing', () => {
            console.log("Video is playing");
        });
        
        video.addEventListener('error', (e) => {
            console.error("Video error:", video.error);
        });
    } else {
        console.error("Video element not found");
    }
});

function initializePageFunctions() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'quote.html':
            initializeQuotePage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'news.html':
            initializeNewsPage();
            break;
        case 'products.html':
            initializeProductsPage();
            break;
    }
}

// Quote Page Functions
function initializeQuotePage() {
    const quoteForm = document.querySelector('.quote-form');
    const brandSelect = document.getElementById('brand');
    
    if (quoteForm && brandSelect) {
        brandSelect.addEventListener('change', handleBrandChange);
        quoteForm.addEventListener('submit', handleQuoteSubmission);
    }
}

function handleBrandChange(e) {
    const brand = e.target.value;
    const modelSelect = document.getElementById('model');
    const sizeSelect = document.getElementById('size');
    const materialSelect = document.getElementById('material');

    // Product data object
    const productData = {
        rolex: {
            models: ['Submariner', 'Daytona', 'GMT-Master II'],
            sizes: ['40mm', '41mm', '42mm'],
            materials: ['Stainless Steel', 'Yellow Gold', 'White Gold']
        },
        patek: {
            models: ['Nautilus', 'Calatrava', 'Grand Complications'],
            sizes: ['37mm', '39mm', '41mm'],
            materials: ['Rose Gold', 'Platinum', 'White Gold']
        },
        ap: {
            models: ['Royal Oak', 'Royal Oak Offshore', 'Code 11.59'],
            sizes: ['37mm', '41mm', '44mm'],
            materials: ['Stainless Steel', 'Rose Gold', 'Ceramic']
        }
    };

    if (productData[brand]) {
        updateSelect(modelSelect, productData[brand].models);
        updateSelect(sizeSelect, productData[brand].sizes);
        updateSelect(materialSelect, productData[brand].materials);
    }
}

// Contact Page Functions
function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
}

// News Page Functions
function initializeNewsPage() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

// Products Page Functions
function initializeProductsPage() {
    const filterForm = document.querySelector('.filter-form');
    
    if (filterForm) {
        filterForm.addEventListener('change', updateProductDisplay);
    }
}

// Utility Functions
function updateSelect(selectElement, options) {
    if (!selectElement) return;
    
    selectElement.innerHTML = '<option value="">Select an option</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase().replace(/\s+/g, '-');
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

async function handleQuoteSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Quote request submitted successfully! We will contact you soon.');
        form.reset();
    } catch (error) {
        console.error('Quote submission error:', error);
        alert('Error submitting quote request. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Quote';
    }
}

async function handleContactSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Message sent successfully! We will respond shortly.');
        form.reset();
    } catch (error) {
        console.error('Contact submission error:', error);
        alert('Error sending message. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}

async function handleNewsletterSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Successfully subscribed to newsletter!');
        form.reset();
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert('Error subscribing to newsletter. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }
}

function updateProductDisplay() {
    // Add product filtering logic here
    console.log('Updating product display...');
}
