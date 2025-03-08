// Create a file named quote-button.js
document.addEventListener('DOMContentLoaded', function() {
    const quoteButtons = document.querySelectorAll('.boxed-btn3-line');
    
    quoteButtons.forEach(button => {
        // Wrap button text in span if not already wrapped
        if (!button.querySelector('span')) {
            const buttonText = button.textContent;
            button.innerHTML = `<span>${buttonText}</span>`;
        }

        // Add emphasis class to primary CTA buttons
        if (button.closest('.slider_area') || button.closest('.Estimate_area')) {
            button.classList.add('emphasis');
        }

        // Mouse enter effect
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-2px)';
        });

        // Mouse leave effect
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0)';
        });

        // Click effect with ripple
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            // Calculate ripple size and position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);

            // Handle navigation
            const formSection = document.querySelector('.Estimate_area');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If not on the page with the form, redirect to index.html#estimate-form
                const currentPath = window.location.pathname;
                if (!currentPath.includes('index.html')) {
                    window.location.href = '/index.html#estimate-form';
                }
            }
        });
    });
});