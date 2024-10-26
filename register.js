const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(bodyParser.json());

// In-memory user storage
const users = [];

// Registration Endpoint
app.post('https://scorpionpredictor.github.io/register', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    // Check if user already exists
    const existingUser  = users.find(user => user.email === email);
    if (existingUser ) {
        return res.status(400).send('User  already exists.');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = { email, password: hashedPassword };
        users.push(newUser ); // Store user in the in-memory array

        // Respond with success
        res.status(201).send('User  registered successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error. Please try again later.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
