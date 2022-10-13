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
    this.score = 0;
  }

  getScore() {
    let score = localStorage.getItem(this.DB_NAME);
    if (score !== null) {
      this.score = score;
      return score;
    }
    return 0;
  }

  setScore(score) {
    if (score > this.score) {
      this.score = score;
      localStorage.setItem(this.DB_NAME, score);
    }
  }
}

class Observer {
  constructor() {
    this.observer = [];
  }

  register(observer) {
    this.observer.push(observer);
  }

  notify(event) {
    this.observer.forEach((e) => e.notify(event));
  }
}