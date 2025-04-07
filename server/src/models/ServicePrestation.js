const mongoose = require('mongoose');

const ServicePrestationSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    prestation: { type: mongoose.Schema.Types.ObjectId, ref: "Prestation", required: true },
    status: {
        type: String,
        enum: ['OK', 'Supprime'],
        default: 'OK'
    }
}, { timestamps: true });

ServicePrestationSchema.index({ service: 1, prestation: 1 }, { unique: true });

const ServicePrestation = mongoose.model('ServicePrestations', ServicePrestationSchema);
module.exports = ServicePrestation;