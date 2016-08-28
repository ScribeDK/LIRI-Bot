//load required packages
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys.js').twitterKeys;

//save first input
var action = process.argv[2];

//set first input to lowercase
if (action != null){
action = action.toLowerCase();
}

//choose action based on input
if (action == "do-what-it-says"){
	doWhatItSays()
}

else if (action == "my-tweets"){
	myTweets();
}

else if (action == "spotify-this-song"){
	spotifyThisSong();
}

else if (action == "movie-this"){
	movieThis();
} 

//lookup tweets
function myTweets(){
	
	//create client from keys
	var client = new Twitter(keys);
	
	//set user name
	var params = {screen_name: 'nodejs'};
	
	//get data from twitter
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
		
		//display numbered tweets texts
		for (i = 0; i < tweets.length; i++){
		var num = i + 1;
		console.log("\n" + num + ": " + tweets[i].text);
		}
	}
	}
)};
	


//load data from file
function doWhatItSays(){
	
	//get file data
	fs.readFile("random.txt", "utf8", function(err, data){

	if(err){
		return console.log(err);
	}

	//set data to second input
	process.argv[3] = data;
	
	//run spotify function
	spotifyThisSong();
	});
}

function spotifyThisSong(){
	
	//save second input
	var songName = process.argv[3];
	
	//default to "the-sign"
	if (songName == null){songName = "The-Sign";}
	
	//get data from spotify
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	
	// Then log data
	console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
	console.log("Track Title: " + data.tracks.items[0].name);
	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	console.log("Album Title: " + data.tracks.items[0].album.name);
	
	});
	
	//add input to log file
	fs.appendFile("log.txt", ", " + songName, function(err){
		if(err){
			return console.log(err);
		}
	});
}

function movieThis(){
	
	//save second input
	var movieName = process.argv[3];
	
	//default to "the-wedding-singer"
	if (movieName == null){
		movieName = "the-wedding-singer";
	}
	
	//set query
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
	
	//get data from omdb
	request(queryUrl, function (error, response, data) {

	// If the request was successful
	if (!error && response.statusCode == 200) {

		// Then log data
		console.log("\nTitle: "+JSON.parse(data)["Title"]);
		console.log("Year published: "+JSON.parse(data)["Year"]);
		console.log("IMDB Rating: "+JSON.parse(data)["imdbRating"]+"/10");
		console.log("Country where produced.: "+JSON.parse(data)["Country"]);
		console.log("Language: "+JSON.parse(data)["Language"]);
		console.log("Plot: "+JSON.parse(data)["Plot"]);
		console.log("Actors: "+JSON.parse(data)["Actors"]);
		console.log("Rotten Tomatoes Rating: "+JSON.parse(data)["tomatoUserRating"]+"/5");
		console.log("Rotten Tomatoes URL: "+JSON.parse(data)["tomatoURL"]);
	}
	});
	
	//add input to log file
	fs.appendFile("log.txt", ", " + movieName, function(err){
		if(err){
			return console.log(err);
		}
	});
	
	
	
}