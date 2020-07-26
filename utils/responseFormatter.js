
const formatDailyWordResponse = dailyWords => {
  return {
    date: dailyWords.date,
    words: dailyWords.words.map(word => formatWordResponse(word))
  }
}

const formatWordResponse = wordData => {
  return {
    word: wordData.word,
    results: wordData.results.map(result => {
      return {
        definition: result.definition,
        partOfSpeech: result.partOfSpeech,
        examples: result.examples
      }
    }),
    pronunciation: wordData.pronunciation,
    frequency: wordData.frequency
  };
}

module.exports = {
  formatDailyWordResponse,
  formatWordResponse
}