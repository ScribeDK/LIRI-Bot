var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
//var keys = require(./keys.js);

var action = process.argv[2];
action = action.toLowerCase();

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

function myTweets(){
	
}

function doWhatItSays(){
	
	fs.readFile("random.txt", "utf8", function(err, data){

	if(err){
		return console.log(err);
	}
	console.log(data);
	
	process.argv[3] = data;
	
	console.log (process.argv);
	
	spotifyThisSong();
	});
}

function spotifyThisSong(){
	
	var songName = process.argv[3];
	
	if (songName == null){songName = "The Sign";}
	
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	
	//create a space before the data
	console.log();
	// Then log data
	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	console.log("Track Title: " + data.tracks.items[0].name);
	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	console.log("Album Title: " + data.tracks.items[0].album.name);
	
	});
	
	fs.appendFile("log.txt", ", " + songName, function(err){
		if(err){
			return console.log(err);
		}
	});
}

function movieThis(){
	
	var movieName = process.argv[3];
	
	if (movieName == null){
		movieName = "the-wedding-singer";
	}
	
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
	
	request(queryUrl, function (error, response, data) {

	// If the request was successful
	if (!error && response.statusCode == 200) {

		//create a space before the data
		console.log();
		// Then log data
		console.log("Title: "+JSON.parse(data)["Title"]);
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
	
	fs.appendFile("log.txt", ", " + movieName, function(err){
		if(err){
			return console.log(err);
		}
	});
	
	
	
}