const TaskModel = require("../models/TaskModel")

const mongoose = require('mongoose')

const getTask = async(req,res)=>{
    const gettasks = await TaskModel.find({}).sort({createdAt:-1})
    res.status(200).json(gettasks)
}

const postTask = async(req,res)=>{
    const {task,status} = req.body

    try{
        const createtask = await TaskModel.create({task:task,status:status})
        res.status(200).json(createtask)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

const patchTask = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Task Found"})
    }

    const updatetask = await TaskModel.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(updatetask){
        return res.status(200).json(updatetask)
    }   
}

const deleteTask = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Task Found"})
    }

    const deletetask = await TaskModel.findByIdAndDelete({_id:id})

    if(deletetask){
        return res.status(200).json(deletetask);
    }
    
    

}

module.exports = {getTask,postTask,patchTask,deleteTask}