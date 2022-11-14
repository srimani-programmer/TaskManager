const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;