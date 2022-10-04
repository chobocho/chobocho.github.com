class Energy {
    constructor(game) {
        this._energy = 100;
        this.game = game;
    }

    init() {
        this._energy = 100;
    }

    energy() {
        return this._energy;
    }

    increase(value) {
        this._energy += value;
        if (this._energy > 100) {
            if (this._energy > 108) {
                this.game[0].startShield();
                this.game[1].startShield();
            }
            this._energy = 100;
        }
    }

    decrease(value) {
        this._energy -= value;
        this._energy = this._energy < 0 ? 0 : this._energy;
    }

    setGame(game) {
        this.game = game;
    }
}