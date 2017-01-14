const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
//const jsonArray[];
let analysis;
const results = [];

var tone_analyzer = new ToneAnalyzerV3({
  username: 'fe96bc9f-d712-4c0e-abd1-9d1d6cc4c98d',
  password: 'jOHp1WNHOIij',
  version_date: '2016-05-19'
});

tone_analyzer.tone({ text: 'I hate dislike  Watson Developer Cloud!' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      //console.log(JSON.stringify(tone, null, 2));
      analysis = JSON.stringify(tone, null, 2);
      //console.log(analysis);
      printAnger(analysis);
});

function printAnger(jsonObj) {
    JSON.parse(jsonObj, (key, value) => {
        if (key == 'score') {
          results.push(value);
        }
    })
    //console.log(results);

    results.forEach((value) => {
      console.log("Watson says: " + value + "\n");
    })
}