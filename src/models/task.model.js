const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, min: 1, max: 16 },
    description: { type: String, min: 1, max: 60 },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);