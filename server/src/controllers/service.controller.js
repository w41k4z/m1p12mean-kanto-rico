const router = require('express').Router();
const createService = require('../services/service.factory.service').createService;

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

module.exports = router;