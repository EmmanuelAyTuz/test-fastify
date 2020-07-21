const Task = require("../../models/v1/task.model");
const createError = require('http-errors')

const newSingle = async (req, rep) => {
    const task = new Task(req.body);
    return task.save();
}

const showAll = async (req, rep) => {
    const tasks = await Task.find();
    if (tasks.length < 1) {
        throw createError(404, 'No documents found', { header: { 'X-Req-Id': req.id, id: null } })
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

const deleteMany = async (req, rep) => {
    let query = {};
    if (req.query.id) {
        query = {
            _id: {
                $in: req.query.id,
            }
        };
    }

    if (req.query.tag) {
        query = {
            tag: req.query.tag,
        };
    }

    const task = await Task.deleteMany(query);
    return task;
}

module.exports = { showAll, showSingle, newSingle, editSingle, deleteSingle, deleteMany };