const express = require('express');
const cors = require('cors');
const passport = require('./auth/passport');

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());
server.use(passport.initialize());

// Routes
server.use('/api/auth', require('../controllers/auth.controller'));

// Error handling
server.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

server.use((err, req, res, next) => {
    res.status(500).json({ message: 'Server error', error: err.message });
});

module.exports = server;