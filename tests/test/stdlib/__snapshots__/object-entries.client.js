// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const held = { n: 1, q: "ada" };
    const written = Object.fromEntries(Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]));
    return written.n + " " + written.q;
});
}
