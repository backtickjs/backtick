// 10:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let i = 0;
    for (;;) {
        if (i === 4) {
            break;
        }
        i = i + 1;
    }
    return i;
});
}
