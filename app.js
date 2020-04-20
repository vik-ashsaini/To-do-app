var express = require('express');

var todocontroller =  require('./controllers/todocontroller');

var app = express();

// set up template engine 
app.set('view engine', 'ejs');

//static files 
app.use(express.static('./public'));	//middle ware	//route every url like localhost:3000/assets/style.css

// fire controllers
todocontroller(app);

// listen to port 
app.listen(3000);
console.log('You are listening to port 3000');
























//use in this mvc pattern 