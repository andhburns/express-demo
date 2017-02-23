var mongoose = require('mongoose');
var validators = require('mongoose-validators');

var Gifs = new mongoose.Schema({
  keyword: String,
  description: String,
  url: String
});


module.exports = mongoose.model('Gifs', Gifs);
