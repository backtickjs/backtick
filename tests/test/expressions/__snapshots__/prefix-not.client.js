// 10:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (ready, count) => {
    if (!ready) {
        return "waiting";
    }
    return !(count > 3) ? "room left" : "full";
});
}
