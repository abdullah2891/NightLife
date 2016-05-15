var mongoose = require('mongoose');

module.exports = mongoose.model("user",{
  name : String,
  id   : String,
  location: String,
  
});
