// Initialize Firebase
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

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const form = document.getElementById('freightEstimateForm');
    if (!form) return;

    // Add names to all form controls that don't have them
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (!input.name && input.id) {
            input.name = input.id;
        }
    });

    // Handle freight type selection
    const freightCards = document.querySelectorAll('.freight-type-card');
    const forms = {
        air: document.getElementById('airForm'),
        ocean: document.getElementById('oceanForm'),
        road: document.getElementById('roadForm')
    };

    freightCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            freightCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Hide all forms
            Object.values(forms).forEach(form => {
                if (form) form.style.display = 'none';
            });
            
            // Show selected form
            const type = this.getAttribute('data-type');
            if (forms[type]) {
                forms[type].style.display = 'block';
            }
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get current active freight type
        const activeCard = document.querySelector('.freight-type-card.active');
        const freightType = activeCard ? activeCard.getAttribute('data-type') : 'air';
        
        // Create FormData object
        const formData = new FormData(form);
        
        // Convert FormData to object
        const data = {
            timestamp: new Date().toISOString(),
            freightType: freightType
        };

        formData.forEach((value, key) => {
            if (value) {
                data[key] = value;
            }
        });

        try {
            // Save to Firebase
            await firebase.database().ref('estimates').push(data);
            
            // Show success message
            alert('Your freight estimate request has been submitted successfully!');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Show error message
            alert('Error submitting form. Please try again.');
            console.error('Error saving to Firebase:', error);
        }
    });
});
