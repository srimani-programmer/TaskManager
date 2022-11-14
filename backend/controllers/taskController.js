const { default: mongoose } = require('mongoose');
const TaskModel = require('../models/TaskModel');


const addNewTask = async (req, res) => {
    const taskName = req.body['taskName'];
    const status = req.body['status'];

    const insertStatus = await TaskModel.create({
        taskName,
        status
    });

    if (insertStatus) {
        res.status(201).json({ 'task': insertStatus })
    } else {
        res.status(400).json({ 'message': "Invalid Request" })
    }
}

const fetchAllTask = async (req, res) => {

    const result = await TaskModel.find({}, { __v: 0 });

    if (result) {
        res.status(200).json({ 'tasks': result });
    } else {
        res.status(500).json({ 'error': "Something went wrong" });
    }
}

const deleteTaskItem = async (req, res) => {

    const id = req.body['id'];
    if (mongoose.isValidObjectId(id)) {
        const deleteResponse = await TaskModel.findByIdAndDelete(id);

        if (deleteResponse) {
            res.status(200).json({ 'success': 'Task Deleted Successfully.' });
        } else {
            res.status(500).json({ 'error': 'Something went wrong.' });
        }
    } else {
        res.status(400).json({ 'error': 'Invalid Task Id' });
    }
}

const updateTaskItem = async (req, res) => {
    console.log(req.body);
    const id = req.body['id'];
    const taskName = req.body['taskName'];

    console.log(id, taskName);

    if (mongoose.isValidObjectId(id) && taskName) {
        const updateResponse = await TaskModel.updateOne({ _id: id }, { $set: { taskName } })

        if (updateResponse) {
            res.status(200).json({ 'success': 'Task Item updated successfully.' })
        } else {
            res.status(500).json({ 'error': 'Something went wrong.' });
        }
    } else {
        res.status(400).json({ 'error': 'Invalid Input' });
    }
}

module.exports = {
    addNewTask,
    fetchAllTask,
    deleteTaskItem,
    updateTaskItem
}