class Mængde {
    constructor() {
        this.elements = []
        this.elements.count = 0;
    }

    add(x) {
        if (
            typeof x !== "number" &&
            typeof x !== "string" &&
            typeof x !== "boolean"
        )
    }

    clear() {
        this.elements = [];
        this.count = 0;
    }

    delete() {

    }

    has() {
        for (let i = 0; i < this.count; i++) {
            if (this.elements[i] === x) {

            }
        }
    }
    get size() {
        return this.count;
    }
}

const m = new Mængde

// IKKE FÆRDIGKODET //
