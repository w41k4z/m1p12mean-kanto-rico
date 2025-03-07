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

module.exports = server;