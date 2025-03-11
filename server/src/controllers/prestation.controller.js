const router =  require('express').Router();
const passport = require('../config/auth/passport');
const Roles = require('../config/roles');

const createPrestation = require('../services/prestation.service').createPrestation;
const getAllPrestations = require('../services/prestation.service').getAllPrestations;
const updatePrestation = require('../services/prestation.service').updatePrestation;
const deletePrestation = require('../services/prestation.service').deletePrestation;

router.post('/',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const newPrestation = await createPrestation({
            name: req.body.name,
            price: req.body.price
        });
        await newPrestation.save();
        res.json({ message: 'Prestation created' });
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const prestations = await getAllPrestations();
        res.json(prestations);
    } catch (error) {
        next(error);
    }
});

router.put('/:id',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const updatedPrestation = await updatePrestation(req.params.id, req.body.name, req.body.price);
        await updatedPrestation.save();
        res.json({ message: 'Prestation updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const deletedPrestation = await deletePrestation(req.params.id);
        await deletedPrestation.remove();
        res.json({ message: 'Prestation deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;