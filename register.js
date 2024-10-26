const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Registration endpoint
app.post('/register', (req, res) => {
    const { email } = req.body; // Extract email from request body

    // Validate email
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Save email to a .txt file
    fs.appendFile('api/users.txt', email + '\n', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving email' });
        }
        res.status(201).json({ message: 'Email registered successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
