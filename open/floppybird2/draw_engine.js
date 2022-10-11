class DrawMode {
    constructor() {

    }

    drawBackground(bufCtx, backgroundImageList, player1Level, player2Level) {
    }

    drawPillar(bufCtx, buttonImage, game) {

    }

    drawEnergy(bufCtx, buttonImage, player1Energy, player2Energy) {

    }

    drawScore(bufCtx, buttonImage, score) {

    }

    drawHighScore(bufCtx, buttonImage, highScore) {

    }

    drawBird(bufCtx, birdImage, circleImage, game, birdFrame) {

    }

    drawButton(bufCtx, buttonImage, game) {

    }

    getEventCode(tx, ty) {
        return -1;
    }
}

class InitDrawMode extends DrawMode {
    constructor() {
        super();
        this.gScreenX = 400;
        this.gScreenY = 800;
    }

    drawBackground(bufCtx, backgroundImageList, player1Level, player2Level) {
        bufCtx.drawImage(backgroundImageList[player1Level], 0, 0, 400, this.gScreenY);
    }

    drawPillar(bufCtx, buttonImage, game) {
        let item = game.item();
        let pillar = game.pillar();

        for (let i = 0; i < pillar.length; i++) {
            let p = pillar[i];
            let x = p[0];

            if (x > 800 - 400) {
                continue;
            }

            for (let j = 0; j < p[1]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_top'], x, p[1] * 60, 60, 60);

            for (let j = 0; j < p[2]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, 540 - j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_down'], x, 540 - p[2] * 60, 60, 60);

            if (item[i][0] > -60) {
                let itemName = ['coin', 'coin', 'red_bottle', 'pink_bottle', 'shield'];
                if (item[i][2] > 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 51);
                } else if (item[i][2] === 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 60);
                }
            }
        }
    }

    drawEnergy(bufCtx, buttonImage, player1Energy, player2Energy) {
        let energy = Math.floor(player1Energy * 2);
        let blockSize = 30;
        let startX = 790 - 204 - 400;
        let startY = 10;

        bufCtx.drawImage(buttonImage['bar'], startX, startY, 204, blockSize);
        bufCtx.fillStyle = '#000000';

        bufCtx.fillRect(startX + 2 + 200 - (200 - energy), startY + 2, 200 - energy, blockSize - 4);
    }

    drawScore(bufCtx, buttonImage, score) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 7;
        let blockSize = 30;
        let startX = 770 - (blockSize * 0.6 * pos) - 400;
        let startY = 10;

        bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
        while (score > 0) {
            bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
            score = Math.floor(score / 10);
            pos--;
        }
    }

    drawBird(bufCtx, birdImage, circleImage, game, birdFrame) {
        for (let i = 0; i < game.floppybird.length; i++) {
            bufCtx.drawImage(birdImage[birdFrame], game.floppybird[i].x(), game.floppybird[i].y(), 60, 51);

            if (game.isPlayState() || game.isPauseState()) {
                if (game.shield() > 0) {
                    bufCtx.globalAlpha = game.shield() / 250;
                    bufCtx.drawImage(circleImage[birdFrame], game.floppybird[i].x() - 5, game.floppybird[i].y() - 10, 75, 75);
                    bufCtx.globalAlpha = 1.0;
                }
            }
        }
    }

    drawButton(bufCtx, buttonImage, game) {
        let highScore = game.highScore();

        if (game.isIdleState()) {
            bufCtx.drawImage(buttonImage['single_mode'], 250 - (250 - 95), 100, 210, 100);
            bufCtx.drawImage(buttonImage['together_mode'], 250 - (250 - 95), 250, 210, 100);
            //bufCtx.drawImage(buttonImage['compete_mode'], 250 - (250 - 95), 100, 300 * 0.7, 163 * 0.7);
        }
    }

    drawHighScore(bufCtx, buttonImage, highScore) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 8;
        let blockSize = 40;
        //let startX = (780-blockSize*pos)/2;
        let startX = (400 - blockSize * pos) / 2;
        let startY = 300;

        bufCtx.fillStyle = '#FFFF0022';
        bufCtx.fillRect(startX, startY, blockSize * pos, blockSize);
        pos--;
        bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
        while (highScore > 0) {
            bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
            highScore = Math.floor(highScore / 10);
            pos--;
        }
    }

    getEventCode(x, y, game) {
        printf("[DrawEngine] getEventCode() ", game.state() + " (" + x + ", " + y + ")");
        if (game.isIdleState()) {
            //bufCtx.drawImage(buttonImage['single_mode'], 250 - (250 - 95), 100, 210, 100);
            //bufCtx.drawImage(buttonImage['together_mode'], 250 - (250 - 95), 250, 210, 100);

            let bx1 = game.gStartX + 95 * game.gScale;
            let bx2 = game.gStartX + (95 + 210) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = (100 + 100) * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                setSingleMode();
                return SPACE_KEY;
            }

            by1 = 250 * game.gScale;
            by2 = 350 * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                setTogetherMode();
                return SPACE_KEY;
            }
        }
        return SPACE_KEY;
    }
}


