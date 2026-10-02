// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const coins = [5, 31, 7];
    let total = 0;
    for (let i = 0; i < coins.length; i = i + 1) {
        total = total + coins[i];
    }
    return total;
});
}
