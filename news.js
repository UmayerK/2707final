document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8475977baad5443fa38a94914c14d1c8';
    const newsContainer = document.getElementById('newsContainer');
    
    // Search terms related to luxury watches
    const searchTerms = [
        'luxury watches',
        'timepieces',
        'watch industry',
        'Rolex',
        'Patek Philippe',
        'Audemars Piguet',
        'horology'
    ];
    
    // Randomly select a search term
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    // Fetch news articles
    fetch(`https://newsapi.org/v2/everything?q=${randomTerm}&apiKey=${apiKey}&language=en&pageSize=12&sortBy=publishedAt`)
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = ''; // Clear loading message
            
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const articleElement = createArticleElement(article);
                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p class="no-news">No news articles found. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p class="error">Error loading news. Please try again later.</p>';
        });
});

function createArticleElement(article) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'news-item';
    
    // Format the date
    const publishedDate = new Date(article.publishedAt);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    articleDiv.innerHTML = `
        <img src="${article.urlToImage || 'images/news-placeholder.jpg'}" alt="${article.title}" onerror="this.src='images/news-placeholder.jpg'">
        <div class="news-text">
            <span class="date">${formattedDate}</span>
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        </div>
    `;
    
    return articleDiv;
} 