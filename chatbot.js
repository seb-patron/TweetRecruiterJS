onsole.log('The responding bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');
// Anytime someone follows me
stream.on('tweet', tweetEvent);
var counter = 0;

function tweetEvent(eventMsg) {
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;
  var greetings = ["Hi " + from + " ,my name is JobChirp. We realized you may be looking for employment, would you like our help?", "Hey " + from + 
  					", this is Job Chirp. We had a feeling you were looking for a job, would you like our help?"];
  var yes_to_greeting = ["Thats great to here! Lets get started. Whats your legal first and last name?", "Awesome! Whats your legal first and last name?"];
  var yes = ["yes please", 'yes!', 'YES!', "Of course!", 'yes'];
  var age = ["Cool! What is your legal date of birth?", "Perfect, lets move on. What is your legal date of birth?"];
  var programming_language = ["What programming languages do you know?", "What coding languages do you know?"];
  var no_to_greeting = ["This is embarrassing! Sorry and have a nice day" + from + ".", "Our apologies, have a great day, " + from];
  var no = ["no thank you", "nah", "no", "go away"];
  var random_val = randomNumber(0,1);
  var legal_name;
  var client_age;
  var PL;

	if (replyto=='penguinsawce' && counter==0) {
		console.log("0th if" + counter);
		var newtweet = '@' + from + " " +  greetings[random_val];
		tweetIt(newtweet);	
	}
	else if(replyto=='penguinsawce' && includesWord(text,yes) && counter==1)
	{
		console.log("1th if" + counter);
		var newtweet1 = '@' + from + " " +  yes_to_greeting[random_val];
		tweetIt(newtweet1);
	}

	else if(replyto=='penguinsawce' && includesWord(text,no) && counter==2)
	{
		console.log("2nd if" + counter);
		var newtweet2 = '@' + from + " " +  no_to_greeting[random_val];
		tweetIt(newtweet2);  
	}  		
  	else if(replyto=='penguinsawce' && counter==3)
  	{
		console.log("3rd if" + counter)
		var newtweet3 = '@' + from + " " +  age[random_val];
  		tweetIt(newtweet3); 
  		client_age = text;
  	}
  	else if(replyto=='penguinsawce' && counter==4)
  	{
		console.log("4th if" + counter)
		var newtweet4 = '@' + from + " " +  programming_language[random_val];
  		tweetIt(newtweet4); 
  		PL = text; 
  	}
  	else if(replyto=='penguinsawce' && counter==5)
  	{
		console.log("5th if" + counter)
		var newtweet5 = '@' + from + " " +  "Thank you! Have a great a day!";
  		tweetIt(newtweet5);  	
  	}
  	counter += 1;
}

function includesWord(word, list)
{
	for(i=0; i<list.length;i++)
	{
		if(list[i].includes(word))
		{
			return true;
		}
		else return false;
	}
}


function randomNumber(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function tweetIt(txt) {

	var tweet = {
	  status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}