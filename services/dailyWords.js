const MongoDB = require('../lib/mongo');
const moment = require('moment');
const config = require('../config');

const WordsService = require('./words');

const DAILY_WORDS = config.dailyWords;

class DailyWordsService {
  constructor() {
    this.collection = 'daily-words';
    this.mongoDB = new MongoDB();
    this.wordsService = new WordsService();
  }

  getNextUpdateInSeconds() {
    const currentDate = moment();
    const nextDate = moment().add(1, 'days').startOf('day');
    return nextDate.diff(currentDate, 'seconds');
  }

  async getDailyWords(date) {
    console.time('DailyWords-getDailyWords');
    const currentDate = date || moment();
    const dailyWords = await this.getDailyWordsByDate(currentDate);
    console.timeEnd('DailyWords-getDailyWords');
    return dailyWords;
  }

  async generateDailyWords(date) {
    const dailyWords = await this.getDailyWords(date);
    if (!dailyWords) {
      const words = [];
      for (let i = 0; i < DAILY_WORDS; i++) {
        const randomWord = await this.wordsService.getRandomWord();
        words.push(randomWord);
      }
      await this.createDailyWords(words, date);
      return this.getDailyWordsByDate(date);
    }
    return dailyWords;
  }

  async createDailyWords(words, date) {
    console.time('DailyWords-create');
    const currentDate = date || moment();
    const dailyWords = {
      date: currentDate.format('DDMMYYYY'),
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