class WordsService {
  getDailyWords() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['a', 'b', 'c']);
      }, 5000);
    });
  }
}

module.exports = WordsService;