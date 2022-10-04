class Shield {
    constructor() {
        this._energy = 0;
    }

    init() {
        this._energy = 0;
    }

    start() {
        this._energy = 255;
    }

    isAlive() {
        return this._energy > 0;
    }

    energy() {
        return this._energy;
    }

    decrease(value=1) {
        this._energy -= value;
        this._energy = this._energy < 0 ? 0 : this._energy;
    }
}