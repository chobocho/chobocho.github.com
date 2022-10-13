class SingDrawMode extends DrawMode {
    constructor() {
        super();
        this.gScreenX = 400;
        this.gScreenY = 600;
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

    drawEnergy(bufCtx, buttonImage, player1Energy) {
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