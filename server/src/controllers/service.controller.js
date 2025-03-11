const router = require('express').Router();
const createService = require('../services/service.factory.service').createService;
const getAllServices = require('../services/service.factory.service').getAllServices;
const updateService = require('../services/service.factory.service').updateService;
const deleteService = require('../services/service.factory.service').deleteService;

router.post('/createService', async (req, res, next) => {
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

router.get('/getAllServices', async (req, res, next) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        next(error);
    }
});

router.put('/updateService', async (req, res, next) => {
    try {
        const updatedService = await updateService(req.body.id, req.body.name);
        await updatedService.save();
        res.json({ message: 'Service updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteService', async (req, res, next) => {
    try {
        const deletedService = await deleteService(req.body.id);
        await deletedService.remove();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;