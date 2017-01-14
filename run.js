const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
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

var tone_analyzer = new ToneAnalyzerV3({
  username: 'fe96bc9f-d712-4c0e-abd1-9d1d6cc4c98d',
  password: 'jOHp1WNHOIij',
  version_date: '2016-05-19'
});

tone_analyzer.tone({ text: 'I need a job this summer, anyone have some cs opennings?' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      //console.log(JSON.stringify(tone, null, 2));
      analysis = JSON.stringify(tone, null, 2);
      //console.log(analysis);
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
    checkScores(results);

    // results.forEach((value) => {
    //   console.log("Watson says: " + value + "!\n");
    // })
}

function checkScores(results) {
  if (results[TENTATIVE] > .7 ) {
    console.log(results[TENTATIVE]);
  }
  //console.log(results);
}