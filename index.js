const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const app = express();

const wordsApi = require('./routes/words');

app.use(express.json());
app.use(cors());
app.use(helmet());

wordsApi(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});