const mongoose = require('mongoose');

const PrestationSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Prestation = mongoose.model('Prestation', PrestationSchema);
module.exports = Prestation;