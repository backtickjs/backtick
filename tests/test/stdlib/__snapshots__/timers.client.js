// 25:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const stop = window.clearInterval;
    const repeating = window.setInterval(() => 0, 1000);
    stop(repeating);
    window.clearTimeout(window.setTimeout(() => 0, 1000));
});
}
