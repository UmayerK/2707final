// API credentials
const API_ID = '27592b62-0735-4a6e-ab3a-22712065e7b5';
const API_KEY = '88382185-0200-4642-8d99-d144e293e1a9';

// Function to generate random image
function generateRandomImage() {
    // Array of luxury watch brands for random insertion
    const watchBrands = ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega', 'Cartier', 'Vacheron Constantin', 'IWC', 'Jaeger-LeCoultre'];
    
    // Array of luxury-themed taglines
    const taglines = [
        'Timeless Elegance',
        'Mastery of Time',
        'Precision & Luxury',
        'Heritage of Excellence',
        'Crafted Perfection',
        'Horological Excellence',
        'Ultimate Sophistication',
        'Luxury Defined'
    ];

    // Array of background gradients
    const gradients = [
        'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        'linear-gradient(45deg, #2c3e50, #3498db)',
        'linear-gradient(45deg, #000000, #434343)',
        'linear-gradient(45deg, #614385, #516395)',
        'linear-gradient(45deg, #141E30, #243B55)',
        'linear-gradient(to right, #000046, #1CB5E0)',
        'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        'linear-gradient(to right, #780206, #061161)'
    ];

    const randomStyles = [
        {
            html: `<div style="
                background: ${gradients[Math.floor(Math.random() * gradients.length)]};
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                font-family: 'Playfair Display', serif;
            ">
                <h1 style="color: gold; font-size: 42px; margin-bottom: 20px;">
                    ${watchBrands[Math.floor(Math.random() * watchBrands.length)]}
                </h1>
                <p style="color: white; font-size: 24px;">
                    ${taglines[Math.floor(Math.random() * taglines.length)]}
                </p>
                <p style="color: #ddd; font-size: 18px; margin-top: 20px;">
                    ${new Date().toLocaleDateString()}
                </p>
            </div>`,
            css: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');`
        },
        {
            html: `<div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
                border: 4px solid ${['#gold', '#silver', '#1a1a1a'][Math.floor(Math.random() * 3)]};
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            ">
                <h1 style="color: #1a1a1a; font-size: 38px; margin-bottom: 20px;">
                    ${watchBrands[Math.floor(Math.random() * watchBrands.length)]}
                </h1>
                <p style="color: #666; font-size: 22px;">
                    ${taglines[Math.floor(Math.random() * taglines.length)]}
                </p>
                <div style="margin-top: 20px; font-size: 16px; color: #999;">
                    Est. ${Math.floor(Math.random() * (2024 - 1800 + 1) + 1800)}
                </div>
            </div>`,
            css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');`
        }
    ];

    const randomStyle = randomStyles[Math.floor(Math.random() * randomStyles.length)];
    
    fetch('https://hcti.io/v1/image', {
        method: 'POST',
        body: JSON.stringify({
            html: randomStyle.html,
            css: randomStyle.css,
            google_fonts: "Roboto|Playfair Display|Montserrat"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(API_ID + ":" + API_KEY)
        }
    })
    .then(response => response.json())
    .then(imageData => {
        document.getElementById('locationResult').innerHTML = `
            <div class="generated-image">
                <img src="${imageData.url}" alt="Random Generated Image">
                <a href="${imageData.url}" download="luxury-watch.png" class="download-button">
                    Download Image
                </a>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error generating random image:', error);
        document.getElementById('locationResult').innerHTML = `
            <div class="error-message">
                <p>Failed to generate random image. Please try again.</p>
            </div>
        `;
    });
}

// Add event listener when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    if (generateRandomBtn) {
        generateRandomBtn.addEventListener('click', generateRandomImage);
    }
});
