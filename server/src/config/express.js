const express = require('express');
const cors = require('cors');
const passport = require('./auth/passport');
const createHttpError = require('http-errors');
const authorize = require('../middlewares/authorization.middleware');
const Roles = require('./roles');

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());
server.use(passport.initialize());

// Routes
server.use('/api/auth', require('../controllers/auth.controller'));
server.use(
    '/api/accounts',
    passport.authenticate('jwt', {session: false}),
    authorize([Roles.MANAGER]),
    require('../controllers/account.controller')
);

// Error handling
server.use((req, res, next) => {
    next(createHttpError(404, "Resource not found"));
});
server.use((err, req, res, next) => {
    let errorMessage = err instanceof Error ? err.message : "An unknown error has occurred";
    let statusCode = err.status || 500;
    return res.status(statusCode).json({ message: errorMessage });
});

module.exports = server;