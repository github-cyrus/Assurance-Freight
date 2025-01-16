// Create a file named quote-button.js
document.addEventListener('DOMContentLoaded', function() {
    const quoteButtons = document.querySelectorAll('.boxed-btn3-line');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we're already on the page with the form
            const formSection = document.querySelector('.Estimate_area');
            
            if (formSection) {
                // If we're on the same page, scroll to the form
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If we're on a different page, redirect to the page with the form
                window.location.href = '/index.html#estimate-form';
                // Replace 'estimate.html' with your actual form page URL
            }
        });
    });
});