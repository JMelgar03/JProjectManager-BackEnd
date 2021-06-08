const { response } = require('express');
const Task = require('../models/task');
const Project = require('../models/project');
const project = require('../models/project');

const createTask = async(req, res = response)=>{
    
    const idProject = req.params.idProject;
    const task = new Task( req.body );

    try {
        
        const project = await Project.findById(idProject);
        

        if(!project){
            return res.status(404).json({
                ok: false,
                msg: 'the project does not exist or was deleted'
            })
        }

        const taskSaved = await task.save();
        
        project.task.push(taskSaved._id);
        

        const projectUpdated = await Project.findByIdAndUpdate(idProject, project, {new:true});

        res.status(201).json({
            ok:true,
           projectUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'contact to Administrator'
        })
    }

}


const updateTask = async(req, res = response)=>{

    const idTask = req.params.id;

    try {
        
        const task = await Task.findById(idTask);
        if(!task){
            return res.status(404).json({
                ok: false,
                msg: 'the task does not exist or was deleted'
            })
        }

        const newTask = {
            ...req.body
        }

        const taskUpdated = await Task.findByIdAndUpdate(idTask,newTask);

        res.json({
            ok: true,
            Task: taskUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(201).json({
            ok: false,
            msg:'contact to Administrator'
        })
    }


}



const deleteTask = async(req, res = response)=>{
    const idTask = req.params.id
  
   try {
        
        const task = await Task.findById(idTask);
        if(!task){
            return res.status(404).json({
                ok: false,
                msg: 'the task does not exist or was deleted'
            })
        }

        await Task.findByIdAndDelete(idTask);
        
       const project = await Project.findOne({'task':idTask});
        
       
         project.task.pull(idTask)
            
        
         await Project.findByIdAndUpdate(project._id,project);
        
     res.json({
         ok: true
     })

    } catch (error) {
        console.log(error);
        res.status(201).json({
            ok: false,
            msg:'contact to Administrator'
        })
    }
    
  
}



module.exports = {
    createTask,
    deleteTask,
    updateTask
}