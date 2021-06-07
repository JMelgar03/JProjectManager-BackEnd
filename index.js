const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//console.log(process.env);

const app = express();

//base de datos
    dbConnection();

 //CORS
 app.use(cors());   

//directorio publico

app.use( express.static('public') );

//Lectura y parseo del body

app.use( express.json() );

//Rutas
app.use('/api/project', require('./routes/project'));


//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor levantado en el puerto ${ process.env.PORT }`);
})