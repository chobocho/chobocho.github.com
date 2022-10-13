class GameEngine{
  constructor(game, db) {
    this._game = game;
    this._scoreDB = db;
    this._reference_score = 20000;
    this._start_score = 19000;
  }

  increaseTick() {
    if (this._game.mode() === "COMPETE_MODE") {
      this._increaseTickForCompeteMode();
    } else {
      this._increaseTick();
    }
  }

  _increaseTick() {
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

  _increaseTickForCompeteMode() {
    for (let player = 0; player < 2; player++) {
      if (!this._game.isPlayState(player)) {
        continue;
      }

      let addition_score = 8 + getRandomInt(0, 8);
      this._game.floppybird[player].jump();
      this._game.floppybird[player].increaseTick();
      this._game.floppybird[player].increaseScore(addition_score);

      let score = this._start_score + this._game.score(player);
      let acceleration = score > this._reference_score ? (score - this._reference_score) / 10000 : 0;
      this._game.moveRight(1 + acceleration * 0.7, player);
      this._game.moveDown(acceleration * 0.8, player);

      this._game.floppybird[player].checkGetItem();
      this._game.floppybird[player].isAlive();

      if (this._game.isGameOverState(player)) {
        this._game.setGameOverState(player);
        if (this._game.needToSaveScore(player)) {
          printf("[GameEngine]", "SaveScore");
          this._scoreDB.setScore(this._game.highScore(player));
        }
      }
    }
  }

  moveUp(idx) {
    printf("[GameEngine] moveUp()", "idx: " + idx);
    if (!this._game.isPlayState(idx)) {
      return;
    }
    let score = this._start_score + this._game.score(idx);
    let acceleration = score > this._reference_score ? (score - this._reference_score) / 5000 : 0;
    let gravity = [1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3, 3, 3, 3];
    acceleration *= score < 200000 ? gravity[Math.floor(score / 10000)] : 3;
    this._game.moveUp(acceleration, idx);
  }

  moveDown(acceleration) {
    this._game.moveDown(acceleration, 0);
    if (this._game.mode() === "TOGETHER_MODE") {
      this._game.moveDown(acceleration, 1);
    }
  }

  moveRight(acceleration) {
    this._game.moveRight(1 + acceleration, 0);
    if (this._game.mode() === "COMPETE_MODE") {
        this._game.moveRight(1 + acceleration, 1);
    }
  }

  allPlayerPause() {
    this._game.pause(0);
    if (this._game.isPauseState(0)) {
      if (this._game.needToSaveScore(0)) {
        printf("[GameEngine]", "SaveScore");
        this._scoreDB.setScore(this._game.highScore(0));
      }
    }

    if (this._game.mode() === "TOGETHER_MODE") {
      this._game.pause(1);
    } else if (this._game.mode() === "COMPETE_MODE") {
      this._game.pause(1);

      if (this._game.isPauseState(1)) {
        if (this._game.needToSaveScore(1)) {
          printf("[GameEngine]", "SaveScore");
          this._scoreDB.setScore(this._game.highScore(1));
        }
      }
    }
  }

  pause(player=0) {
    this._game.pause(player);
    if (this._game.isPauseState(player)) {
      if (this._game.needToSaveScore(player)) {
        printf("[GameEngine]", "SaveScore");
        this._scoreDB.setScore(this._game.highScore(player));
      }
    }
  }

  start(player=0) {
    if (this._game.mode() === "INIT_MODE") {
      return;
    }
    this._game.start(player);
  }

  allPlayerStart() {
    if (this._game.mode() === "INIT_MODE") {
      return;
    }
    this._game.start(0);
    if (this._game.mode() === "TOGETHER_MODE") {
      this._game.start(1);
    } else if (this._game.mode() === "COMPETE_MODE") {
      this._game.start(1);
    }
  }
}
