var mongoose = require('mongoose');

module.exports = mongoose.model("user",{
  name : String,
  id   : String,
  location: {
    type:String,
    unique:true
  },
  image:String,
  text :String
});
