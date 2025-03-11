const router = require('express').Router();
const createService = require('../services/service.factory.service').createService;
const getAllServices = require('../services/service.factory.service').getAllServices;
const updateService = require('../services/service.factory.service').updateService;
const deleteService = require('../services/service.factory.service').deleteService;

router.post('/create/service', async (req, res, next) => {
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

router.get('/get/service', async (req, res, next) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        next(error);
    }
});

router.put('/put/service/:id', async (req, res, next) => {
    try {
        const updatedService = await updateService(req.params.id, req.body.name);
        await updatedService.save();
        res.json({ message: 'Service updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/service/:id', async (req, res, next) => {
    try {
        const deletedService = await deleteService(req.params.id);
        await deletedService.remove();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;