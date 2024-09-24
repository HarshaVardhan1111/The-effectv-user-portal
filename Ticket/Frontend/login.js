document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Basic validation
    if (username === '' || password === '') {
        errorMessage.textContent = 'Please fill in both fields.';
        return;
    }

    // Simulated credentials (hardcoded for demonstration purposes)
    const validCredentials = {
        username: 'hsubra154',
        password: 'Harshapriya@1128'
    };

    // Check if credentials match
    if (username === validCredentials.username && password === validCredentials.password) {
        window.location.href = 'home.html'; // Redirect to home page on successful login
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
});
