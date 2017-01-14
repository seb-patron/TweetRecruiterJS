const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
const keywords = ['job', 'jobs', 'searching', 'internship', 'intern', 'work',
  'opennings', '?'
]
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

var Twitter = require('twitter');
 
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
client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});

tone_analyzer.tone(textToCheck,
  function(err, tone) {
    if (err)
      console.log(err);
    else
      //console.log(JSON.stringify(tone, null, 2));
      analysis = JSON.stringify(tone, null, 2);
      pushJSONToArray(analysis);
});

function pushJSONToArray(jsonObj) {
    const tempArray = [];
    JSON.parse(jsonObj, (key, value) => {
        if (key == 'score') {
          results.push(value);
        }
    })
    //console.log(results);
    checkScores(results, jsonObj);

    // results.forEach((value) => {
    //   console.log("Watson says: " + value + "!\n");
    // })
}

function checkScores(results, jsonObj) {
  const text = JSON.stringify(textToCheck.text, null, 2);
  const tempArray = [];
  if (results[TENTATIVE] > .7 ) {
    // JSON.parse(text, (key, value) => {
    //     if (key == 'score') {
    //       tempArray.push(value);
    //     }
    //     console.log(tempArray)
    //     console.log(results[TENTATIVE]);
    // })
    keywords.forEach(word => {
      if (text.includes(word)) {
        console.log("Success!")
        startChat();
      }
    })
    // console.log(jsonObj);
  }
  //console.log(results);
}

function startChat() {
  console.log("start chat called");
}