const Task = require('../../models/Task');

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

