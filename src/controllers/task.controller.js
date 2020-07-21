const Task = require("../models/task.model");
const createError = require('http-errors')

const newSingle = async (req, rep) => {
    const task = new Task(req.body);
    return task.save();
}

const showAll = async (req, rep) => {
    const tasks = await Task.find();
    if (tasks.length < 1) {
        throw createError(404, 'No documents found', { header: { 'X-Req-Id': req.id, id: req.params.id } })
    }
    return tasks;
}

const showSingle = async (req, rep) => {
    const task = await Task.findById(req.params.id);
    if (task == null) {
        throw createError(404, 'No document found', { header: { 'X-Req-Id': req.id, id: req.params.id } })
    }
    return task;
}

const editSingle = async (req, rep) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, { new: true, });
    return task;
}

const deleteSingle = async (req, rep) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task == null) {
        throw createError(404, 'No document found', { header: { 'X-Req-Id': req.id, id: req.params.id } })
    }
    return task;
}
module.exports = { showAll, showSingle, newSingle, editSingle, deleteSingle };