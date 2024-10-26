const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require("http");
const host = '74.58.207.68'; // e.g., '192.168.1.1' or 'example.com'
const port = 8000; // You can choose any available port

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
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Hello from the server!");
};

const server = http.createServer(requestListener);

// Start the server
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