class SingDrawMode extends DrawMode {
    constructor() {
        super();
        this.gScreenX = 400;
        this.gScreenY = 800;
    }

    drawBackground(bufCtx, backgroundImageList, player1Level, player2Level) {
        bufCtx.drawImage(backgroundImageList[player1Level], 0, 0, 400, this.gScreenY);
    }

    drawPillar(bufCtx, buttonImage, game) {
        let item = game.item();
        let pillar = game.pillar();

        for (let i = 0; i < pillar.length; i++) {
            let p = pillar[i];
            let x = p[0];

            if (x > 800 - 400) {
                continue;
            }

            for (let j = 0; j < p[1]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_top'], x, p[1] * 60, 60, 60);

            for (let j = 0; j < p[2]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, 540 - j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_down'], x, 540 - p[2] * 60, 60, 60);

            if (item[i][0] > -60) {
                let itemName = ['coin', 'coin', 'red_bottle', 'pink_bottle', 'shield'];
                if (item[i][2] > 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 51);
                } else if (item[i][2] === 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 60);
                }
            }
        }
    }

    drawEnergy(bufCtx, buttonImage, player1Energy, player2Energy) {
        let energy = Math.floor(player1Energy * 2);
        let blockSize = 30;
        let startX = 790 - 204 - 400;
        let startY = 10;

        bufCtx.drawImage(buttonImage['bar'], startX, startY, 204, blockSize);
        bufCtx.fillStyle = '#000000';

        bufCtx.fillRect(startX + 2 + 200 - (200 - energy), startY + 2, 200 - energy, blockSize - 4);
    }

    drawScore(bufCtx, buttonImage, score) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 7;
        let blockSize = 30;
        let startX = 770 - (blockSize * 0.6 * pos) - 400;
        let startY = 10;

        bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
        while (score > 0) {
            bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
            score = Math.floor(score / 10);
            pos--;
        }
    }

    drawBird(bufCtx, birdImage, circleImage, game, birdFrame) {
        for (let i = 0; i < game.floppybird.length; i++) {
            bufCtx.drawImage(birdImage[birdFrame], game.floppybird[i].x(), game.floppybird[i].y(), 60, 51);

            if (game.isPlayState() || game.isPauseState()) {
                if (game.shield() > 0) {
                    bufCtx.globalAlpha = game.shield() / 250;
                    bufCtx.drawImage(circleImage[birdFrame], game.floppybird[i].x() - 5, game.floppybird[i].y() - 10, 75, 75);
                    bufCtx.globalAlpha = 1.0;
                }
            }
        }
    }

    drawButton(bufCtx, buttonImage, game) {
        let highScore = game.highScore();

        if (game.isIdleState()) {
            bufCtx.drawImage(buttonImage['start'], 250 - (250 - 95), 100, 300 * 0.7, 163 * 0.7);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isPauseState()) {
            bufCtx.drawImage(buttonImage['resume'], 300 - 200, 100, 200, 100);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isGameOverState()) {
            bufCtx.drawImage(buttonImage['start'], 250 - (250 - 95), 100, 300 * 0.7, 163 * 0.7);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isPlayState()) {
            bufCtx.drawImage(buttonImage['pause'], 10, 10, 60, 60);
        }
    }

    drawHighScore(bufCtx, buttonImage, highScore) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 8;
        let blockSize = 40;
        //let startX = (780-blockSize*pos)/2;
        let startX = (400 - blockSize * pos) / 2;
        let startY = 300;

        bufCtx.fillStyle = '#FFFF0022';
        bufCtx.fillRect(startX, startY, blockSize * pos, blockSize);
        pos--;
        bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
        while (highScore > 0) {
            bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
            highScore = Math.floor(highScore / 10);
            pos--;
        }
    }

    getEventCode(x, y, game) {
        printf("[DrawEngine] getEventCode() ", game.state() + " (" + x + ", " + y + ")");
        if (game.isIdleState()) {
            let bx1 = game.gStartX + 95 * game.gScale;
            let bx2 = game.gStartX + (95 + 210) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = (100 + 163 * 0.7) * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isPauseState()) {
            let bx1 = game.gStartX + 100 * game.gScale;
            let bx2 = game.gStartX + 300 * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = 200 * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isGameOverState()) {
            let bx1 = game.gStartX + 95 * game.gScale;
            let bx2 = game.gStartX + (95 + 210) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = (100 + 163 * 0.7) * game.gScale;
            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isPlayState()) {
            let bx1 = game.gStartX + 10 * game.gScale;
            let bx2 = game.gStartX + 70 * game.gScale;
            let by1 = 10 * game.gScale;
            let by2 = 70 * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return P_KEY;
            }
            return SPACE_KEY;
        }
        return SPACE_KEY;
    }
}


