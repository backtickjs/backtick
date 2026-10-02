// 9:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const greeting = "Hello";
    return greeting.concat(", ", "World").toUpperCase();
});
}
