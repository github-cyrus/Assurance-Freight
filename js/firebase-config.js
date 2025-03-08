// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

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

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    // Handle freight type selection
    document.querySelectorAll('.freight-type-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            document.querySelectorAll('.freight-type-card').forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Hide all forms
            document.querySelectorAll('.form-section').forEach(form => form.style.display = 'none');
            // Show selected form
            const type = this.getAttribute('data-type');
            document.getElementById(`${type}Form`).style.display = 'block';
        });
    });

    // Handle form submission
    document.getElementById('freightEstimateForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get active freight type
        const activeType = document.querySelector('.freight-type-card.active').getAttribute('data-type');
        
        // Get form data based on active freight type
        const formData = {};
        
        if (activeType === 'air') {
            formData.startDestination = document.getElementById('airStartDest').value;
            formData.endDestination = document.getElementById('airEndDest').value;
            formData.address = document.getElementById('airAddress').value;
            formData.clearanceDate = document.getElementById('airClearanceDate').value;
            formData.grossWeight = document.getElementById('airGrossWeight').value;
            formData.pieces = document.getElementById('airPieces').value;
            formData.volumeWeight = document.getElementById('airVolumeWeight').value;
            formData.commodityCategory = document.getElementById('airCommodityCategory').value;
            formData.commodity = document.getElementById('airCommodity').value;
        } 
        else if (activeType === 'ocean') {
            formData.startPort = document.getElementById('oceanStartPort').value;
            formData.finalPort = document.getElementById('oceanFinalPort').value;
            formData.shippingMode = document.getElementById('oceanShippingMode').value;
            formData.clearanceDate = document.getElementById('oceanClearanceDate').value;
            formData.grossWeight = document.getElementById('oceanGrossWeight').value;
            formData.pieces = document.getElementById('oceanPieces').value;
            formData.volumeWeight = document.getElementById('oceanVolumeWeight').value;
            formData.commodityCategory = document.getElementById('oceanCommodityCategory').value;
            formData.commodity = document.getElementById('oceanCommodity').value;
        }
        else if (activeType === 'road') {
            formData.loadType = document.querySelector('input[name="roadLoadType"]:checked').value;
            formData.pickupPin = document.getElementById('roadPickupPin').value;
            formData.dropPin = document.getElementById('roadDropPin').value;
            formData.pickupDate = document.getElementById('roadPickupDate').value;
            formData.grossWeight = document.getElementById('roadGrossWeight').value;
            formData.pieces = document.getElementById('roadPieces').value;
            formData.declaredValue = document.getElementById('roadDeclaredValue').value;
            formData.commodity = document.getElementById('roadCommodity').value;
        }

        // Add metadata
        formData.freightType = activeType;
        formData.timestamp = new Date().toISOString();

        try {
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;

            // Create a reference to the freight estimates collection
            const freightEstimatesRef = ref(database, 'freightEstimates');
            
            // Push the data to Firebase
            await push(freightEstimatesRef, formData);

            // Show success message
            alert('Estimate request submitted successfully!');
            
            // Reset form
            e.target.reset();
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting estimate request. Please try again.');
            
            // Reset button state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});