class TogetherDrawMode extends DrawMode {
    constructor() {
        super();
    }

    drawBackground(bufCtx, backgroundImageList, player1Level, player2Level) {
        bufCtx.drawImage(backgroundImageList[player1Level], 0, 0, gScreenX, gScreenY);
    }

    drawPillar(bufCtx, buttonImage, game) {
        let item = game.item();
        let pillar = game.pillar();

        for (let i = 0; i < pillar.length; i++) {
            let p = pillar[i];
            let x = p[0];

            if (x > 800) {
                continue;
            }

            for (let j = 0; j < p[1]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_top'], x, p[1] * 60, 60, 60);

            for (let j = 0; j < p[2]; j++) {
                bufCtx.drawImage(buttonImage['tile_body'], x, 540 - j * 60, 60, 60);
            }
            bufCtx.drawImage(buttonImage['tile_down'], x, 540 - p[2] * 60, 60, 60);

            if (item[i][0] > -60) {
                let itemName = ['coin', 'coin', 'red_bottle', 'pink_bottle', 'shield'];
                if (item[i][2] > 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 51);
                } else if (item[i][2] === 1) {
                    bufCtx.drawImage(buttonImage[itemName[item[i][2]]], item[i][0], item[i][1] * 60, 60, 60);
                }
            }
        }
    }

    drawEnergy(bufCtx, buttonImage, player1Energy, player2Energy) {
        let energy = Math.floor(player1Energy * 2);
        let blockSize = 30;
        let startX = 790 - 204;
        let startY = 10;

        bufCtx.drawImage(buttonImage['bar'], startX, startY, 204, blockSize);
        bufCtx.fillStyle = '#000000';

        bufCtx.fillRect(startX + 2 + 200 - (200 - energy), startY + 2, 200 - energy, blockSize - 4);
    }

    drawScore(bufCtx, buttonImage, score) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 7;
        let blockSize = 30;
        let startX = 770 - (blockSize * 0.6 * pos);
        let startY = 10;

        bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
        while (score > 0) {
            bufCtx.drawImage(buttonImage[code[score % 10]], startX + blockSize * 0.6 * pos, startY, blockSize * 0.6, blockSize);
            score = Math.floor(score / 10);
            pos--;
        }
    }

    drawBird(bufCtx, birdImage, circleImage, game, birdFrame) {
        for (let i = 0; i < game.floppybird.length; i++) {
            bufCtx.drawImage(birdImage[birdFrame], game.floppybird[i].x(), game.floppybird[i].y(), 60, 51);

            if (game.isPlayState() || game.isPauseState()) {
                if (game.shield() > 0) {
                    bufCtx.globalAlpha = game.shield() / 250;
                    bufCtx.drawImage(circleImage[birdFrame], game.floppybird[i].x() - 5, game.floppybird[i].y() - 10, 75, 75);
                    bufCtx.globalAlpha = 1.0;
                }
            }
        }
    }

    drawButton(bufCtx, buttonImage, game) {
        let highScore = game.highScore();
        if (game.isIdleState()) {
            bufCtx.drawImage(buttonImage['start'], (800-300)/2, 100, 300, 163);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isPauseState()) {
            bufCtx.drawImage(buttonImage['resume'], (800-200)/2, 100, 200, 100);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isGameOverState()) {
            bufCtx.drawImage(buttonImage['start'], (800-300)/2, 100, 300, 163);
            this.drawHighScore(bufCtx, buttonImage, highScore);
        } else if (game.isPlayState()) {
            bufCtx.drawImage(buttonImage['pause'], 10, 10, 60, 60);
        }
    }

    drawHighScore(bufCtx, buttonImage, highScore) {
        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let pos = 8;
        let blockSize = 40;
        //let startX = (780-blockSize*pos)/2;
        let startX = (800 - blockSize * pos) / 2;
        let startY = 300;

        bufCtx.fillStyle = '#FFFF0022';
        bufCtx.fillRect(startX, startY, blockSize * pos, blockSize);
        pos--;
        bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
        while (highScore > 0) {
            bufCtx.drawImage(buttonImage[code[highScore % 10]], startX + blockSize * pos, startY, blockSize, blockSize);
            highScore = Math.floor(highScore / 10);
            pos--;
        }
    }

    getEventCode(x, y, game) {
        printf("[DrawEngine] getEventCode() ", game.state() + " (" + x + ", " + y + ") gScale: " + game.gScale);
        if (game.isIdleState()) {
            let bx1 = game.gStartX + ((800-300)/2) * game.gScale;
            let bx2 = game.gStartX + ((800-300)/2 + 300) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = (100 + 163) * game.gScale;

            printf("[DrawEngine] getEventCode(): ", game.state() + " (" + bx1 + ", " + by1 + ")");
            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isPauseState()) {
            let bx1 = game.gStartX + ((800-200)/2) * game.gScale;
            let bx2 = game.gStartX + ((800-200)/2 + 200) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = 200 * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isGameOverState()) {
            let bx1 = game.gStartX + ((800-300)/2) * game.gScale;
            let bx2 = game.gStartX + ((800-300)/2 + 300) * game.gScale;
            let by1 = 100 * game.gScale;
            let by2 = (100 + 163) * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return S_KEY;
            }
        } else if (game.isPlayState()) {
            let bx1 = game.gStartX + 10 * game.gScale;
            let bx2 = game.gStartX + 70 * game.gScale;
            let by1 = 10 * game.gScale;
            let by2 = 70 * game.gScale;

            if (x > bx1 && x < bx2 && y > by1 && y < by2) {
                return P_KEY;
            }

            if (x < game.gStartX + game.gScreenX * 0.5 * game.gScale) {
                return SPACE_KEY;
            }
            return ARROW_UP_KEY;
        }
        if (x < game.gStartX + game.gScreenX * 0.5 * game.gScale) {
            return SPACE_KEY;
        }
        return ARROW_UP_KEY;
    }
}


