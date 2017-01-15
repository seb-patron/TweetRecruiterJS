const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
const keywords = ['job', 'jobs', 'searching', 'internship', 'intern', 'work',
  'opennings', '?', 'programming', 'employment'];
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

const CLIENT_NAME = 'penguinsawce';
const NUMBER_OF_TWEETS_TO_RETRIEVE = 5;

const Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'ialOm7LL47LFjLcOKUlHeQFTc',
  consumer_secret: 'mJirvzmoZbKzNMl4EjhZsFsrzW2viqw1nor5hyjkhVwIrOuLWI',
  access_token_key: '820148009379868673-q5WS8P2ccAvLu0A9OOdKFeYm5Crz5T1',
  access_token_secret: 'yL4KOKYzvM6c6J5dCqrOXbGhZZh1bZeXBdV4pQhpgy3Xb'
});

var textToCheck =  {
  "text": "Anyone know of programming jobs this summer?"

}

var tone_analyzer = new ToneAnalyzerV3({
  username: 'fe96bc9f-d712-4c0e-abd1-9d1d6cc4c98d',
  password: 'jOHp1WNHOIij',
  version_date: '2016-05-19'
});

//var params = {screen_name: '_TweetRecruiter'};
var params = {screen_name: CLIENT_NAME, count: NUMBER_OF_TWEETS_TO_RETRIEVE};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    var toBeParesed = JSON.stringify(tweets, null, 2);
    JSON.parse(toBeParesed, (key, value) => {
        if (key == 'text') {
          console.log(toBeParesed);
          tweetArray.push(value);
          // console.log(tweetArray)
        }
        //}
    })
    console.log(tweetArray);
    goThruEachTweet(tweetArray);
  }
});

function goThruEachTweet(array) {
  console.log("array");
  array.forEach(value => {
    //parse each text string in the array and convert to 
    //JSON Object
    var toStr = value;
    var str = '{"text": "' + toStr + '" }';
    var json = JSON.parse(str);

    //Take each newly created JSON Object and analyze with watson
    tone_analyzer.tone(json,
      function(err, tone) {
        if (err)
          console.log(err);
        else
          console.log(JSON.stringify(tone, null, 2));
          var score = JSON.stringify(tone, null, 2);
          pushJSONToArray(score);
      });
    });
}


function pushJSONToArray(jsonObj) {
    const scoreArr = [];
    const textArr = [];
    JSON.parse(jsonObj, (key, value) => {
        if (key == 'score') {
          scoreArr.push(value);
        }
        if (key == 'text') {
          textArr.push(value);
        }
    })
    // console.log({scoreArr, textArr})
    // console.log()
    // console.log()
    // console.log("New iteration");
    // console.log()
    // console.log()
    
    //checkScores(scoreArr, textArr);
}

function checkScores(results, jsonObj) {
  // const text = JSON.stringify(jsonObj, null, 2);
  // //console.log(text);
  // //const tempArray = [];
  // if (results[10] > .1 ) {
  //   keywords.forEach(word => {
  //     if (text.includes(word)) {
  //       console.log(results[TENTATIVE]);
  //       startChat();
  //     }
  //   })
  // }

  console.log(results[23]);


      JSON.parse(jsonObj, (key, value) => {
        if (key == 'text') {
          console.log(value);
          keywords.forEach(word => {
            //console.log(word);
            if (value.includes(word)) {
              if (results[TENTATIVE]) {
                 console.log(value);
                  startChat();
              }
            }
          })
        }
    })

  


}

function startChat() {
  console.log("GET THIS PATRIOT A COAT");
}