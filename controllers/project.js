const { response } = require('express');
const Project = require('../models/project');

 const CreateProject =  async(req, res = response)=>{

           const project = new Project(req.body);
           
           try {

            const projectSaved = await project.save();

            res.json({
                ok: true,
                project: projectSaved
            })
               
           } catch (error) {
               console.log(error)
               res.status(500).json({
                   ok: false,
                   msg: 'contact to Administrator'
               })
           }

    }

const getProjects = async(req, res=response)=>{

            const projects = await Project.find({'user':req.body.user})
                                            .populate('task');

        res.json({
            ok:true,
            projects
        })

    };

    

    const updateProject = async(req, res=response)=>{
       const idProject = req.params.id;

       try {
            
            const project = await Project.findById(idProject);

            if(!project){
                return res.status(404).json({
                    ok: false,
                    msg: 'the project does not exist or was deleted'
                })
            }

            if(project.user !== req.body.user){
                return res.status(401).json({
                    ok: false,
                    msg:'user without privileges'
                })
            }

           const newProject = {
               ...req.body
           }

           const projectUpdated = await Project.findByIdAndUpdate(idProject, newProject, {new:true});
           res.json({
               ok: true,
              Project: projectUpdated
           })


       } catch (error) {
           console.log(error);
           res.status(201).json({
            ok: false,
            msg: 'contact to Administrator'
        })
       }
        
        
    };

    


    const deleteProject = async(req, res=response)=>{
        
        const idProject = req.params.id;

        try {
             
             const project = await Project.findById(idProject);
 
             if(!project){
                 res.status(404).json({
                     ok: false,
                     msg: 'the project does not exist or was deleted'
                 })
             }
 
             if(project.user !== req.body.user){
                 return res.status(401).json({
                     ok: false,
                     msg:'user without privileges'
                 })
             }
 
 
             await Project.findByIdAndDelete(idProject);

            res.json({
                ok: true,
               
            })
 
 
        } catch (error) {
            console.log(error);
            res.status(201).json({
             ok: false,
             msg: 'contact to Administrator'
         })
        }
         
         
        
        res.status(201).json({
            ok: true,
            msg: 'DeleteProjects'
        })


    }


    module.exports = {
        CreateProject,
        getProjects,
        updateProject,
        deleteProject
    }