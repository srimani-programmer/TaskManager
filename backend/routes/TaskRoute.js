const express = require('express');
const router = new express.Router();

const { addNewTask, fetchAllTask, deleteTaskItem, updateTaskItem } = require('../controllers/taskController');

router.post('/addNewTask', addNewTask);
router.get('/fetchAllTasks', fetchAllTask);
router.delete('/deleteTaskItem', deleteTaskItem);
router.put('/updateTaskItem', updateTaskItem);

module.exports = router;