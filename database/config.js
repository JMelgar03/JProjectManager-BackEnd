const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {

       await mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
    console.log('DB is online')
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to the Database');
    }
}

module.exports = {
    dbConnection
}