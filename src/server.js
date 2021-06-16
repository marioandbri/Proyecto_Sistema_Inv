const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Settings
app.set('port', process.env.PORT || 4000);

//app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Globals

//Routes
// app.get('/', (req, res) => {
//    const ot = require('./ot.json');
//    res.json(ot);
// });
app.use(require('./routes/ot.routes.js'));
app.use(require('./routes/valida.routes.js'));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Exports
module.exports = app;