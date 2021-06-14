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

module.exports = model('Task', TaskSchema);

