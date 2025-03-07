const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

const generateToken = require('../services/jwt.service').generateToken;
const createUser = require('../services/user.factory.service').createUser;

router.post('/sign-in', passport.authenticate('local', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.json({ accessToken: token });
})

router.post('/sign-up', async (req, res, next) => {
    try {        
        const newUser = await createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            roleName: req.body.roleName
        });
        await newUser.save();
        res.json({ message: 'User created' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;