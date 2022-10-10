class PlayMode {
    constructor(savedScore = 0) {
        this._mode = "";

        this.gBlockSize = 40;
        this.gStartX = 0;
        this.gScale = 1.0;
        this._blockSize = 40;

        this.gScreenX = 800;
        this.gScreenY = 600;
        this.gBufferX = 800;
        this.screenEndX = 0;

        this._score = [];
        this._score.push(new Score(savedScore));
        this._energy = [];
        this._energy.push(new Energy());
        this._item = [];
        this._item.push(new Item());
        this._pillar = [];
        this._pillar.push(new Pillar(this._item[0]));
        this.floppybird = [];
        this.floppybird.push(new FloppyBird(100, 200, this._score[0], this._energy[0], this._item[0], this._pillar[0]));
        this._energy[0].register(this.floppybird[0]);
        this._item[0].setGame(this.floppybird[0]);
    }

    init() {
        this.floppybird.forEach((e) => e.init());
    }

    mode() {
        return this._mode;
    }

    isIdleState(player=0) {
        return this.floppybird[player].isIdleState();
    }

    isPlayState(player=0) {
        return this.floppybird[player].isPlayState();
    }

    isPauseState(player=0) {
        return this.floppybird[player].isPauseState();
    }

    isGameOverState(player=0) {
        return this.floppybird[player].isGameOverState();
    }

    setGameOverState(player=0) {
        this.floppybird[player].setGameOverState();
    }

    highScore(player=0) {
        return this._score[player].highScore();
    }

    start() {
        this.floppybird.forEach((e) => e.start());
    }

    pause() {
        this.floppybird.forEach((e) => e.pause());
    }

    moveDown(acceleration) {
        this.floppybird.forEach((e) => e.moveDown(acceleration));
    }

    moveRight(acceleration, player=0) {
        this.floppybird[player].moveRight(1+acceleration);
    }

    moveUp(acceleration, player=0) {
        this.floppybird[player].moveUp(acceleration);
    }

    needToSaveScore(player=0) {
        return this._score[player].needToSave();
    }

    score(player=0) {
        return this._score[player].score();
    }

    decisionBlockSize(canvas) {
        let screenX = canvas.width / this._blockSize;
        let screenY = canvas.height / 60;
        this.gBlockSize = screenX < screenY ? screenX : screenY;
        this.gStartX = (canvas.width - this.gBlockSize * this._blockSize) / 2;
        this.gScale = this.gBlockSize / 10;
        console.log("[PlayMode] decisionBlockSize", this._mode, " gStartX:" + this.gStartX + ", scale: " + this.gScale);
    }

    level() {
        return this.floppybird[0].level();
    }

    item() {
        return this.floppybird[0].item();
    }

    pillar() {
        return this.floppybird[0].pillar();
    }

    energy() {
        return this.floppybird[0].energy();
    }

    state() {
        return this.floppybird[0].state();
    }

    shield() {
        return this.floppybird[0].shield();
    }
}

class InitMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._mode = "INIT_MODE";
        this.gBufferX = 400;
        this.screenEndX = 400;
        this.init();
    }
}

class SingleMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._mode = "SINGLE_MODE";
        this.gBufferX = 400;
        this.screenEndX = 400;
        this.init();
    }
}

class TogetherMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._blockSize = 80;
        this._mode = "TOGETHER_MODE";
        this.floppybird.push(new FloppyBird(500, 200, this._score[0], this._energy[0], this._item[0], this._pillar[0]));
        this._energy[0].register(this.floppybird[1]);

        this.init();
    }
}

class CompeteMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._blockSize = 80;
        this._mode = "COMPETE_MODE";
        this._score.push(new Score(score));
        this._energy.push(new Energy());
        this._item.push(new Item());
        this._pillar.push(new Pillar(this._item[1]));
        this.floppybird.push(new FloppyBird(500, 200, this._score[1], this._energy[1], this._item[1], this._pillar[1]));
        this._energy[1].register(this.floppybird[1]);
        this._item[1].setGame(this.floppybird[1]);

        this.init();
    }
}