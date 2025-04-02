const mongoose = require('mongoose');

const PrestationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['OK', 'Supprime'],
        default: 'OK'
    }
});

const Prestation = mongoose.model('Prestation', PrestationSchema);
module.exports = Prestation;