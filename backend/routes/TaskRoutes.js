const express = require('express')

const {getTask,postTask,patchTask,deleteTask} = require('../controllers/TaskControllers')

const routes = express.Router();

routes.get('/',getTask)

routes.post('/',postTask)

routes.patch('/:id',patchTask)

routes.delete('/:id',deleteTask)

module.exports = routes;
