require("dotenv").config();
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require("fs");

var userInput = process.argv[2];
var userCommand = process.argv[3];

switch (userCommand) {
  case "show-tweets":
    getTweets(userInput)
    break;

  default:
    console.log("Show Tweets");

}

function getTweets(userName) {
  var params = { screen_name: userName };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
      fs.appendFile("saved-tweets.txt", tweetFrom, function (err) {
        if (err) {
          return console.log(err);
        }
        for (var i = 0; i < tweets.length; i++) {
          var twitterResponse = "\n---------\n" + "Tweet: " + tweets[i].text + "\nDate of Tweet " + tweets[i].created_at;
          console.log(twitterResponse);
          fs.appendFile("saved-tweets.txt", twitterResponse, function (err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    }
  });
}

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
      });
      
spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
});

var request = require("request");

// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});

var fs = require("fs");

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.// It will then print "Inception, Die Hard" in the file
fs.writeFile("random.txt", "Inception, Die Hard", function(err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  // Otherwise, it will print: "random.txt was updated!"
  console.log("random.txt was updated!");

});
