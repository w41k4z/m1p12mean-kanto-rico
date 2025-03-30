const TaskDetail = require('../../models/taskDetail.model');

exports.getAllTaskDetail = async (page, size, filters) => {
    let tasks = await TaskDetail.find(filters).skip(page).limit(size);
    return tasks;
}

exports.updateTaskDetail = async (id, status,idMecanicien) => {
    let detailTask = await TaskDetail.findById(id);
    detailTask.status = status;
    detailTask.idMecanicien = idMecanicien;
    return detailTask;
};