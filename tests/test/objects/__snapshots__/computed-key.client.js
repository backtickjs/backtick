// 13:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const base = { a: 1, b: 2 };
    const name = "b";
    return {
        ...base,
        [name]: 9,
        ["c" + "d"]: 3,
        a: 4,
    };
});
}
