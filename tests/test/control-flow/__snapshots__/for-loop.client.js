// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let total = 0;
    for (let i = 0; i < 5; i = i + 1) {
        total = total + i;
    }
    return total;
});
}
