// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2AkF_gAGBhoE22dcJMXbb6KiqgMpgqig",
    authDomain: "assurance-freight.firebaseapp.com",
    databaseURL: "https://assurance-freight-default-rtdb.firebaseio.com",
    projectId: "assurance-freight",
    storageBucket: "assurance-freight.firebasestorage.app",
    messagingSenderId: "225778389799",
    appId: "1:225778389799:web:08ba7ac06960b3214c0f02",
    measurementId: "G-NHM1EMDNQ4"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Get database reference
const db = firebase.database();

// Separate database references for each freight type
const airFreightDB = db.ref('airFreight');
const oceanFreightDB = db.ref('oceanFreight');
const roadFreightDB = db.ref('roadFreight');

// Function to generate unique ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to show loading popup
function showLoadingPopup() {
    return Swal.fire({
        title: 'Processing Your Request',
        html: 'Please wait while we calculate your estimate...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// Function to show success popup
function showSuccessPopup(type) {
    return Swal.fire({
        icon: 'success',
        title: 'Estimate Request Sent!',
        html: `Your ${type} freight estimate request has been submitted successfully.<br>Our team will contact you shortly.`,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#CF8C29',
        customClass: {
            popup: 'animated fadeInUp faster'
        }
    });
}

// Function to show error popup
function showErrorPopup(error) {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Something went wrong! Please try again.',
        confirmButtonColor: '#CF8C29',
        customClass: {
            popup: 'animated fadeIn faster'
        }
    });
}

// Save functions for each freight type
async function saveAirFreightData(data) {
    try {
        const newAirFreightRef = airFreightDB.push();
        await newAirFreightRef.set({
            id: generateUniqueId(),
            ...data,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } catch (error) {
        console.error('Error saving air freight data:', error);
        throw error;
    }
}

async function saveOceanFreightData(data) {
    try {
        const newOceanFreightRef = oceanFreightDB.push();
        await newOceanFreightRef.set({
            id: generateUniqueId(),
            ...data,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } catch (error) {
        console.error('Error saving ocean freight data:', error);
        throw error;
    }
}

async function saveRoadFreightData(data) {
    try {
        const newRoadFreightRef = roadFreightDB.push();
        await newRoadFreightRef.set({
            id: generateUniqueId(),
            ...data,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } catch (error) {
        console.error('Error saving road freight data:', error);
        throw error;
    }
}

// Document ready handler
$(document).ready(function() {
    // Initialize form with animations
    $('.form-section').hide();
    $('#airForm').fadeIn(500).addClass('active');

    // Initialize Owl Carousel if it exists
    if ($.fn.owlCarousel) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    }

    // Freight type selection
    $('.freight-type-card').click(function() {
        const type = $(this).data('type');
        $('.freight-type-card').removeClass('active');
        $(this).addClass('active');
        $('.form-section').removeClass('active').slideUp(300);
        $(`#${type}Form`).addClass('active').slideDown(500);
    });

    // Form validation and submission
    $('#freightEstimateForm').on('submit', async function(e) {
        e.preventDefault();
        let isValid = true;
        const activeForm = $('.form-section.active');
        const formType = activeForm.attr('id');

        // Clear previous errors
        $('.error-message').remove();
        $('.form-control, .load-type-selector').removeClass('error');

        // Validate required fields
        activeForm.find('input[required], select[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
                $('<div class="error-message">This field is required</div>')
                    .insertAfter($(this));
            }
        });

        // Special handling for radio buttons
        if (formType === 'roadForm') {
            const loadType = $('input[name="roadLoadType"]:checked').val();
            if (!loadType) {
                isValid = false;
                $('.load-type-selector').addClass('error');
                $('<div class="error-message">Please select a load type</div>')
                    .insertAfter('.load-type-options');
            }
        }

        if (isValid) {
            try {
                await showLoadingPopup();

                let formData = {};
                let freightType = '';

                switch(formType) {
                    case 'airForm':
                        formData = {
                            startDest: $('#airStartDest').val(),
                            endDest: $('#airEndDest').val(),
                            address: $('#airAddress').val(),
                            clearanceDate: $('#airClearanceDate').val(),
                            grossWeight: $('#airGrossWeight').val(),
                            pieces: $('#airPieces').val(),
                            volumeWeight: $('#airVolumeWeight').val(),
                            commodityCategory: $('#airCommodityCategory').val(),
                            commodity: $('#airCommodity').val(),
                            hsnCode: $('#airHsnCode').val()
                        };
                        await saveAirFreightData(formData);
                        freightType = 'Air';
                        break;

                    case 'oceanForm':
                        formData = {
                            startPort: $('#oceanStartPort').val(),
                            finalPort: $('#oceanFinalPort').val(),
                            shippingMode: $('#oceanShippingMode').val(),
                            clearanceDate: $('#oceanClearanceDate').val(),
                            grossWeight: $('#oceanGrossWeight').val(),
                            pieces: $('#oceanPieces').val(),
                            volumeWeight: $('#oceanVolumeWeight').val(),
                            commodityCategory: $('#oceanCommodityCategory').val(),
                            commodity: $('#oceanCommodity').val(),
                            hsnCode: $('#oceanHsnCode').val()
                        };
                        await saveOceanFreightData(formData);
                        freightType = 'Ocean';
                        break;

                    case 'roadForm':
                        formData = {
                            loadType: $('input[name="roadLoadType"]:checked').val(),
                            pickupPin: $('#roadPickupPin').val(),
                            dropPin: $('#roadDropPin').val(),
                            pickupDate: $('#roadPickupDate').val(),
                            grossWeight: $('#roadGrossWeight').val(),
                            pieces: $('#roadPieces').val(),
                            declaredValue: $('#roadDeclaredValue').val(),
                            commodity: $('#roadCommodity').val()
                        };
                        await saveRoadFreightData(formData);
                        freightType = 'Road';
                        break;
                }

                await showSuccessPopup(freightType);
                this.reset();
                
            } catch (error) {
                console.error('Error saving data:', error);
                await showErrorPopup(error);
            }
        } else {
            // Scroll to first error with smooth animation
            const firstError = activeForm.find('.error').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 100
                }, 500);
            }
        }
    });

    // Floating label animation
    $('.form-control').on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
    });

    // Initialize all date inputs with current date as min
    $('input[type="date"]').each(function() {
        $(this).attr('min', new Date().toISOString().split('T')[0]);
    });

    // Destination/Port autocomplete data
    const destinations = [
        'New York, USA', 'London, UK', 'Tokyo, Japan', 'Dubai, UAE',
        'Singapore', 'Hong Kong', 'Shanghai, China', 'Mumbai, India',
        'Sydney, Australia', 'Los Angeles, USA', 'Paris, France'
    ];

    const ports = [
        'Port of Shanghai, China', 'Port of Singapore', 'Port of Rotterdam, Netherlands',
        'Port of Antwerp, Belgium', 'Port of Los Angeles, USA', 'Port of Long Beach, USA',
        'Port of Hong Kong', 'Port of Hamburg, Germany', 'Port of Nhava Sheva, India',
        'Port of Dubai, UAE', 'Port of Felixstowe, UK'
    ];

    // Initialize autocomplete for destinations
    $('input[id$="StartDest"], input[id$="EndDest"]').autocomplete({
        source: destinations,
        minLength: 2,
        classes: {
            "ui-autocomplete": "modern-autocomplete"
        }
    });

    // Initialize autocomplete for ports
    $('input[id$="Port"]').autocomplete({
        source: ports,
        minLength: 2,
        classes: {
            "ui-autocomplete": "modern-autocomplete"
        }
    });

    // PIN code validation
    $('input[id*="Pin"]').on('input', function() {
        this.value = this.value.replace(/\D/g, '').substr(0, 6);
    });

    // Commodity category dependent dropdown
    const commodityMap = {
        'general': ['Electronic Goods', 'Fabrics', 'Leather Goods', 'Spare Parts', 'Handicrafts', 'Garments', 'Other'],
        'pharma': ['Medicines', 'Medical Equipment', 'Vaccines', 'Other'],
        'perishables': ['Food Products', 'Flowers', 'Other'],
        'dangerous': ['Chemicals', 'Flammable Materials', 'Other'],
        'refrigerated': ['Frozen Food', 'Dairy Products', 'Other']
    };

    $('select[id$="CommodityCategory"]').change(function() {
        const category = $(this).val();
        const commoditySelect = $(this).closest('.row').find('select[id$="Commodity"]');
        
        commoditySelect.empty().append('<option value="">Select Commodity</option>');
        
        if (category && commodityMap[category]) {
            commodityMap[category].forEach(item => {
                commoditySelect.append(`<option value="${item.toLowerCase()}">${item}</option>`);
            });
        }
    });

    // HSN Code Search
    let hsnTimeout;
    $('input[id*="HsnCode"]').on('input', function() {
        clearTimeout(hsnTimeout);
        const input = $(this);
        const value = input.val();

        if (value.length >= 4) {
            input.addClass('searching');
            hsnTimeout = setTimeout(() => {
                // Simulate HSN code search
                input.removeClass('searching').addClass('found');
                setTimeout(() => input.removeClass('found'), 2000);
            }, 1000);
        }
    });

    // Weight calculation for volume weight
    $('input[id*="GrossWeight"]').on('input', function() {
        const form = $(this).closest('.form-section');
        const volumeWeight = form.find('input[id*="VolumeWeight"]');
        
        if (volumeWeight.length && !volumeWeight.val()) {
            // Set volume weight to 1.5x gross weight as a suggestion
            volumeWeight.val((parseFloat(this.value) * 1.5).toFixed(2));
        }
    });

    // Real-time validation
    $('.form-control').on('input', function() {
        $(this).removeClass('error');
    });

    // Remove error class from radio button groups when selection is made
    $('input[type="radio"]').on('change', function() {
        $(this).closest('.load-type-selector').removeClass('error');
    });

    // Add smooth parallax effect on scroll
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.Estimate_area::before').css({
            'transform': 'translate3d(0, ' + (scrolled * 0.3) + 'px, 0)'
        });
    });

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
});
