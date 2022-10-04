class Score {
  constructor(highScore=0) {
    this._score = 0;
    this._highScore = highScore;
    this._prev_high_score = highScore;
  }

  init() {
    this._highScore = this._highScore > this._score ? this._highScore : this._score;
    this._score = 1;
  }

  score() {
    return this._score;
  }

  highScore() {
    return this._highScore;
  }

  increase(additional_score) {
    this._score += additional_score;
    this._updateHighScore();
  }

  _updateHighScore() {
    this._highScore = this._highScore > this._score ? this._highScore : this._score;
  }

  needToSave() {
    return this._prev_high_score < this._highScore;
  }
}
