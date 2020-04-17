var Twit = require('twit');
var config = require('./twitter-config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

module.exports.tweeter = (tweet) => {
  
    // Post that tweet!
    T.post('statuses/update', { status: tweet }, tweeted);
  
    // Callback for when the tweet is sent
    function tweeted(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Success: ' + data.text);
        //console.log(response);
      }
    };
}