class CompeteDrawMode extends DrawMode {
    constructor() {
        super();
    }
}


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
        this.buttonImage['resume'] = LoadImage(root + resume_img);
        this.buttonImage['pause'] = LoadImage(root + pause_img);
        this.buttonImage['single_mode'] = LoadImage(root + singleplay_img);
        this.buttonImage['together_mode'] = LoadImage(root + together_img);
        this.buttonImage['compete_mode'] = LoadImage(root + compete_img);

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
        let bufCtx = this.gameMode._bufCtx;

        bufCtx.clearRect(0, 0, this.gameMode.gScreenX, gScreenY);
        bufCtx.beginPath();
        this._drawBackground();
        this._drawPillar();
        this._drawEnergy();
        this._drawScore();
        this._drawBird();
        this._drawButton();

        //bufCtx.fillStyle = '#FFFFFF';
        //console.log("[DrawEngine][OnDraw] " + this.gameMode.gStartX);
        //bufCtx.fillRect(this.gameMode.screenEndX, 0, this.gameMode.gStartX, gScreenY);

        bufCtx.closePath();
        bufCtx.stroke();

        cvs.clearRect(0, 0, canvas.width, canvas.height);

        let startX = this.gameMode.gStartX;
        let scale = this.gameMode.gScale;
        let screenX = this.gameMode.gScreenX;

        let bufCanvas = this.gameMode._bufCanvas;
        cvs.drawImage(bufCanvas, startX, 0, screenX*scale, gScreenY*scale);
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
        this.drawMode.drawButton(bufCtx, this.buttonImage, this.gameMode);
    }

    _drawBird() {
        this._tick++;
        let birdFrame = Math.floor(this._tick / 12);
        if (birdFrame > 3) {
            birdFrame = 3;
            this._tick = 0;
        }
        let bufCtx = this.gameMode._bufCtx;
        this.drawMode.drawBird(bufCtx, this.birdImage, this.circleImage, this.gameMode, birdFrame);
    }

    _drawPillar() {
        let bufCtx = this.gameMode._bufCtx;
        this.drawMode.drawPillar(bufCtx, this.buttonImage, this.gameMode);
    }

    _drawEnergy() {
        let bufCtx = this.gameMode._bufCtx;
        // printf("[DrawEngine] _drawScore()", this.game.score());
        let player1Energy = this.gameMode.energy();
        this.drawMode.drawEnergy(bufCtx, this.buttonImage, player1Energy, 0);
    }

    _drawScore() {
        let bufCtx = this.gameMode._bufCtx;
        // printf("[DrawEngine] _drawScore()", this.game.score());
        this.drawMode.drawScore(bufCtx, this.buttonImage, this.gameMode.score())
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
        } else {
            printf("DrawEngine", "error!!");
        }
    }

    getEventCode(x, y) {
        return this.drawMode.getEventCode(x, y, this.gameMode);
    }
}
