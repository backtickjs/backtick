// 16:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const doubled = Array.from({ length: 4 }, (_, index) => index * 2);
    const empty = Array.from({ length: 0 }, (_, index) => index);
    const absent = Array.from({ length: 2 }, (value, index) => value === undefined ? index : -1);
    return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");
});
}
