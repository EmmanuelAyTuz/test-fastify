const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, min: 1, max: 16, required: true },
    description: { type: String, min: 1, max: 60, required: true },
    tag: { type: String, enum: ["normal", "primary", "secondary", "none"], default: "normal" }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);