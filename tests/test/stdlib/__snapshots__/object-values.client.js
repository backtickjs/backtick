// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const prices = { apple: 1, pear: 2 };
    return {
        values: Object.values(prices),
        holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")],
    };
});
}
