// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add theme buttons to navbar
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const themeButtons = document.createElement('li');
        themeButtons.className = 'theme-buttons';
        themeButtons.innerHTML = `
            <button id="darkMode" class="theme-btn">Dark</button>
            <button id="redMode" class="theme-btn">Red</button>
            <button id="defaultMode" class="theme-btn">Default</button>
        `;
        navLinks.appendChild(themeButtons);
    }

    // Initialize theme buttons
    const darkBtn = document.getElementById('darkMode');
    const redBtn = document.getElementById('redMode');
    const defaultBtn = document.getElementById('defaultMode');

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }

    // Theme button click handlers
    if (darkBtn) {
        darkBtn.addEventListener('click', function() {
            document.body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        });
    }

    if (redBtn) {
        redBtn.addEventListener('click', function() {
            document.body.className = 'red-theme';
            localStorage.setItem('theme', 'red-theme');
        });
    }

    if (defaultBtn) {
        defaultBtn.addEventListener('click', function() {
            document.body.className = '';
            localStorage.setItem('theme', '');
        });
    }

    // Existing hamburger menu functionality (if any)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});
