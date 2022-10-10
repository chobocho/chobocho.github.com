class Item {
    constructor(game) {
        this.ITEM_NONE = 0;
        this.ITEM_COIN = 1;
        this.ITEM_RED_BOTTLE = 2;
        this.ITEM_PINK_BOTTLE = 3;
        this.ITEM_SHIELD = 4;

        this._items = [];
        this.game = game;
    }

    init() {
        this._items = [[0, 0, 0]];
    }

    item() {
        return this._items;
    }

    pop() {
        this._items.splice(0, 1);
    }

    move(speed = 1) {
        printf("[Item] ", "Speed:" + speed);

        for (let i = 0; i < this._items.length; i++) {
            this._items[i][0] -= speed;
        }
    }

    _has_energy_items() {
        let count = 0;
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i][0] < 0) {
                continue;
            }
            if (this._items[i][2] > this.ITEM_COIN) {
                count++;
            }
        }
        return count >= 2;
    }

    make_new_item(px, top, down) {
        let item_y = top + Math.floor((9 - top - down) / 2);

        if (getRandomInt(0, 100) < 70) {
            if (this.game.energy() < 70 && !this._has_energy_items()) {
                this._items.push([px, item_y, this.ITEM_PINK_BOTTLE]);
            } else {
                this._items.push([-1, item_y, this.ITEM_NONE]);
            }
            return;
        }

        let item_type = this.ITEM_NONE;
        if (getRandomInt(0, 100) < 8) {
            item_type = this.ITEM_SHIELD;
        } else if (this.game.energy() < 50 && !this._has_energy_items()) {
            item_type = this.ITEM_RED_BOTTLE;
        } else {
            item_type = this.ITEM_COIN;
        }

        this._items.push([px, item_y, item_type]);
    }

    removeFirstItem() {
        this._items[0][0] = -100;
        this._items[0][2] = this.ITEM_NONE;
    }

    removeItem(idx) {
        this._items[idx][0] = -100;
        this._items[idx][2] = this.ITEM_NONE;
    }

    setGame(game) {
        this.game = game;
    }
}