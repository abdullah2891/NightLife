var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');

//db URI
mongoose.connect('mongodb://localhost/planner');


//controller
var UserController = require('./controller/user');
var authController = require('./controller/auth');
var preferenceController = require('./controller/preference');

//middleware
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(bodyParser.json());
app.use(expressSession({
  secret:"secret"
}))
app.use(passport.initialize());
app.use(passport.session());

//router configuration
var router = express.Router();
app.use('/api',router);


//router
router.route('/').get(UserController.mainPage);


//aonly for production environment
router.route('/post')
.post(UserController.postUser)
.get(authController.islogged,UserController.getAll);

//POST PREFERENCE
router.route('/preference')
.post(preferenceController.isGoing)
.get(preferenceController.getAll);

router.route('/get')
.get(authController.islogged,preferenceController.getUser)
.delete(authController.islogged,preferenceController.deleteUser);

//ERROR
router.route('/error')
.get(UserController.errorPage);

//server
app.get('/login/facebook/callback',
authController.isAuthenticated,
function(req,res){
  console.log("LOGGED IN ");
  res.redirect('/test');
})

//SERVING STATIC PAGE
app.use('/test',express.static(__dirname+'/testClient'));

//server
var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
  console.log("app is starting "+ PORT);
});
