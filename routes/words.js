const express = require('express');
const DailyWordsService = require('../services/dailyWords');
const moment = require('moment');
const { formatDailyWordResponse } = require('../utils/responseFormatter');

const wordsApi = app => {
  const router = express.Router();
  app.use('/api/words', router);
  const dailyWordsService = new DailyWordsService();

  router.get('/', async (req, res) => {
    const dailyWords = await dailyWordsService.getDailyWords();
    res.status(200).json(formatDailyWordResponse(dailyWords));
  });

  router.get('/next-update', async (req, res) => {
    const nextUpdate = await dailyWordsService.getNextUpdateInSeconds();
    res.status(200).json({
      nextUpdate
    });
  });

  router.get('/generate', async (req, res) => {
    const dateStr = req.body.date;
    console.log('dateStr: ', dateStr);
    const date = moment(dateStr, 'DDMMYYYY');
    console.log('date:', date);

    const dailyWords = await dailyWordsService.generateDailyWords(date);
    res.status(200).json({
      dailyWords
    });
  });
}

module.exports = wordsApi;