document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    // Basic validation
    if (email === '') {
        errorMessage.textContent = 'Please enter your email.';
        return;
    }

    // Simulated email check (you should replace this with actual backend logic)
    if (email === 'user@example.com') {
        alert('Password reset instructions have been sent to your email.');
        window.location.href = 'login.html'; // Redirect back to login page
    } else {
        errorMessage.textContent = 'Email not found.';
    }
});
