document.addEventListener('DOMContentLoaded', function() {
    const freightTypeCards = document.querySelectorAll('.freight-type-card');
    const formSections = document.querySelectorAll('.form-section');
    const loadTypeButtons = document.querySelectorAll('.load-type-btn');
    const courierModeButtons = document.querySelectorAll('.courier-mode-btn');
    const form = document.getElementById('freightEstimateForm');

    // Hide all form sections initially
    formSections.forEach(section => section.style.display = 'none');

    // Handle freight type selection
    freightTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            freightTypeCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');

            // Hide all form sections
            formSections.forEach(section => section.style.display = 'none');

            // Show the corresponding form section
            const freightType = this.getAttribute('data-type');
            const formSection = document.getElementById(`${freightType}Form`);
            if (formSection) {
                formSection.style.display = 'block';
            }
        });
    });

    // Handle load type selection
    loadTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.load-type-selector');
            parent.querySelectorAll('.load-type-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Handle courier mode selection
    courierModeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.courier-mode-selector');
            parent.querySelectorAll('.courier-mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get active freight type
        const activeFreightType = document.querySelector('.freight-type-card.active');
        if (!activeFreightType) {
            alert('Please select a freight type');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const freightType = activeFreightType.getAttribute('data-type');
        formData.append('freightType', freightType);

        // If road freight, get load type
        if (freightType === 'road') {
            const activeLoadType = document.querySelector('#roadForm .load-type-btn.active');
            if (!activeLoadType) {
                alert('Please select a load type');
                return;
            }
            formData.append('loadType', activeLoadType.getAttribute('data-type'));
        }

        // If courier, get load type and mode
        if (freightType === 'courier') {
            const activeLoadType = document.querySelector('#courierForm .load-type-btn.active');
            const activeCourierMode = document.querySelector('#courierForm .courier-mode-btn.active');
            
            if (!activeLoadType) {
                alert('Please select a delivery type (Domestic/International)');
                return;
            }
            if (!activeCourierMode) {
                alert('Please select a courier mode (Document/Non-Document)');
                return;
            }

            formData.append('courierType', activeLoadType.getAttribute('data-type'));
            formData.append('courierMode', activeCourierMode.getAttribute('data-mode'));
        }

        // Convert FormData to object for easy viewing
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to your server
        console.log('Form data:', formObject);
        alert('Thank you for your submission! We will get back to you shortly.');
        form.reset();

        // Reset active states
        freightTypeCards.forEach(card => card.classList.remove('active'));
        loadTypeButtons.forEach(btn => btn.classList.remove('active'));
        courierModeButtons.forEach(btn => btn.classList.remove('active'));
        formSections.forEach(section => section.style.display = 'none');
    });
});
