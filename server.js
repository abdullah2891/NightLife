var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

//db URI
mongoose.connect('mongodb://localhost/planner');


//controller
var UserController = require('./controller/user');
//middleware
app.use(bodyParser.urlencoded({
  extended : true
}));
var router = express.Router();
app.use('/api',router);


//router

router.route('/post')
.post(UserController.postUser)
.get(UserController.getAll);



var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
  console.log("app is starting "+ PORT);
});
