const express = require('express');
const WordsService = require('../services/words');

const wordsApi = app => {
  const router = express.Router();
  app.use('/api/words/random', router);
  const wordsService = new WordsService();
  router.get('/', async (req, res) => {
    const randomWord = await wordsService.getRandomWord();
    res.status(200).json(randomWord);
  });
}

module.exports = wordsApi;