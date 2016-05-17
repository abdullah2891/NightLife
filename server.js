var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var gitConfig = require('./config/git');


//db URI
//mongoose.connect(gitConfig.local);
mongoose.connect(gitConfig.heroku);
//controller
var UserController = require('./controller/user');
var authController = require('./controller/auth');
var preferenceController = require('./controller/preference');
var searchController = require('./controller/search');

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
.get(authController.islogged, preferenceController.getAll);

router.route('/get')
.get(authController.islogged,preferenceController.getUser)
.delete(authController.islogged,preferenceController.deleteUser);

//search
router.route('/search/:search')
.get(searchController.yelp);

//ERROR
router.route('/error')
.get(UserController.errorPage);

//server
app.get('/login/facebook/callback',
authController.isAuthenticated,
function(req,res){
  console.log("LOGGED IN ");
  res.redirect('/');
})

app.get('/logout',function(req,res){

  req.logout();
  res.redirect('/');
})

//SERVING STATIC PAGE
app.use('/test',express.static(__dirname+'/testClient'));
app.use('/',express.static(__dirname+'/client'));

//server
var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
  console.log("app is starting "+ PORT);
});
