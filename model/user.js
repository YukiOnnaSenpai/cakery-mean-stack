var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},	
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	fname:String,
	lname:String,
	role:String,
	user_reciept:[{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Receipt'
	}]
	
});

schema.pre('getUser', function (next) {
    this.populate('user_reciept');
    next();
});

module.exports = mongoose.model('User', schema);