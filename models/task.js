const {Schema, model} = require('mongoose');

const TaskSchema = Schema({

    taskTitle:{
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true
    }

})

TaskSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Task', TaskSchema);

