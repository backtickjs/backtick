// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        total = total + i;
    }
    let n = 0.1;
    const before = n++;
    const after = ++n;
    const down = n--;
    return [total, before, after, down, n];
});
}
