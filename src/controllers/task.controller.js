const Task = require("../models/task.model");
const Boom = require('boom');

const showAll = async (req, rep) => {
    const tasks = await Task.find();
    if (tasks.length < 1) {
        rep.code(404);
        throw new Boom("No documents found");
    }
    return tasks;
}

const newSingle = async (req, rep) => {
    const task = new Task(req.body);
    return task.save();
}

module.exports = { showAll, newSingle };