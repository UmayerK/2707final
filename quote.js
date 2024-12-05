document.addEventListener('DOMContentLoaded', function() {
    const watchSelect = document.getElementById('watch-model');
    const materialSelect = document.getElementById('band-material');
    const basePriceSpan = document.getElementById('basePrice');
    const bandPriceSpan = document.getElementById('bandPrice');
    const totalPriceSpan = document.getElementById('totalPrice');
    const quoteForm = document.getElementById('quoteForm');

    function updatePrices() {
        // Get base watch price
        const selectedWatch = watchSelect.options[watchSelect.selectedIndex];
        const basePrice = selectedWatch.dataset.price ? parseInt(selectedWatch.dataset.price) : 0;
        
        // Get band material price
        const selectedMaterial = materialSelect.options[materialSelect.selectedIndex];
        const bandPrice = selectedMaterial.dataset.price ? parseInt(selectedMaterial.dataset.price) : 0;
        
        // Calculate total
        const totalPrice = basePrice + bandPrice;
        
        // Update display
        basePriceSpan.textContent = `$${basePrice.toLocaleString()}`;
        bandPriceSpan.textContent = bandPrice ? `+$${bandPrice.toLocaleString()}` : '$0';
        totalPriceSpan.textContent = `$${totalPrice.toLocaleString()}`;
    }

    // Add event listeners for price updates
    watchSelect.addEventListener('change', updatePrices);
    materialSelect.addEventListener('change', updatePrices);

    // Handle form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            watch: watchSelect.options[watchSelect.selectedIndex].text,
            material: materialSelect.options[materialSelect.selectedIndex].text,
            size: document.getElementById('band-size').value,
            totalPrice: totalPriceSpan.textContent,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            comments: document.getElementById('comments').value
        };

        // You can handle the form data here (e.g., send to server, show confirmation)
        alert(`Thank you for your quote request!\n\nWatch: ${formData.watch}\nBand: ${formData.material}\nSize: ${formData.size}\nTotal: ${formData.totalPrice}\n\nWe will contact you shortly at ${formData.email}`);
    });
}); 