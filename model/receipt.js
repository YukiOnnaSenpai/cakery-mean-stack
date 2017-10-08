var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	
	quantity: Number,
	taste: String,
	color: String,
	status: String,
	topping: String,
	note: String,
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	},
	article: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Article'
	}
})

schema.pre('save', function (next) {
	this.date = new Date();
	next();
});

schema.pre('getReceipts', function (next) {
	this.populate('article');
	next();
});

module.exports = mongoose.model('Receipt', schema);