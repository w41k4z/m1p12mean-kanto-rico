const passport = require('passport');
const Roles = require('../config/roles');

const router = require('express').Router();
const createService = require('../services/services.service').createService;
const getAllServices = require('../services/services.service').getAllServices;
const updateService = require('../services/services.service').updateService;
const deleteService = require('../services/services.service').deleteService;

router.post('/',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const newService = await createService({
            name: req.body.name
        });
        await newService.save();
        res.json({ message: 'Service created' });
    } catch (error) {
        next(error);
    }
});

router.get('/',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]), 
async (req, res, next) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        next(error);
    }
});

router.put('/:id',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const updatedService = await updateService(req.params.id, req.body.name);
        await updatedService.save();
        res.json({ message: 'Service updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',passport.authenticate('jwt', {session: false}),
passport.authorize([Roles.MANAGER]),
async (req, res, next) => {
    try {
        const deletedService = await deleteService(req.params.id);
        await deletedService.remove();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;