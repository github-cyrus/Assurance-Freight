// Import Firebase scripts in your HTML file
// <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js"></script>

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
firebase.initializeApp(firebaseConfig);

// Get form element
const estimateForm = document.getElementById('estimateForm');

// Add submit event listener to form
estimateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button to prevent double submission
    const submitButton = estimateForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Get form data
    const formData = {
        name: estimateForm.name.value,
        email: estimateForm.email.value,
        product_type: estimateForm.product_type.value,
        product_size: estimateForm.product_size.value,
        departure_city: estimateForm.departure_city.value,
        delivery_city: estimateForm.delivery_city.value,
        message: estimateForm.message.value,
        timestamp: new Date().toISOString()
    };

    try {
        // Show loading message
        showMessage('Submitting your request...', 'loading');
        
        // Push data to Firebase and wait for completion
        const submission = await firebase.database().ref('estimates').push(formData);
        
        if (submission) {
            // Clear any existing messages
            clearMessages();
            
            // Show success message
            showMessage('Estimate request submitted successfully!', 'success');
            
            // Reset form
            estimateForm.reset();
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('Error submitting form. Please try again.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
    }
});

// Function to clear all status messages
function clearMessages() {
    const messages = document.querySelectorAll('.status-message');
    messages.forEach(message => message.remove());
}

// Function to show status messages
function showMessage(message, type) {
    // Clear any existing messages
    clearMessages();

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.textAlign = 'center';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '4px';
    
    switch(type) {
        case 'success':
            messageDiv.style.color = 'green';
            messageDiv.style.backgroundColor = '#e8f5e9';
            messageDiv.style.border = '1px solid green';
            break;
        case 'error':
            messageDiv.style.color = 'red';
            messageDiv.style.backgroundColor = '#ffebee';
            messageDiv.style.border = '1px solid red';
            break;
        case 'loading':
            messageDiv.style.color = '#2196F3';
            messageDiv.style.backgroundColor = '#E3F2FD';
            messageDiv.style.border = '1px solid #2196F3';
            break;
    }

    // Add message to form
    estimateForm.appendChild(messageDiv);

    // Remove success or error messages after 5 seconds
    if (type !== 'loading') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}