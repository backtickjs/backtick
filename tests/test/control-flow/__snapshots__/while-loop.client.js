// 9:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let i = 0;
    let total = 0;
    while (i < 5) {
        total = total + i;
        if (i === 3) {
            return total;
        }
        i = i + 1;
    }
    return total;
});
}
