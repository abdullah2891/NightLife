var yelp = require('node-yelp');

exports.main = function(req,res){
  res.json({main:"this is the main page"});
}
var client = yelp.createClient({
  oauth: {
    "consumer_key": "QwPrxSX-ZoNCkauPlLZFIg",
    "consumer_secret": "WpYy3ZqC4Uvg-pOtSDtx1aJM7bU",
    "token": "GrKJ-AO92k9NVfOOdpRoW-f37PTalgXs",
    "token_secret": "o3u4YW5c06OB526-efYxPYOQ8S4"
  },

});





exports.yelp =  function(req, res) {
    console.log(req.params);
    client.search({
      terms: "bar",
      location: req.params.search
    }).then(function (data) {
      res.json(data);
    })
  }
