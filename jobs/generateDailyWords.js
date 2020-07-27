const moment = require('moment');
const DailyWordsService = require('../services/dailyWords');
const dailyWordsService = new DailyWordsService();

const generateDailyWords = async () => {
  const date = moment();
  console.log('Start generate DailyWords', date.format('DDMMYYYY'));

  await dailyWordsService.generateDailyWords(date);
  console.log('Finish generate DailyWords');
}
generateDailyWords()
  .then(() => { console.log('Finish Execution'); process.exit(); })
  .catch(err => console.log(err));