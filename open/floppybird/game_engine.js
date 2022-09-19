class GameEngine{
  constructor(game, db) {
    this._game = game;
    this._scoreDB = db;
    this._reference_score = 20000;
    this._start_score = 19000;
  }

  increaseTick() {
    if (!this._game.isPlayState()) {
      return;
    }
    this._game.jump();
    this._game.increaseTick();
    let addition_score = 8 + getRandomInt(0, 8);
    this._game.increaseScore(addition_score);

    let score = this._start_score + this._game.score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 10000 : 0;
    this.moveRight(acceleration * 0.7);
    this.moveDown(acceleration * 0.8);
    this._game.checkGetItem();
    this._game.isAlive();

    if (this._game.isGameOverState()) {
       if (this._game.needToSaveScore()) {
          printf("[GameEngine]", "SaveScore");
          this._scoreDB.setScore(this._game.highScore());
       }
    }
  }

  moveUp() {
    printf("[GameEngine] moveUp()", "");
    if (!this._game.isPlayState()) {
      return;
    }
    let score = this._start_score + this._game.score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 5000 : 0;
    let gravity = [1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3];
    acceleration *= score < 200000 ? gravity[Math.floor(score / 10000)] : 3;
    this._game.moveUp(acceleration);
  }

  moveDown(acceleration) {
    this._game.moveDown(acceleration);
  }

  moveRight(acceleration) {
    this._game.moveRight(1+acceleration);
  }

  pause() {
    this._game.pause();
    if (this._game.isPauseState()) {
      if (this._game.needToSaveScore()) {
        printf("[GameEngine]", "SaveScore");
        this._scoreDB.setScore(this._game.highScore());
      }
    }
  }

  start() {
    this._game.start();
  }
}
