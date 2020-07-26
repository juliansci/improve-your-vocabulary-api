
const axios = require("axios");
const config = require('../config');

const buildHeaders = () => {
  return {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": config.wordsApiHost,
    "x-rapidapi-key": config.wordsApiKey,
    "useQueryString": true
  };
}

const getRandom = () => {
  const query = {
    soundsMin: 1,
    random: true,
    hasDetails: "definitions,examples"
  };
  return axios({
    method: "GET",
    url: config.wordsApiUrl,
    headers: buildHeaders(),
    params: query
  });
};

module.exports = {
  getRandom
}