const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
const keywords = ['job', 'jobs', 'searching', 'internship', 'intern', 'work',
  'opennings', '?', 'programming', 'employment'];
const yesArray = ['yes', 'yes!', 'yeah', 'Yes', 'yeah', 'yea', 'Yea', 'course', 'think', 'possibly', 'true'];
const langaugesArray = ['ruby', 'java', 'javascript', 'node.js', 'node', 'js', 'c', 'c++', 'cpp', 'scala',
'haskell', 'assembly', 'c#', 'c sharp', 'csharp', 'lisp', 'fortran', 'brainfuck', 'applescript', 
'apple script', 'python', 'snakey lang'];

//const NUMBER_OF_TWEETS_TO_RETRIEVE = 5;
const tweetArray = [];
const results = [];
const ANGER = 0;
const DISGUST = 1;
const FEAR = 2;
const JOY = 3;
const SADNESS = 4;
const ANALYTIC = 5;
const CONFIDENTIAL = 6;
const TENTATIVE = 7;
const OPENNESS = 8;
const CONSCIENTIOUSNESS = 9;
const EXTRAVERSION = 10;
const AGREEABLENESS = 11;
const EMOTIONAL_RANGE = 12;

const numberEmotions = 12;

const CLIENT_NAME = 'hackseb';
const AT_CLIENT_NAME = '@' + CLIENT_NAME;
const NUMBER_OF_TWEETS_TO_RETRIEVE = 10;

const Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'ialOm7LL47LFjLcOKUlHeQFTc',
  consumer_secret: 'mJirvzmoZbKzNMl4EjhZsFsrzW2viqw1nor5hyjkhVwIrOuLWI',
  access_token_key: '820148009379868673-q5WS8P2ccAvLu0A9OOdKFeYm5Crz5T1',
  access_token_secret: 'yL4KOKYzvM6c6J5dCqrOXbGhZZh1bZeXBdV4pQhpgy3Xb'
});

// var textToCheck =  {
//   "text": "Anyone know of programming jobs this summer?"

// }

var tone_analyzer = new ToneAnalyzerV3({
  username: 'fe96bc9f-d712-4c0e-abd1-9d1d6cc4c98d',
  password: 'jOHp1WNHOIij',
  version_date: '2016-05-19'
});

//var params = {screen_name: '_TweetRecruiter'};
var params = {screen_name: CLIENT_NAME, count: NUMBER_OF_TWEETS_TO_RETRIEVE};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      console.log("Get tweets accessed");
    var json = JSON.stringify(tweets, null, 2);
    //console.log(json);
    JSON.parse(json, (key, value) => {
        if (key == 'text') {
            let returnedValue = sanitize(value);
            tweetArray.push(returnedValue);
          // console.log(tweetArray)
        }
    })
    }
      processWatson(tweetArray);
});

function sanitize(text) {
    var newText = text;
    //while (newText.includes('.')) newText = newText.replace('.',' ');
    newText = text.replace('.',' ');
    newText = newText.replace(';', ' ');
    newText = newText.replace('"', ' ');
    while (newText.includes('#')) newText = newText.replace('#', ' ');
    return newText;
}

function processWatson(tweetArray) {

    //Checks to see if tweet is actually just a hashtag and skips it is a hashtage
    tweetArray.forEach(tweet => {
        if (!tweet.includes(' ')){
            return;
        }

        tweet = tweet.slice(0, tweet.length/2) + "." + tweet.slice(tweet.length/2);
        tone_analyzer.tone({ text: tweet }, function(err, data) {
            if (err){
                console.log(err);
            } else { 
                //console.log(JSON.stringify(data, null, 2));
                //console.log();
                checkScoreAndTextContent(JSON.stringify(data, null, 2));
            }
        });
    });
}


function checkScoreAndTextContent(json) {
    let text;
    let keywordMatch = false;
    let toneMatch = false;
    JSON.parse(json, (key, value) => {
        if (key == 'text') {

            //check to see of text contains keyword
            keywords.forEach(word => {
                //console.log(word);
                if (value.includes(word)) {
                    console.log("WE HAVE A MATCH!!");
                    keywordMatch = true;
                }
            })
        }

        //checks if tone match is high
        //only executes if keyword found
        if (keywordMatch == true) {
            const scoreArr = [];
            JSON.parse(json, (key, value) => {
                if (key == 'score') {
                    scoreArr.push(value);
                }
            })
            if (scoreArr[TENTATIVE] > .6 ) {
                toneMatch = true;
            } else if (scoreArr[SADNESS] > .5 ) {
                toneMatch = true;
            } else if (scoreArr[ANALYTIC] > .6 ) {
                toneMatch = true;
            }   
            
        }
    });

    if (toneMatch || keywordMatch) {
        startChat();
    }
}


function startChat() {
    console.log("GET THIS MAN A COAT!")
    tweetAtPotentialJobSearcher();
}


function tweetAtPotentialJobSearcher() {
    let jobPrompt =  'Hey ' + AT_CLIENT_NAME + ', it sounds like you may be looking for a job? Need help?'
    client.post('statuses/update', {status: jobPrompt},  function(error, tweet, response) {
        if(error) {
            // throw error;
            console.log(error);
        }
        // console.log(tweet);  // Tweet body. 
        // console.log(response);  // Raw response object. 
    });
}

var stream = client.stream('statuses/filter', {screen_name: CLIENT_NAME, track: '@jobchirp'});
stream.on('data', function(event) {
    console.log(event && event.text);
    console.log("We got a response!!");
    makeAResponse(event);
});

stream.on('error', function(error) {
    throw error;
});

function makeAResponse(data) {
    let text = data.text;
    let replyID = data.id_str;
    yesArray.forEach(word => {
        if (text.includes(word)) {
            console.log("We have a match!!!");
            console.log({text, replyID});
            askLanguages(replyID);
        }
    });
    langaugesArray.forEach(language => {
        if (text.includes(language)) {
            askWorkPreferences(replyID);
        }
    });

}


function askLanguages(replyID) {
    let langPrompt = AT_CLIENT_NAME + ' Cool, let me ask a few questions first. What programming languages do you know?';
    client.post('statuses/update', {status: langPrompt, in_reply_to_status_id: replyID},  function(error, tweet, response) {
        if(error) {
            console.log(error);
            //throw error;
        }
        console.log("tweetback successful! We are asking for work prefernces");
    // console.log(tweet);  // Tweet body. 
    // console.log(response);  // Raw response object. 
    });

}

function askWorkPreferences(replyID) {
    let workPrefPrompt = AT_CLIENT_NAME + ' Sweet, one last question: What is your dream workplace like?';
    client.post('statuses/update', {status: workPrefPrompt, in_reply_to_status_id: replyID},  function(error, tweet, response) {
        if(error) {
            console.log(error);
            //throw error;
        }
        console.log("tweetback successful!");
    });
}