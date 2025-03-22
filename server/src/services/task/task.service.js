const Task = require('../../models/Task');
const TaskDetail = require('../../models/TaskDetail');
const mongoose = require('mongoose');


exports.createTaskWithPrestations = async (idClient, prestations, dateDebut = null) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const task = new Task({
            idClient: idClient,
            dateDebut: dateDebut,
            status: 'En attente'
        });

        const savedTask = await task.save({ session });
        /// create detail for each task
        const taskDetails = prestations.map(prestation => ({
            idTask: savedTask._id,
            idPrestation: prestation._id,
            status: 'En attente',
            idMecanicen: null
        }));

        await TaskDetail.insertMany(taskDetails, { session });

        await session.commitTransaction();
        session.endSession();

        return savedTask;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
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

