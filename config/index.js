require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: 27017,
  dbName: process.env.DB_NAME,
  wordsApiUrl: process.env.WORDS_API_URL,
  wordsApiHost: process.env.WORDS_API_HOST,
  wordsApiKey: process.env.WORDS_API_KEY
};

module.exports = config;