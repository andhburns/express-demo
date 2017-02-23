var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');
var Gifs = require('./models/gif');
mongoose.Promise = global.Promise;

var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gif';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);

// var gifs = [{
//     keyword: 'funny cat',
//     url: 'https://media.giphy.com/media/Meky3iFKdLsju/giphy.gif',
//     description: "A funny cat on the beach."
// },
// {
//     keyword: 'bear',
//     url: 'https://media.giphy.com/media/k9sgLnzYWTRza/giphy.gif',
//     description: "A bear in the bitterroot that is very friendly."
// },
// {
// 	  keyword: "kangaroo",
//     url: 'https://media.giphy.com/media/3o7qDVLqhF2xZydsxW/giphy.gif',
// 	  description: "stick"
// }
// ]

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(function(req, res, next){
    req.veryImportantInformation = 'Super crucial to the request';
    next();
})

app.get('/v1/gifs/search', function(req, res){
    var query = req.query.q;
    Gifs.find({keyword:query}, function(err, foundgifs){
    if(err){
      next(err);
    } else {
      res.json(foundgifs)
    }
  });
    // res.json(gifs.filter(function(gif){
    //     return gif.keyword === query;
    // }));
})


app.post('/v1/gifs', function(req, res){
  var aGif = new Gifs();
  aGif.keyword = req.body.gif.keyword;
  aGif.url = req.body.gif.url;
  aGif.description = req.body.gif.description;
  aGif.save(function(err, bGif){
    if(err){
      next(err);
    } else {
      res.json(bGif);
    }
  })
})

// app.post('/v1/gifs', function(req, res){
//     gifs.push(req.body.gif);
//     return res.json({
//         success: true,
//         gif: req.body.gif,
//         totalGifs: gifs.length
//     });
// });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  var gifs = [];
  Gifs.find(function(error, allGifs)  {
    if(error){
      next(error);
    } else {
      res.render('index', {gifs: allGifs});
    }
  });
});

// app.get('*', function(req, res){
//     res.send('<html><head></head><body><h1>404 page not found: ' + req.url +'</h1>' +req.veryImportantInformation + '</body></html>');
//     res.end();
// })

var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
  console.log('listening on this port: ' + port);
});
