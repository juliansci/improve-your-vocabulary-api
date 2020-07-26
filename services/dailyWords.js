const MongoDB = require('../lib/mongo');
const moment = require('moment');
const WordsService = require('./words');

const DAILY_WORDS = 20;

class DailyWordsService {
  constructor() {
    this.collection = 'daily-words';
    this.mongoDB = new MongoDB();
    this.wordsService = new WordsService();
  }

  async getDailyWords() {
    console.time('DailyWords-getDailyWords');
    const currentDate = moment();
    const dailyWords = await this.getDailyWordsByDate(currentDate);
    if (dailyWords) {
      console.log(`DailyWords found - ${currentDate.format('DDMMYYYY')}`);
      console.timeEnd('DailyWords-getDailyWords');
      return dailyWords;
    }
    const words = [];
    for (let i = 0; i < DAILY_WORDS; i++) {
      const randomWord = await this.wordsService.getRandomWord();
      words.push(randomWord);
    }
    await this.createDailyWords(words);
    console.timeEnd('DailyWords-getDailyWords');
    return this.getDailyWordsByDate(currentDate);
  }

  async createDailyWords(words) {
    console.time('DailyWords-create');
    const currentDateFormatted = moment().format('DDMMYYYY');
    const dailyWords = {
      date: currentDateFormatted,
      words
    };
    await this.mongoDB.create(this.collection, dailyWords);
    console.timeEnd('DailyWords-create');
  }

  async getDailyWordsByDate(date) {
    console.time('DailyWords-getByDate');
    const dateFormatted = date.format('DDMMYYYY');
    const dailyWords = await this.mongoDB.findOne(this.collection, { date: dateFormatted });
    console.timeEnd('DailyWords-getByDate');
    return dailyWords;
  }
}

module.exports = DailyWordsService;