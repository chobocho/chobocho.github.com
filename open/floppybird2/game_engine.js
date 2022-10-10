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

    let addition_score = 8 + getRandomInt(0, 8);
    this._game.floppybird.forEach((e) => {
      e.jump();
      e.increaseTick();
      e.increaseScore(addition_score);
    });

    let score = this._start_score + this._game.score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 10000 : 0;
    this.moveRight(acceleration * 0.7);
    this.moveDown(acceleration * 0.8);

    this._game.floppybird.forEach((e) => {
      e.checkGetItem();
      e.isAlive();
    });

    if (this._game.mode() === "TOGETHER_MODE") {
      if (this._game.isGameOverState(0) || this._game.isGameOverState(1)) {
        this._game.setGameOverState(0);
        this._game.setGameOverState(1);
        if (this._game.needToSaveScore(0)) {
          printf("[GameEngine] 2", "SaveScore");
          this._scoreDB.setScore(this._game.highScore(0));
        }
      }
    } else {
      if (this._game.isGameOverState()) {
        this._game.setGameOverState();
        if (this._game.needToSaveScore()) {
          printf("[GameEngine]", "SaveScore");
          this._scoreDB.setScore(this._game.highScore(0));
        }
      }
    }
  }

  moveUp(idx) {
    printf("[GameEngine] moveUp()", "idx: " + idx);
    if (!this._game.isPlayState()) {
      return;
    }
    let score = this._start_score + this._game.score();
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 5000 : 0;
    let gravity = [1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3];
    acceleration *= score < 200000 ? gravity[Math.floor(score / 10000)] : 3;
    this._game.moveUp(acceleration, idx);
  }

  moveDown(acceleration) {
    this._game.moveDown(acceleration);
  }

  moveRight(acceleration) {
    this._game.moveRight(1+acceleration, 0);
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
    if (this._game.mode() === "INIT_MODE") {
      return;
    }
    this._game.start();
  }
}
