class Store {
    private store: Map<number, number[]> = new Map<number, number[]>();

    add(timestamp: number, price: number, checkpoint: number): void {
        if (this.store.has(timestamp)) {
            const prices = this.store.get(timestamp);
            if (prices) {
                this.store.set(timestamp, [...prices, price]);
            }
        } else {
            this.store.set(timestamp, [price]);
        }
    }

    highest(timestamp: number, checkpoint: number): number {
        if (this.store.has(timestamp)) {
            const prices = this.store.get(timestamp);
            if (prices && prices.length > 0) {
                return Math.max(...prices);
            }
        }
        return 0;
    }
}

let s = new Store();
s.add(1, 10, 0);
s.add(1, 20, 0);
s.add(2, 5, 0);
console.log(s.highest(1, 0)); // 20
console.log(s.highest(2, 0)); // 5