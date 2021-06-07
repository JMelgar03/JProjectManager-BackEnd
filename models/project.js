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
        require: true
    },
    endDate:{
        type: Date,
        require: true
    },
    task:{
        type: Array,
    },
    progress:{
        type: String,
        require: true
    },
    imgBackground:{
        type: String,
        require: true
    },
    user:{
        type: String,
        require: true
    }



});

ProjectSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Project', ProjectSchema);