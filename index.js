const express = require('express');
const config = require('./config');
const wordsApi = require('./routes/words');
const app = express();

app.use(express.json());

wordsApi(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});