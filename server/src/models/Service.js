const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['OK', 'Supprime'],
        default: 'OK'
    }
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;