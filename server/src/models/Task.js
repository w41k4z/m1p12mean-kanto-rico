const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema({
    idClient: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    dateDebut: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Programmé', 'Payé'],
        default: 'En attente',
        required: true
    }
});

const task = mongoose.model('Task', TaskSchema);
module.exports = task;