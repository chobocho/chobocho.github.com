class PlayMode {
    constructor(savedScore = 0) {
        this._mode = "";

        this.gBlockSize = 40;
        this.gStartX = 0;
        this.gScale = 1.0;
        this._blockSize = 40;

        this.gScreenX = 400;
        this.gScreenY = 600;
        this.gBufferX = 400;
        this._canvasX = 400;
        this._canvasY = 600;

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

    canvasX() {
        return this._canvasX;
    }

    canvasY() {
        return this._canvasY;
    }

    setBufCanvasCtx(bufCanvas, bufCtx) {
        this._bufCanvas = bufCanvas;
        this._bufCtx = bufCtx;
    }

    setBufCanvasCtx2(bufCanvas, bufCtx) {
        this._bufCanvas2 = bufCanvas;
        this._bufCtx2 = bufCtx;
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

    start(player = 0) {
        this.floppybird[player].start();
    }

    pause(player=0) {
        this.floppybird[player].pause();
    }

    moveDown(acceleration, player = 0) {
        this.floppybird[player].moveDown(acceleration);
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
        if (player < this._score.length) {
            return this._score[player].score();
        }
        return this._score[0].score();
    }

    decisionBlockSize(windowWidth, windowHeight) {
        if (windowHeight < 200 || windowWidth < 300) {
            printf("[PlayMode] ", "Error: width == 0");
            windowWidth = 200;
            windowHeight = 300;
        }
        this._decisionBlockSize(windowWidth, windowHeight);
    }

    _decisionBlockSize (windowWidth, windowHeight) {
        let screenX = windowWidth / this._blockSize;
        let screenY = windowHeight / 60;
        let blockSize  = screenX < screenY ? screenX : screenY;
        this.gBlockSize = Math.round(blockSize)-1;
        let width = this.gBlockSize * this._blockSize;
        this.gScale = this.gBlockSize / 10;

        this._canvasX = width;
        this._canvasY = this.gBlockSize * 60;
        console.log("[PlayMode] decisionBlockSize", this._mode, " gStartX:" + this.gStartX + ", scale: " + this.gScale);
    }

    level(player = 0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].level();
        }
        return this.floppybird[0].level();
    }

    item(player = 0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].item();
        }
        return this.floppybird[0].item();
    }

    pillar(player=0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].pillar();
        }
        return this.floppybird[0].pillar();
    }

    energy(player = 0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].energy();
        }
        return this.floppybird[0].energy();
    }

    state(player = 0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].state();
        }
        return this.floppybird[0].state();
    }

    shield(player=0) {
        if (player < this.floppybird.length) {
            return this.floppybird[player].shield();
        }
        return this.floppybird[0].shield();
    }
}

class InitMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._mode = "INIT_MODE";
        this.gScreenX = 400;
        this.gBufferX = 400;
        this.init();
    }
}

class SingleMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._mode = "SINGLE_MODE";
        this.gScreenX = 400;
        this.gBufferX = 400;
        this.init();
    }
}

class TogetherMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._blockSize = 80;
        this.gScreenX = 800;
        this.gBufferX = 800;
        this._mode = "TOGETHER_MODE";
        this.floppybird.push(new FloppyBird(500, 200, this._score[0], this._energy[0], this._item[0], this._pillar[0]));
        this._energy[0].register(this.floppybird[1]);

        this.init();
    }

    decisionBlockSize(windowWidth, windowHeight) {
        if (windowHeight < 400 || windowWidth < 300) {
            printf("[PlayMode][Together] ", "Error: width == 0");
            windowWidth = 400;
            windowHeight = 300;
        }

        this._decisionBlockSize(windowWidth, windowHeight);
    }
}

class CompeteMode extends PlayMode {
    constructor(score = 0) {
        super(score);
        this._blockSize = 80;
        this.gScreenX = 800;
        this.gBufferX = 400;
        this._mode = "COMPETE_MODE";
        this._score.push(new Score(score));
        this._energy.push(new Energy());
        this._item.push(new Item());
        this._pillar.push(new Pillar(this._item[1]));
        this.floppybird.push(new FloppyBird(100, 200, this._score[1], this._energy[1], this._item[1], this._pillar[1]));
        this._energy[1].register(this.floppybird[1]);
        this._item[1].setGame(this.floppybird[1]);

        this.init();
    }

    decisionBlockSize(windowWidth, windowHeight) {
        if (windowHeight < 400 || windowWidth < 300) {
            printf("[PlayMode][Compete] ", "Error: width == 0");
            windowWidth = 400;
            windowHeight = 300;
        }

        this._decisionBlockSize(windowWidth, windowHeight);
    }
}