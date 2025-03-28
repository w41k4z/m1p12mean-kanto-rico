const Task = require('../../models/Task');
const TaskDetail = require('../../models/TaskDetail');
const Prestation = require('../../models/Prestation');
const mongoose = require('mongoose');


exports.createTaskWithPrestations = async (idClient, serviceData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!serviceData?.prestations || !Array.isArray(serviceData.prestations)) {
            throw new Error('Service data must contain a prestations array');
        }

        const task = new Task({
            idClient: new mongoose.Types.ObjectId(idClient),
            dateDebut: null, 
            status: 'En attente'
        });

        const savedTask = await task.save({ session });

        const taskDetails = serviceData.prestations.map(prestation => {
            if (!mongoose.Types.ObjectId.isValid(prestation.id)) {
                throw new Error(`Invalid prestation ID: ${prestation.id}`);
            }

            return {
                idTask: savedTask._id,
                idPrestation: new mongoose.Types.ObjectId(prestation.id),
                status: 'En attente',
                idMecanicien: null 
            };
        });

        await TaskDetail.insertMany(taskDetails, { session});

        await session.commitTransaction();
        
        return {
            taskId: savedTask._id,
            prestationCount: taskDetails.length
        };

    } catch (error) {
        await session.abortTransaction();
        console.error('Transaction failed:', error.message);
        throw error;
    } finally {
        session.endSession();
    }
};

exports.createTask = async (idClientParam, dateDebutParam, statusParam) => {
    const idClient = idClientParam;
    const dateDebut = dateDebutParam;
    const status = statusParam;
    let newTask = new Task({idClient, dateDebut, status});
    return newTask;
}

exports.getAllTasks = async (page, size, filters) => {
    let tasks = await Task.find(filters).skip(page).limit(size);
    return tasks;
}

exports.updateTask = async (id, name) => {
    let task = await Task.findById(id);
    task.name = name;
    return task;
};

exports.deleteTask = async (id) => {
    let task = await Task.findById(id);
    return task;
}

