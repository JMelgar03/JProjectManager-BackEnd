/*
Rutas de task

host+ /api/task
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { createTask, deleteTask, updateTask } = require('../controllers/task');
const router = Router();

const { validFile } = require('../middlewares/file-validation');

router.post(
    '/new/:idProject',
    [
        check('taskTitle', 'Task Title is required.').not().isEmpty(),
        validFile
],
    createTask
);

router.delete('/:id', deleteTask );

router.put('/:id',
    [
        check('taskTitle', 'Task Title is required.').not().isEmpty(),
        validFile
    ],
    updateTask
)
module.exports = router;