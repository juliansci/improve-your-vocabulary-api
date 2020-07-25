const wordsApi = require('../lib/wordsApi');

class WordsService {

  async getRandomWord() {
    const words = [];
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      const response = await wordsApi.getRandom();
      const responseData = response.data;

      const formattedWord = {
        word: responseData.word,
        results: responseData.results.map(result => {
          return {
            definition: result.definition,
            partOfSpeech: result.partOfSpeech,
            examples: result.examples
          }
        }),
        pronunciation: responseData.pronunciation,
        frequency: responseData.frequency
      };
      if (formattedWord.pronunciation && formattedWord.frequency) {
        return formattedWord;
      }
      words.push(formattedWord);
    }
    return words[0];
  }

}

module.exports = WordsService;