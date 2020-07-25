const express = require('express');
const WordsService = require('../services/words');

const wordsApi = app => {
  const router = express.Router();
  app.use('/api/words', router);
  const wordsService = new WordsService();
  router.get('/', async (req, res) => {
    const dailyWords = await wordsService.getDailyWords();
    res.status(200).json({
      words: dailyWords
    });
  });
}

module.exports = wordsApi;