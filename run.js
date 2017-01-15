const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
const keywords = ['job', 'jobs', 'searching', 'internship', 'intern', 'work',
  'opennings', '?', 'programming'];
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
var params = {screen_name: 'hackseb', count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    var toBeParesed = JSON.stringify(tweets, null, 2);
    JSON.parse(toBeParesed, (key, value) => {
        if (key == 'text') {
          //console.log(value);
          tweetArray.push(value);
          // console.log(tweetArray)
        }
        //}
    })

    //console.log(tweetArray);
    goThruEachTweet(tweetArray);

      // tweetArray.forEach(value => {
      // tone_analyzer.tone(value,
      //   function(err, tone) {
      //     if (err)
      //       console.log(err);
      //     else
      //       //console.log(JSON.stringify(tone, null, 2));
      //       analysis = JSON.stringify(tone, null, 2);
      //       pushJSONToArray(analysis);
      //   });
      // });
  }
});

function goThruEachTweet(array) {
  console.log("array");
  array.forEach(value => {
    var toStr = value;
    //console.log(toStr);
    // var str = "{ text: " + toStr + " }";
    // console.log(str);

    // var json = JSON.stringify( str );
    // console.log(json);

    var str = '{"text": "' + toStr + '" }';
    var json = JSON.parse(str);
    //console.log(json);


    tone_analyzer.tone(json,
      function(err, tone) {
        if (err)
          console.log(err);
        else
          //console.log(JSON.stringify(tone, null, 2));
          var score = JSON.stringify(tone, null, 2);
          //console.log("THIS THING WORKS");
          // console.log(score);
          pushJSONToArray(score);
      });
    });
}

// tone_analyzer.tone(textToCheck,
//   function(err, tone) {
//     if (err)
//       console.log(err);
//     else
//       //console.log(JSON.stringify(tone, null, 2));
//       analysis = JSON.stringify(tone, null, 2);
//       pushJSONToArray(analysis);
// });

function pushJSONToArray(jsonObj) {
    //const tempArray = [];
    JSON.parse(jsonObj, (key, value) => {
        if (key == 'score') {
          results.push(value);
        }
    })
    //console.log(results);
    checkScores(results, jsonObj);
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


      JSON.parse(jsonObj, (key, value) => {
        if (key == 'text') {
          console.log(value);
          keywords.forEach(word => {
            //console.log(word);
            if (value.includes(word)) {
              console.log(value);
              startChat();
            }
          })
        }
    })

  


}

function startChat() {
  console.log("GET THIS PATRIOT A COAT");
}