// 16:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const floor = Math.floor;
    const apply = (f, n) => f(n);
    return floor(3.5) + apply(Math.ceil, 3.5);
});
}
