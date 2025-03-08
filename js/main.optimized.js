// Enhanced slider initialization
$(document).ready(function() {
    // Initialize the main slider with optimized settings
    $('.slider_active').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoplay: true,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: { items: 1, nav: false },
            767: { items: 1, nav: false },
            992: { items: 1, nav: true }
        }
    });

    // Initialize transport section carousel
    $('.transport_active').owlCarousel({
        loop: true,
        margin: 30,
        items: 3,
        autoplay: true,
        autoplaySpeed: 1000,
        dots: false,
        nav: true,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Add fade-in animation to elements
    function addFadeInAnimation() {
        $('.fade-in').each(function() {
            const element = $(this);
            if (isElementInViewport(element)) {
                element.addClass('visible');
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add fade-in class to sections
    $('.section_title, .single_transport, .counter_area').addClass('fade-in');

    // Handle scroll events for animations
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            addFadeInAnimation();
        });
    });

    // Initialize counters with smooth animation
    $('.counter').each(function() {
        const $this = $(this);
        const countTo = $this.attr('data-count');
        
        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });

    // Smooth scroll for anchor links
    $('a[href*="#"]').not('[href="#"]').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            const target = $(this.hash);
            const targetName = this.hash;
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
                return false;
            }
        }
    });
});

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
