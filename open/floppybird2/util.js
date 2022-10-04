function printf(tag, log) {
  console.log(tag, log);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class LocalDB {
  constructor() {
    this.DB_NAME = 'FloppyBirdHighScore';
  }

  getScore() {
    let score = localStorage.getItem(this.DB_NAME);
    if (score !== null) {
      return score;
    }
    return 0;
  }

  setScore(score) {
    localStorage.setItem(this.DB_NAME, score);
  }
}
