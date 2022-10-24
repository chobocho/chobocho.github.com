class DrawEngine {
    constructor(gameMode, drawMode) {
        this.gameMode = gameMode;
        this.drawMode = drawMode;
        this._InitValue();
        this._LoadImage();
        this._tick = 0;
    }

    _InitValue() {
        this.background_image = 0;
        this._tick = 0;
    }

    _LoadImage() {
        //let root = "./img";
        let root = base64Header;

        this.background = [];
        this.background[0] = LoadImage(root + background01_img);
        this.background[1] = LoadImage(root + background02_img);
        this.background[2] = LoadImage(root + background03_img);
        this.background[3] = LoadImage(root + background04_img);
        this.background[4] = LoadImage(root + background05_img);
        this.background[5] = LoadImage(root + background06_img);

        this.player1_background = [];
        this.player1_background[0] = LoadImage(root + p1_background01_img);
        this.player1_background[1] = LoadImage(root + p1_background02_img);
        this.player1_background[2] = LoadImage(root + p1_background03_img);
        this.player1_background[3] = LoadImage(root + p1_background04_img);
        this.player1_background[4] = LoadImage(root + p1_background05_img);
        this.player1_background[5] = LoadImage(root + p1_background06_img);

        this.buttonImage = { };
        this.buttonImage['score'] = LoadImage(root + score_img);
        this.buttonImage['0'] = LoadImage(root + sn00_img);
        this.buttonImage['1'] = LoadImage(root + sn01_img);
        this.buttonImage['2'] = LoadImage(root + sn02_img);
        this.buttonImage['3'] = LoadImage(root + sn03_img);
        this.buttonImage['4'] = LoadImage(root + sn04_img);
        this.buttonImage['5'] = LoadImage(root + sn05_img);
        this.buttonImage['6'] = LoadImage(root + sn06_img);
        this.buttonImage['7'] = LoadImage(root + sn07_img);
        this.buttonImage['8'] = LoadImage(root + sn08_img);
        this.buttonImage['9'] = LoadImage(root + sn09_img);
        this.buttonImage['tile_top'] = LoadImage(root + tile01_img);
        this.buttonImage['tile_down'] = LoadImage(root + tile02_img);
        this.buttonImage['tile_body'] = LoadImage(root + tile03_img);
        this.buttonImage['bar'] = LoadImage(root + bar_img);
        this.buttonImage['coin'] = LoadImage(root + coin_img);
        this.buttonImage['shield'] = LoadImage(root + shield_img);
        this.buttonImage['red_bottle'] = LoadImage(root + red_bottle_img);
        this.buttonImage['pink_bottle'] = LoadImage(root + pink_bottle_img);
        this.buttonImage['start'] = LoadImage(root + start_img);
        this.buttonImage['start_p2'] = LoadImage(root + start_p2_img);
        this.buttonImage['resume'] = LoadImage(root + resume_img);
        this.buttonImage['pause'] = LoadImage(root + pause_img);
        this.buttonImage['single_mode'] = LoadImage(root + singleplay_img);
        this.buttonImage['together_mode'] = LoadImage(root + together_img);
        this.buttonImage['compete_mode'] = LoadImage(root + compete_img);
        this.buttonImage['question'] = LoadImage(root + question_img);

        this.birdImage = [];
        this.birdImage[0] = LoadImage(root + bird01_img);
        this.birdImage[1] = LoadImage(root + bird02_img);
        this.birdImage[2] = LoadImage(root + bird03_img);
        this.birdImage[3] = LoadImage(root + bird04_img);

        this.circleImage = [];
        this.circleImage[0] = LoadImage(root + circle1_img);
        this.circleImage[1] = LoadImage(root + circle2_img);
        this.circleImage[2] = LoadImage(root + circle3_img);
        this.circleImage[3] = LoadImage(root + circle4_img);

        printf("[DrawEngine]", "_LoadImage");
    }

    OnDraw() {
        if (this.gameMode.mode() === "COMPETE_MODE") {
            this._OnDrawForCompete();
        } else {
            this._OnDraw();
        }
    }

    _OnDrawForCompete() {
        this.gameMode._bufCtx.clearRect(0, 0, this.gameMode.gScreenX, this.gameMode.gScreenY);
        this.gameMode._bufCtx.beginPath();

        this.gameMode._bufCtx2.clearRect(0, 0, this.gameMode.gScreenX, this.gameMode.gScreenY);
        this.gameMode._bufCtx2.beginPath();

        this._drawBackground();
        this._drawPillar();
        this._drawEnergy();
        this._drawScore();
        this._drawBird();
        this._drawButton();

        this.gameMode._bufCtx.closePath();
        this.gameMode._bufCtx.stroke();

        this.gameMode._bufCtx2.closePath();
        this.gameMode._bufCtx2.stroke();

        cvs.clearRect(0, 0, canvas.width, canvas.height);

        let startX = this.gameMode.gStartX;
        let scale = this.gameMode.gScale;
        let screenX = this.gameMode.gScreenX;
        let screenY = this.gameMode.gScreenY;

        cvs.drawImage(this.gameMode._bufCanvas, startX, 0, screenX/2 * scale, screenY * scale);
        cvs.drawImage(this.gameMode._bufCanvas2, startX + canvas.width/2+1, 0, screenX/2 * scale, screenY * scale);
        //printf("[DrawEngine]", "OnDraw() " + gameMode.mode() + ", " + screenX);
    }

    _OnDraw() {
        let bufCtx = this.gameMode._bufCtx;

        bufCtx.clearRect(0, 0, this.gameMode.gScreenX, this.gameMode.gScreenY);
        bufCtx.beginPath();
        this._drawBackground();
        this._drawPillar();
        this._drawEnergy();
        this._drawScore();
        this._drawBird();
        this._drawButton();

        bufCtx.closePath();
        bufCtx.stroke();

        cvs.clearRect(0, 0, canvas.width, canvas.height);

        let startX = this.gameMode.gStartX;
        let scale = this.gameMode.gScale;
        let screenX = this.gameMode.gScreenX;
        let screenY = this.gameMode.gScreenY;

        cvs.drawImage(this.gameMode._bufCanvas, startX, 0, screenX * scale, screenY * scale);
        //printf("[DrawEngine]", "OnDraw() " + gameMode.mode() + ", " + screenX);
    }


    setDrawMode(gameMode, drawMode) {
        this.gameMode = gameMode;
        this.drawMode = drawMode;
        this._InitValue();
    }

    _drawButton() {
        // printf("[DrawEngine] _drawButton() ", this.game.state());
        let bufCtx = this.gameMode._bufCtx;
        this.drawMode.drawButton(bufCtx, this.buttonImage, this.gameMode, 0);

        if (this.gameMode.mode() === "COMPETE_MODE") {
            let bufCtx2 = this.gameMode._bufCtx2;
            this.drawMode.drawButton(bufCtx2, this.buttonImage, this.gameMode, 1);
        }
    }

    _drawBird() {
        this._tick++;
        let birdFrame = Math.floor(this._tick / 12);
        if (birdFrame > 3) {
            birdFrame = 3;
            this._tick = 0;
        }
        let bufCtx = this.gameMode._bufCtx;

        if (this.gameMode.mode() === "COMPETE_MODE") {
            this.drawMode.drawBird(bufCtx, this.birdImage, this.circleImage, this.gameMode, birdFrame, 0);
            let bufCtx2 = this.gameMode._bufCtx2;
            this.drawMode.drawBird(bufCtx2, this.birdImage, this.circleImage, this.gameMode, birdFrame, 1);
        } else {
            this.drawMode.drawBird(bufCtx, this.birdImage, this.circleImage, this.gameMode, birdFrame);
        }
    }

    _drawPillar() {
        let bufCtx = this.gameMode._bufCtx;

        if (this.gameMode.mode() === "COMPETE_MODE") {
            this.drawMode.drawPillar(bufCtx, this.buttonImage, this.gameMode, 0);
            let bufCtx2 = this.gameMode._bufCtx2;
            this.drawMode.drawPillar(bufCtx2, this.buttonImage, this.gameMode, 1);
        } else {
            this.drawMode.drawPillar(bufCtx, this.buttonImage, this.gameMode);
        }
    }

    _drawEnergy() {
        let bufCtx = this.gameMode._bufCtx;
        // printf("[DrawEngine] _drawScore()", this.game.score());
        let player1Energy = this.gameMode.energy();
        this.drawMode.drawEnergy(bufCtx, this.buttonImage, player1Energy);

        if (this.gameMode.mode() === "COMPETE_MODE") {
            let bufCtx2 = this.gameMode._bufCtx2;
            let player2Energy = this.gameMode.energy(1);
            this.drawMode.drawEnergy(bufCtx2, this.buttonImage, player2Energy);
        }
    }

    _drawScore() {
        let bufCtx = this.gameMode._bufCtx;
        // printf("[DrawEngine] _drawScore()", this.game.score());
        this.drawMode.drawScore(bufCtx, this.buttonImage, this.gameMode.score(0));

        if (this.gameMode.mode() === "COMPETE_MODE") {
            let bufCtx2 = this.gameMode._bufCtx2;
            this.drawMode.drawScore(bufCtx2, this.buttonImage, this.gameMode.score(1));
        }
    }

    _drawBackground() {
        let bufCtx = this.gameMode._bufCtx;
        let image = [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
        if (this.gameMode.level() > image.length) {
            this.background_image = 5;
        } else {
            this.background_image = image[this.gameMode.level() - 1];
        }

        if (this.gameMode.mode() === "INIT_MODE" || this.gameMode.mode() === "SINGLE_MODE") {
            this.drawMode.drawBackground(bufCtx, this.player1_background, this.background_image, 0);
        } else if (this.gameMode.mode() === "TOGETHER_MODE") {
            this.drawMode.drawBackground(bufCtx, this.background, this.background_image, 0);
        } else if (this.gameMode.mode() === "COMPETE_MODE") {
            this.drawMode.drawBackground(bufCtx, this.player1_background, this.background_image, 0);

            let bufCtx2 = this.gameMode._bufCtx2;
            let player2Level = this.gameMode.level(1);
            let player2bgImage = player2Level > image.length ? 5 : this.background_image = image[player2Level - 1];
            this.drawMode.drawBackground(bufCtx2, this.player1_background, player2bgImage, 0);
        } else {
            printf("[DrawEngine]", "Error! Never come to here!");
        }
    }

    getEventCode(x, y) {
        return this.drawMode.getEventCode(x, y, this.gameMode);
    }
}
