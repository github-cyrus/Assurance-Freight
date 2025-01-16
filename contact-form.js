// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

// Firebase configuration
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const form = document.getElementById('contactForm');
const spinner = document.getElementById('loadingSpinner');
const inputFields = ['name', 'email', 'subject', 'message'];

// Form validation function
function validateForm() {
    let isValid = true;
    
    inputFields.forEach(id => {
        const element = document.getElementById(id);
        if (!element.value.trim()) {
            element.classList.add('is-invalid');
            isValid = false;
        } else if (id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(element.value.trim())) {
                element.classList.add('is-invalid');
                isValid = false;
            } else {
                element.classList.remove('is-invalid');
            }
        } else {
            element.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Clear validation states
function clearValidation() {
    inputFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('is-invalid');
        }
    });
}

// Get form data
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
        spinner.classList.remove('d-none');

        const formData = getFormData();
        const contactsRef = ref(database, 'contacts');
        
        await push(contactsRef, formData);
        
        alert('Message sent successfully!');
        form.reset();
        clearValidation();

    } catch (error) {
        console.error('Error saving to Firebase:', error);
        alert('Error sending message. Please try again.');
    } finally {
        spinner.classList.add('d-none');
    }
}

// Setup real-time validation
function setupValidation() {
    inputFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('is-invalid');
                } else if (id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                    }
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }
    });
}

// Initialize form
function initializeForm() {
    if (form) {
        form.addEventListener('submit', handleSubmit);
        setupValidation();
    } else {
        console.error('Contact form not found');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeForm);