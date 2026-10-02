// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const base = { a: 1 };
    return { ...base, "...": 2 };
});
}
