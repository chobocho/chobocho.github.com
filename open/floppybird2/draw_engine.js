class DrawEngine {
    constructor(game) {
        this.game = game;
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
        this.buttonImage['resume'] = LoadImage(root + resume_img);
        this.buttonImage['pause'] = LoadImage(root + pause_img);

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
        let image = [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
        if (this.game[0].level() > image.length) {
            this.background_image = 5;
        } else {
            this.background_image = image[this.game[0].level() - 1];
        }

        bufCtx.clearRect(0, 0, canvas.width, canvas.height);
        bufCtx.beginPath();
        this._drawBoard();
        this._drawPillar();
        this._drawEnergy();
        this._drawScore();
        this._drawBird();
        this._drawButton();
        bufCtx.closePath();
        bufCtx.stroke();

        cvs.clearRect(0, 0, canvas.width, canvas.height);
        cvs.drawImage(bufCanvas, gStartX, 0, gBlockSize * 80, gBlockSize * 60);
        // printf("[DrawEngine]", "OnDraw()");
    }

    _drawButton() {
        // printf("[DrawEngine] _drawButton() ", this.game.state());
        if (this.game[0].isIdleState()) {
            bufCtx.drawImage(this.buttonImage['start'], (800-300)/2, 100, 300, 163);
            this._drawHighScore();
        } else if (this.game[0].isPauseState()) {
            bufCtx.drawImage(this.buttonImage['resume'], (800-200)/2, 100, 200, 100);
            this._drawHighScore();
        } else if (this.game[0].isGameOverState()) {
            bufCtx.drawImage(this.buttonImage['start'], (800-300)/2, 100, 300, 163);
            this._drawHighScore();
        } else if (this.game[0].isPlayState()) {
            bufCtx.drawImage(this.buttonImage['pause'], 10, 10, 60, 60);
        }
    }

    _drawBird() {
        this._tick++;
        let birdFrame = Math.floor(this._tick / 12);
        if (birdFrame > 3) {
            birdFrame = 3;
            this._tick = 0;
        }

        for (let i = 0; i < 2; i++) {
            bufCtx.drawImage(this.birdImage[birdFrame], this.game[i].x(), this.game[i].y(), 60, 51);

            if (this.game[0].isPlayState() || this.game[0].isPauseState()) {
                if (this.game[0].shield() > 0) {
                    bufCtx.globalAlpha = this.game[0].shield() / 250;
                    bufCtx.drawImage(this.circleImage[birdFrame], this.game[i].x() - 5, this.game[i].y() - 10, 75, 75);
                    bufCtx.globalAlpha = 1.0;
                }
            }
        }
    }

    _drawPillar() {
        let item = this.game[0].item();
        let pillar = this.game[0].pillar();

        for (let i = 0; i < pillar.length; i++) {
            let p = pillar[i];
            let x = p[0];

            if (x > 800) {
                continue;
            }

            for (let j = 0; j < p[1]; j++) {
                bufCtx.drawImage(this.buttonImage['tile_body'], x, j * 60, 60, 60);
            }
            bufCtx.drawImage(this.buttonImage['tile_top'], x, p[1] * 60, 60, 60);

            for (let j = 0; j < p[2]; j++) {
                bufCtx.drawImage(this.buttonImage['tile_body'], x, 540 - j * 60, 60, 60);
            }
            bufCtx.drawImage(this.buttonImage['tile_down'], x, 540 - p[2] * 60, 60, 60);

            if (item[i][0] > -60) {
                let itemName = ['coin', 'coin', 'red_bottle', 'pink_bottle', 'shield'];
                if (item[i][2] > 1) {
                    bufCtx.drawImage(this.buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 51);
                } else if (item[i][2] === 1) {
                    bufCtx.drawImage(this.buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 60);
                }
            }
        }
    }

    _drawEnergy() {
        // printf("[DrawEngine] _drawScore()", this.game.score());
        let energy = Math.floor(this.game[0].energy() * 2);
        let blockSize = 30;
        let startX = 790 - 204;
        let startY = 10;

        bufCtx.drawImage(this.buttonImage['bar'], startX, startY, 204, blockSize);
        bufCtx.fillStyle = '#000000';

        bufCtx.fillRect(startX + 2 + 200 - (200 - energy), startY + 2, 200 - energy, blockSize - 4);
    }

    _drawScore() {
        // printf("[DrawEngine] _drawScore()", this.game.score());
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let score = this.game[0].score();
        let pos = 7;
        let blockSize = 30;
        let startX = 770 - (blockSize * 0.6 * pos);
        let startY = 10;

        bufCtx.drawImage(this.buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
        while (score > 0) {
            bufCtx.drawImage(this.buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
            score = Math.floor(score / 10);
            pos--;
        }
    }

    _drawHighScore() {
        // printf("[DrawEngine] _drawHighScore()", this.game.highScore());
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let highScore = this.game[0].highScore();
        let pos = 8;
        let blockSize = 40;
        //let startX = (780-blockSize*pos)/2;
        let startX = (800 - blockSize * pos) / 2;
        let startY = 300;

        bufCtx.fillStyle = '#FFFF0022';
        bufCtx.fillRect(startX, startY, blockSize * pos, blockSize);
        pos--;
        bufCtx.drawImage(this.buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
        while (highScore > 0) {
            bufCtx.drawImage(this.buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
            highScore = Math.floor(highScore / 10);
            pos--;
        }
    }

    _drawBoard() {
        // printf("[DrawEngine] _drawBoard()", this.background_image);
        this._drawBackground();
    }

    _drawBackground() {
        bufCtx.drawImage(this.background[this.background_image], 0, 0, gScreenX, gScreenY);
    }

    getEventCode(x, y) {
        printf("[DrawEngine] getEventCode() ", this.game[0].state() + " (" + x + ", " + y + ") gScale: " + gScale);
        if (this.game[0].isIdleState()) {
            let bx1 = gStartX + ((800-300)/2) * gScale;
            let bx2 = gStartX + ((800-300)/2 + 300) * gScale;
            let by1 = 100 * gScale;
            let by2 = (100 + 163) * gScale;

            printf("[DrawEngine] getEventCode(): ", this.game[0].state() + " (" + bx1 + ", " + by1 + ")");
            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (this.game[0].isPauseState()) {
            let bx1 = gStartX + ((800-200)/2) * gScale;
            let bx2 = gStartX + ((800-200)/2 + 200) * gScale;
            let by1 = 100 * gScale;
            let by2 = 200 * gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (this.game[0].isGameOverState()) {
            let bx1 = gStartX + ((800-300)/2) * gScale;
            let bx2 = gStartX + ((800-300)/2 + 300) * gScale;
            let by1 = 100 * gScale;
            let by2 = (100 + 163) * gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (this.game[0].isPlayState()) {
            let bx1 = gStartX + 10 * gScale;
            let bx2 = gStartX + 70 * gScale;
            let by1 = 10 * gScale;
            let by2 = 70 * gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return P_KEY;
            }

            if (x < gStartX + gScreenX * 0.5 * gScale) {
                return SPACE_KEY;
            }
            return ARROW_UP_KEY;
        }
        if (x < gStartX + gScreenX * 0.5 * gScale) {
            return SPACE_KEY;
        }
        return ARROW_UP_KEY;
    }
}
