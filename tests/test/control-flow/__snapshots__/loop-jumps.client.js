// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let out = "";
    for (let i = 0; i < 5; i = i + 1) {
        if (i === 1) {
            continue;
        }
        while (true) {
            out = out + i;
            break;
        }
        if (i === 3) {
            break;
        }
    }
    return out;
});
}
