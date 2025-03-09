const router = require('express').Router();

const createUser = require('../services/user.factory.service').createUser;
const Roles = require('../config/roles');

router.post('/create/mechanic', async (req, res, next) => {
    try {        
        const newUser = await createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            roleName: Roles.CLIENT
        });
        await newUser.save();
        res.json({ message: 'Mechanic account created' });
    } catch (error) {
        next(error);
    }
});

router.post('/create/manager', async (req, res, next) => {
    try {        
        const newUser = await createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            roleName: Roles.MANAGER
        });
        await newUser.save();
        res.json({ message: 'Manager account created' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;