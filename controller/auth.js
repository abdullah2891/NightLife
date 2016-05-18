var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('./fb');
//var fbConfig = require('./test');

passport.serializeUser(function(user,done){
  console.log("Serializing User");
  done(null,user);
});
passport.deserializeUser(function(user,done){
  console.log("Deserializing");
  done(null,user);
});


passport.use(new FacebookStrategy({
  clientID:fbConfig.appID,
  clientSecret:fbConfig.appSecret,
  callbackURL: fbConfig.URL
},
function(accessToken,refreshToken,profile,done){
  console.log(profile);
  done(null,profile);
}))

exports.isAuthenticated = passport.authenticate('facebook',{failureRedirect:'/api/error'});
exports.islogged = function(req,res,next){
  if(req.isAuthenticated()){console.log("authenticate");next()}
  else{
    res.redirect('/api');
  }
}
