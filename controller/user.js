var mongoose = require('mongoose');
var User = require('../model/user');

exports.postUser = function(req,res){
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.id = req.body.id;
    newUser.location = req.body.location;

    newUser.save(function(err,user){
      if(!err){
        res.json(user);
      }else{
        res.send("ERROR");;
      }
    })
}

exports.getAll = function(req,res){

}
