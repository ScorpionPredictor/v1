document.getElementById('register-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = '/'; // Redirect to the login page after successful registration
        } else {
            const errorMessage = await response.text();
            alert(`Registration failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    }
});