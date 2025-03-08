// Wait for jQuery to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if jQuery is loaded
    if (typeof jQuery === 'undefined') {
        console.error('jQuery is not loaded');
        return;
    }

    // Initialize all jQuery components
    $(document).ready(function(){
        // Initialize owl carousel for transport section
        if($('.transport_active').length) {
            $('.transport_active').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                autoplay: true,
                autoplayTimeout: 5000,
                items: 3,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }

        // Initialize testimonial carousel
        if($('.testmonial_active').length) {
            $('.testmonial_active').owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                autoplay: true,
                navText: ['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
                nav: true,
                dots: false,
                autoplayHoverPause: true,
                autoplaySpeed: 800,
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    992: {
                        items: 1
                    },
                    1200: {
                        items: 1
                    },
                    1500: {
                        items: 1
                    }
                }
            });
        }

        // Initialize other jQuery plugins
        if(typeof $.fn.ajaxChimp !== 'undefined') {
            $('#mc_embed_signup').find('form').ajaxChimp();
        }

        if(typeof $.fn.magnificPopup !== 'undefined') {
            $('.popup-image').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }

        if(typeof $.fn.slicknav !== 'undefined') {
            $('#mobile_menu').slicknav({
                prependTo: ".mobile_menu"
            });
        }

        // Initialize counters
        if(typeof $.fn.counterUp !== 'undefined') {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        }

        // Initialize nice select
        if(typeof $.fn.niceSelect !== 'undefined') {
            $('select').niceSelect();
        }
    });
});
