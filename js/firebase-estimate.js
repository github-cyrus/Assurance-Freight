// Import and initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEqZY0ZGzfKGmqDEoI2Nw9bsWbXqM5Eo4",
    authDomain: "assurance-freight.firebaseapp.com",
    projectId: "assurance-freight",
    storageBucket: "assurance-freight.appspot.com",
    messagingSenderId: "654970654396",
    appId: "1:654970654396:web:6c0f8ea9aba4b5e5a00fdf",
    measurementId: "G-CJBVZ6KEGQ"
};

// Initialize Firebase
let app;
let database;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getDatabase, ref, push } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
        
        // Initialize Firebase only if it hasn't been initialized
        if (!window.firebase) {
            app = initializeApp(firebaseConfig);
            database = getDatabase(app);
        }

        // Initialize form handling
        initializeForm();

        // Show Air form by default
        const airCard = document.querySelector('.freight-type-card[data-type="air"]');
        if (airCard) {
            airCard.classList.add('active');
            const airForm = document.getElementById('airForm');
            if (airForm) {
                airForm.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
});

function initializeForm() {
    const form = document.getElementById('freightEstimateForm');
    const freightTypeCards = document.querySelectorAll('.freight-type-card');
    const formSections = document.querySelectorAll('.form-section');

    // Handle freight type selection
    freightTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            freightTypeCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');

            // Hide all form sections
            formSections.forEach(section => section.style.display = 'none');
            
            // Show selected form section
            const freightType = card.getAttribute('data-type');
            const selectedForm = document.getElementById(`${freightType}Form`);
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get active freight type
        const activeCard = document.querySelector('.freight-type-card.active');
        if (!activeCard) return;

        const freightType = activeCard.getAttribute('data-type');
        const formData = new FormData(form);
        const data = {
            freightType,
            timestamp: new Date().toISOString(),
            ...Object.fromEntries(formData)
        };

        try {
            const { getDatabase, ref, push } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
            const db = getDatabase();
            await push(ref(db, 'estimates'), data);
            
            // Show success message
            alert('Estimate request submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    });
}

function showEstimatePopup(message) {
    // Remove any existing popup
    const existingPopup = document.querySelector('.estimate-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'estimate-popup';
    popup.innerHTML = `
        <div class="estimate-popup-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Add styles for the popup if they don't exist
    if (!document.getElementById('estimate-popup-styles')) {
        const style = document.createElement('style');
        style.id = 'estimate-popup-styles';
        style.textContent = `
            .estimate-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .estimate-popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
            }
            .estimate-popup-content button {
                background-color: #ff3d1c;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            }
            .estimate-popup-content button:hover {
                background-color: #e63517;
            }
        `;
        document.head.appendChild(style);
    }
}
