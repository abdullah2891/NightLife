var mongoose = require('mongoose');
var User = require('../model/user');


exports.isGoing = function(req,res){
  var user = req.session.passport.user;

  var newUser = new User();

  newUser.name = user.displayName;
  newUser.id = user.id;
  newUser.location = req.body.location;

  newUser.save(function(err,user){
    if(err){
      res.send("error");
    }else{
      console.log(user);
      res.json(user);
    }
  });

}
exports.getAll = function(req,res){
  User.find(function(err,preference){
    if(!err){
      res.json(preference);
    }else{
      res.json(err);
    }
  })
}

exports.getUser = function(req,res){
  var user = req.session.passport.user;
  User.find({id:user.id},function(err,user){
    if(!err){
      res.json(user);
    }else{
      res.json(err);
    }
  })
}

exports.deleteUser =  function(req,res){
  var user = req.session.passport.user;

  User.remove({id:user.id},function(err,user){
    if(!err){
      res.send("removed");
    }else{
      res.json(err);
    }
  })
}
