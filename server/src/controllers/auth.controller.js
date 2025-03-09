const router = require('express').Router();
const passport = require('passport');

const generateToken = require('../services/jwt.service').generateToken;
const createUser = require('../services/user.factory.service').createUser;
const Roles = require('../config/roles');

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
            roleName: Roles.CLIENT
        });
        await newUser.save();
        res.json({ message: 'Client account created' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;