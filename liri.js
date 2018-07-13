require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

//var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


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


// wrtie a function for this wrapping up this code
spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log(data);
});


function getMovies(movieName) {
  // var params = { title, year, rating, country, language, plot, actors }
  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      var movieObj = JSON.parse(body);
      console.log(movieObj);
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("The movie's rating is: " + movieObj.imdbRating);
    }

    // var fs = require("fs");

    // // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.// It will then print "Inception, Die Hard" in the file
    // fs.writeFile("random.txt", "Inception, Die Hard", function (err) {

    //   // If the code experiences any errors it will log the error to the console.
    //   if (err) {
    //     return console.log(err);
    //   }

    //   // Otherwise, it will print: "random.txt was updated!"
    //   console.log("random.txt was updated!");

    // });
  });
}


var liriCommand = process.argv[2];
var liriParameter = process.argv[3];

switch (liriCommand) {
  case "show-tweets":
    getTweets(liriParameter)
    break;

  case "movie-this":
    getMovies(liriParameter);
    break;

  // add the case 
    //call the function

  default:
    console.log("hit default case");
}
