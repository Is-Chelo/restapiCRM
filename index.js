const express = require('express');
const app = express();
const routes = require('./routes/index')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// conectar mongo
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/restApis',{
        useNewUrlParser:true
    })


// configuraciones basicas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



// server
app.listen(5000);


// rutas
app.use('/', routes())