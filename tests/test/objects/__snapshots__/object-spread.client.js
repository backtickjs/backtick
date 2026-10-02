// 17:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const base = { a: 1, b: 2 };
    const over = { b: 9 };
    return {
        ...base,
        ...over,
        c: 3,
    };
});
}
