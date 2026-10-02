// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let out = "";
    for (let i = 0; i < 2; i = i + 1) {
        const i = "-";
        for (let j = 0; j < 2; j = j + 1) {
            out = out + i + j;
        }
    }
    return out;
});
}
