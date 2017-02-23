var express = require('express');
var bodyParser = require('body-parser');
// var uriUtil = require('mongodb-uri');
var app = express();
var router = express.Router();

// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
//
// var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/todos2';
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);
// var options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };
// mongoose.connect(mongooseUri, options);
// var Todo = require('./models/todo');
// var todoRoutes = require('./routes/todos');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

app.use('/v1/gifs');

var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
  console.log('listening on this port: ' + port);
});
