var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: 'fe96bc9f-d712-4c0e-abd1-9d1d6cc4c98d',
  password: 'jOHp1WNHOIij',
  version_date: '2016-05-19'
});

tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});