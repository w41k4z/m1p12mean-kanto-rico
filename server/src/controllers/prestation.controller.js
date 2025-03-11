const router =  require('express').Router();
const createPrestation = require('../services/prestation.factory.service').createPrestation;
const getAllPrestations = require('../services/prestation.factory.service').getAllPrestations;
const updatePrestation = require('../services/prestation.factory.service').updatePrestation;
const deletePrestation = require('../services/prestation.factory.service').deletePrestation;

router.post('/create/prestation', async (req, res, next) => {
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

router.get('/get/prestation', async (req, res, next) => {
    try {
        const prestations = await getAllPrestations();
        res.json(prestations);
    } catch (error) {
        next(error);
    }
});

router.put('/put/prestation/:id', async (req, res, next) => {
    try {
        const updatedPrestation = await updatePrestation(req.params.id, req.body.name, req.body.price);
        await updatedPrestation.save();
        res.json({ message: 'Prestation updated' });
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/prestation/:id', async (req, res, next) => {
    try {
        const deletedPrestation = await deletePrestation(req.params.id);
        await deletedPrestation.remove();
        res.json({ message: 'Prestation deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;