var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Article',new Schema({
	id:Number,
	type:String,	
	name:String,
	price:Number,
	stock:Number,
	note:String,
	img:String
	
}));