// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let i = 0;
    let seen = "";
    for (; i < 3;) {
        seen = seen + i;
        i = i + 1;
    }
    return seen;
});
}
