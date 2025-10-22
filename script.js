document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips for manga cards
    const mangaCards = document.querySelectorAll('.manga-card');
    mangaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // You can add tooltip functionality here if needed
        });
    });

    // Search functionality
    const searchInput = document.querySelector('#search-input');
    if(searchInput) {
        searchInput.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
            // Implement search logic here
        });
    }
});

// Function to handle admin login
function adminLogin() {
    const password = prompt('أدخل كلمة المرور الإدارية:');
    if(password === 'MangaQ1Admin') {
        window.location.href = 'admin.html';
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}
