const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
//Middleware
app.use(express.urlencoded({extended: false}));
//Globals

//Routes
app.get('/', (req, res) => {
   res.send('<h1>Hello World</h1>')
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Export
module.exports = app;