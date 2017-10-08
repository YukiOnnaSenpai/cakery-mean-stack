var express = require('express');
var mongoose = require('mongoose');
var Receipt = require('../model/receipt');


var router = express.Router();
mongoose.connect('mongodb://localhost:27017/joydivision');

router.post('/save',function(req,res){
	
	var receipt = new Receipt(req.body);

	receipt.save(function(err){
		if (err){
			console.log(err)
			res.json({success:false});
		}else{
			res.json({success:true});
		}
	})


});

router.post('/getReceipts',function(req,res){
	
	var query={user:req.body.user} ;

	Receipt.find(query).populate('article').exec(function(err,receipts){

		//fail > neki error
		if (err){
			console.log(err)
			return res.json({success:false});
		//ok
		}else{
			console.log(receipts)
			return res.json({success:true,receipts:receipts});
		}
	})


});

module.exports = router;