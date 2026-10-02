// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const rows = [1, 2, 3];
    const first = rows.find((row) => row > 1);
    return first * 10;
});
}
