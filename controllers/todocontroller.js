var bodyparser=require('body-parser');
var mongoose = require('mongoose');


//connect to database 
mongoose.connect('mongodb+srv://vikash:vikash@cluster0-56vyj.mongodb.net/test?retryWrites=true&w=majority');
//mongodb+srv://vikash:<password>@cluster0-56vyj.mongodb.net/test?retryWrites=true&w=majority

//create a schema - this is like a blueprint 
var todoschema = new mongoose.Schema({
	item : String
});

var Todo =  mongoose.model('Todo',todoschema);
// var itemOne = Todo({ item : 'buy flowers'}).save(function(err){
// 	if (err) throw err;
// 	console.log('item svaed');
// }); remove this 




// var data = [{item:'get milk'},{item:'walk dog '},{item:'kick some coading ass '}];
var urlencodedparser=bodyparser.urlencoded({extended:false}); 

module.exports=function(app) {

	app.get('/todo',function(req,res){
		//get data from mongodb and pass it to view
		Todo.find({}, function(err , data){
			if (err) throw err;
			res.render('todo',{todos:data});
		});
		// res.render('todo',{todos:data});
	});

	app.post('/todo',urlencodedparser,function(req,res){
		//get data from the view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
		// data.push(req.body);
		// res.json(data);
	});

	app.delete('/todo/:item',function(req,res){
		//delete the requested item from mongodb 
		Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		});
		// data = data.filter(function(todo){
		// 	return todo.item.replace(/ /g, '-') !== req.params.item;
		// });
		// res.json(data);
	});

};