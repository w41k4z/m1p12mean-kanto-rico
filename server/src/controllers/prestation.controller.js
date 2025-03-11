const router =  require('express').Router();
const createPrestation = require('../services/prestation.factory.service').createPrestation;
const getAllPrestations = require('../services/prestation.factory.service').getAllPrestations;
const updatePrestation = require('../services/prestation.factory.service').updatePrestation;
const deletePrestation = require('../services/prestation.factory.service').deletePrestation;

router.post('/createPrestation', async (req, res, next) => {
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

router.get('/getAllPrestations', async (req, res, next) => {
    try {
        const prestations = await getAllPrestations();
        res.json(prestations);
    } catch (error) {
        next(error);
    }
});

router.put('/updatePrestation', async (req, res, next) => {
    try {
        const updatedPrestation = await updatePrestation(req.body.id, req.body.name, req.body.price);
        await updatedPrestation.save();
        res.json({ message: 'Prestation updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/deletePrestation', async (req, res, next) => {
    try {
        const deletedPrestation = await deletePrestation(req.body.id);
        await deletedPrestation.remove();
        res.json({ message: 'Prestation deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;