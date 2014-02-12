
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restfulAPI');
var db = mongoose.connection;

var bookSchema = mongoose.Schema({
	name: String,
	author: String,
	copyRight: Number
});

var Book = mongoose.model('Book', bookSchema);


var app = express();






// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index');
})


// Create
app.post('/books', function(req, res){
	console.log(req);
	Book.create({
		name: req.body.name,
		author: req.body.author,
		copyRight: req.body.copy
	}, function(err, docs){
		if (err){
			res.send(err);
		} else{
			res.send(docs);
		}
	})
})


// Edit



// remove




// View one

app.get('/books/:name', function(req, res){
	Book.find({name: req.params.name}, function(err, docs){
		if (err){
			res.send(err)
		} else{
			res.send(docs)
		}
	})
});




// View all
app.get('/all', function(req, res){
	Book.find({}, function(err, docs){
		res.send(docs);
	})
})



// Home page






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
