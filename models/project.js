const {Schema, model} = require('mongoose');

const ProjectSchema = Schema({
    projectName:{ 
        type: String,
        require: true
    },
    description:{
        type: String
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    task:[{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    progress:{
        type: String,
        required: true
    },
    imgBackground:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }



});

ProjectSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Project', ProjectSchema);