class Energy extends Observer {
    constructor(game) {
        super();
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
                this.notify();
            }
            this._energy = 100;
        }
    }

    decrease(value) {
        this._energy -= value;
        this._energy = this._energy < 0 ? 0 : this._energy;
    }

    notify() {
        super.notify("SHIELD");
    }
}