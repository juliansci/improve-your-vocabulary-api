const wordsApi = require('../lib/wordsApi');
const MongoDB = require('../lib/mongo');

class WordsService {
  constructor() {
    this.collection = 'words';
    this.mongoDB = new MongoDB();
  }

  async getRandomWord() {
    const words = [];
    const maxAttempts = 10;
    console.time('Words-getRandomWord');
    for (let i = 0; i < maxAttempts; i++) {
      console.time('Words-getRandomWordAPI');
      const response = await wordsApi.getRandom();
      console.timeEnd('Words-getRandomWordAPI');

      const responseWord = response.data;
      if (responseWord.pronunciation && responseWord.frequency) {
        console.timeEnd('Words-getRandomWord');
        await this.create(responseWord);
        return responseWord;
      }
      words.push(responseWord);
    }
    console.timeEnd('Words-getRandomWord');
    return words[0];
  }

  async create(wordData) {
    console.time('Words-create');
    const wordExists = await this.mongoDB.findOne(this.collection, { word: wordData.word });
    if (!wordExists) {
      console.timeEnd('Words-create');
      return this.mongoDB.create(this.collection, wordData);
    }
    console.timeEnd('Words-create');
  }

}

module.exports = WordsService;