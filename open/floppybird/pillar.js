class Pillar {
    constructor(items) {
        this._pillars = [];
        this._items = items;
    }

    init() {
        this._items.init();
        this._pillars = [[200, 0, 0]];

        for (let i = 0; i < 4; ++i) {
            let down = getRandomInt(0, 5);
            let top = getRandomInt(0, 5 - down);
            this._pillars.push([400 + i * 200, top, down])
            this._items.make_new_item(400 + i * 200, top, down);
        }
    }

    move(speed = 1) {
        printf("[Pillar] ", "Speed:" + speed);

        for (let i = 0; i < this._pillars.length; i++) {
            this._pillars[i][0] -= speed;
        }

        if (this._pillars[0][0] < -60) {
            this._make_new_pillar(speed);
        }
    }

    _make_new_pillar(gameSpeed = 1) {
        this._pillars.splice(0, 1);
        let speed = gameSpeed > 5 ? gameSpeed * 2 : gameSpeed;
        let gap = speed * 2 > 100 ? 100 : Math.floor(speed * 2);
        let px = this._pillars[3][0] + 250 + getRandomInt(gap, 120 + gap);

        let block = [5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let block_count = speed < 15 ? block[Math.floor(speed)] : 3;
        let down = getRandomInt(0, block_count);
        let top = getRandomInt(0, block_count - down);
        this._pillars.push([px, top, down]);

        this._items.pop();
        this._items.make_new_item(px, top, down);
    }

    pillar() {
        return this._pillars;
    }
}