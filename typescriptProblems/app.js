"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let store;
let add;
const Store = function (timestamp, price, checkpoint) {
    store = new Map();
    add = function (timestamp, price, checkpoint) {
        if (store.has(timestamp)) {
            const prices = store.get(timestamp);
            if (prices) {
                store.set(timestamp, [price, ...(prices)]);
            }
        }
        else {
            store.set(timestamp, [price]);
        }
    };
};
//# sourceMappingURL=app.js.map