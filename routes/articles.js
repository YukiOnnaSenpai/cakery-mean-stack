var express = require('express');
var mongoose = require('mongoose');
var Article = require('../model/article');


var router = express.Router();
mongoose.connect('mongodb://localhost:27017/joydivision');

router.post('/getArticles',function(req,res){
	
	var query={type:req.body.type} ;

	Article.find(query,function(err,articles){

		//fail > neki error
		if (err){
			console.log(err)
			return res.json({success:false});
		//ok
		}else{
			return res.json({success:true,articles:articles});
		}
	})
});

router.post('/getArticle',function(req,res){
	
	console.log(req.body.id);
	var query={_id:req.body.id} ;

	Article.findOne(query,function(err,article){

		//fail > neki error
		if (err){
			console.log(err)
			return res.json({success:false});
		//ok
		}else{
			return res.json({success:true,article:article});
		}
	})
});

router.post('/add',function(req,res){
	
	var article = new Article(req.body);
	

	article.save(function(err){
		if (err){
			console.log(err)
			res.json({success:false});
		}else{
			res.json({success:true});
		}
	})


});

module.exports = router;