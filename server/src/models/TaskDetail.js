const { default: mongoose } = require("mongoose");

const TaskDetail = new mongoose.Schema(
    {
        idTask: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Task',
            required: true
        },
        idPrestation: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Prestation',
        },
        status: {
            type: String,
            enum: ['En attente', 'En cours', 'Terminé'],
            default: 'En attente',
            required: true
        },
        idMecanicien: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            default: null
        }
    },
);

const taskDetail = mongoose.model('TaskDetail', TaskDetail);
module.exports = taskDetail;