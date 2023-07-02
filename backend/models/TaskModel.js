const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task:{
        type:"String",
        required:true
    },
    status:{
        type:"Boolean",
        required:true
    }
})

const myDB = mongoose.connection.useDb('ToDoList')

module.exports = myDB.model('Tasks',TaskSchema)