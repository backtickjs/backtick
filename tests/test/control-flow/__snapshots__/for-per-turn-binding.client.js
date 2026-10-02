// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let last = () => 0;
    for (let i = 0; i < 3; i = i + 1) {
        last = () => i;
    }
    return last();
});
}
