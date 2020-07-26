const express = require('express');
const DailyWordsService = require('../services/dailyWords');
const { formatDailyWordResponse } = require('../utils/responseFormatter');

const wordsApi = app => {
  const router = express.Router();
  app.use('/api/words', router);
  const dailyWordsService = new DailyWordsService();
  router.get('/', async (req, res) => {
    const dailyWords = await dailyWordsService.getDailyWords();
    res.status(200).json(formatDailyWordResponse(dailyWords));
  });

}

module.exports = wordsApi;