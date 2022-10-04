class GameEngine{
  constructor(game, db) {
    this._game = game;
    this._scoreDB = db;
    this._reference_score = 20000;
    this._start_score = 19000;
  }

  increaseTick() {
    if (!this._game[0].isPlayState()) {
      return;
    }

    let addition_score = 8 + getRandomInt(0, 8);
    this._game.forEach((e) => {
      e.jump();
      e.increaseTick();
      e.increaseScore(addition_score);
    });

    let score = this._start_score + this._game[0].score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 10000 : 0;
    this.moveRight(acceleration * 0.7);
    this.moveDown(acceleration * 0.8);

    this._game.forEach((e) => {
      e.checkGetItem();
      e.isAlive();
    });

    if (this._game[0].isGameOverState() || this._game[1].isGameOverState()) {
       this._game[0].setGameOverState();
       this._game[1].setGameOverState();
       if (this._game[0].needToSaveScore()) {
          printf("[GameEngine]", "SaveScore");
          this._scoreDB.setScore(this._game[0].highScore());
       }
    }
  }

  moveUp(idx) {
    printf("[GameEngine] moveUp()", "idx: " + idx);
    if (!this._game[0].isPlayState()) {
      return;
    }
    let score = this._start_score + this._game[0].score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 5000 : 0;
    let gravity = [1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3];
    acceleration *= score < 200000 ? gravity[Math.floor(score / 10000)] : 3;
    this._game[idx].moveUp(acceleration);
  }

  moveDown(acceleration) {
    this._game[0].moveDown(acceleration);
    this._game[1].moveDown(acceleration);
  }

  moveRight(acceleration) {
    this._game[0].moveRight(1+acceleration);
  }

  pause() {
    this._game[0].pause();
    this._game[1].pause();
    if (this._game[0].isPauseState()) {
      if (this._game[0].needToSaveScore()) {
        printf("[GameEngine]", "SaveScore");
        this._scoreDB.setScore(this._game[0].highScore());
      }
    }
  }

  start() {
    this._game[0].start();
    this._game[1].start();
  }
}
