console.log('The responding bot is starting');

var Twit = require('twit');

const config = require('./config');
const T = new Twit(config);


const greetings = ["Hi " + tweetBotID + " ,my name is JobChirp. We realized you may be looking for employment, would you like our help?", "Hey " + tweetBotID + 
                ", this is Job Chirp. We had a feeling you were looking for a job, would you like our help?"];
const yes_to_greeting = ["Thats great to here! Lets get started. Whats your legal first and last name?", "Awesome! Whats your legal first and last name?"];
const yes = ["yes please", 'yes!', 'YES!', "Of course!", 'yes'];
const age = ["Cool! What is your legal date of birth?", "Perfect, lets move on. What is your legal date of birth?"];
const programming_language = ["What programming languages do you know?", "What coding languages do you know?"];
const no_to_greeting = ["This is embarrassing! Sorry and have a nice day" + tweetBotID + ".", "Our apologies, have a great day, " + tweetBotID];
const no = ["no thank you", "nah", "no", "go away"];
let counter = 0;

const USER_NAME = 'penguinsawce';
// Setting up a user stream
const stream = T.stream('user');
// Anytime someone follows me
stream.on('tweet', tweetEvent);

function getTwitterEventMessage(eventMsg) {
    return eventMsg;
}


function tweetEvent(eventMsg) {
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  const tweetBotID = eventMsg.user.screen_name;
//   var random_val = randomNumber(0,1);
  var clientName;
  var clientAGE;
  var PL;

	if ((replyto == USER_NAME) && (counter == 0)) {
		console.log("0th if" + counter);
		var newtweet = '@' + tweetBotID + " " +  greetings[random_val];
		tweetIt(newtweet);	
	}
	else if((replyto == USER_NAME) && (includesWord(text,yes) && counter==1))
	{
		console.log("1th if" + counter);
		var newtweet1 = '@' + tweetBotID + " " +  yes_to_greeting[random_val];
		tweetIt(newtweet1);
	}

	else if(replyto == USER_NAME && includesWord(text,no) && counter==2)
	{
		console.log("2nd if" + counter);
		var newtweet2 = '@' + tweetBotID + " " +  no_to_greeting[random_val];
		tweetIt(newtweet2);  
	}  		
  	else if(replyto=='penguinsawce' && counter==3)
  	{
		console.log("3rd if" + counter)
		var newtweet3 = '@' + tweetBotID + " " +  age[random_val];
  		tweetIt(newtweet3); 
  		clientAGE = text;
  	}
  	else if(replyto=='penguinsawce' && counter==4)
  	{
		console.log("4th if" + counter)
		var newtweet4 = '@' + tweetBotID + " " +  programming_language[random_val];
  		tweetIt(newtweet4); 
  		PL = text; 
  	}
  	else if(replyto=='penguinsawce' && counter==5)
  	{
		console.log("5th if" + counter)
		var newtweet5 = '@' + tweetBotID + " " +  "Thank you! Have a great a day!";
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