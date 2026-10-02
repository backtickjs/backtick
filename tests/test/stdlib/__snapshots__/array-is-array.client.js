// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    return [
        Array.isArray([]),
        Array.isArray([1, 2]),
        Array.isArray("ab"),
        Array.isArray({ length: 0 }),
        Array.isArray(null),
    ];
});
}
