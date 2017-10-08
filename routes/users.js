var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../model/user');


var router = express.Router();
mongoose.connect('mongodb://localhost:27017/joydivision');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getUser',function(req,res){
	
	var query={username:req.body.username} ;
		
	User.findOne(query).populate('user_reciept').exec(function(err,user){
		//fail > neki error
		if (err){
			console.log(err)
			res.json({success:false});

		//fail > user not found
		}else if(!user){
			res.json({success:false,msg:"korisnik ne postoji"});

		//ok
		}else{
			res.json({success:true,msg:"uspesno ste ulogovani",user:user});
		}
	})


});

router.post('/register',function(req,res){
	
	var user = new User(req.body);
	console.log(user);

	user.save(function(err){
		if (err){
			console.log(err)
			res.json({success:false});
		}else{
			res.json({success:true});
		}
	})


});

//authenticate user and return jwt
router.post('/auth',function(req,res){
	
	var query={username:req.body.username} ;
		
	User.findOne(query,function(err,user){
		//fail > neki error
		if (err){
			console.log(err)
			res.json({success:false});

		//fail > user not found
		}else if(!user){
			res.json({success:false,msg:"korisnik ne postoji"});

		//fail > password doesnt match
		}else if(user.password != req.body.password){
			res.json({success:false,msg:"neispravna sifra"});

		//ok
		}else{
			res.json({success:true,msg:"uspesno ste ulogovani",user:user});
		}
	})
});



module.exports = router;
