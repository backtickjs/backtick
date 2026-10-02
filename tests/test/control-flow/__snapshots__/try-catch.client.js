// 9:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const message = "boom";
    try {
        throw message;
    }
    catch (error) {
        if (error === message) {
            return "caught boom";
        }
        return "caught something else";
    }
});
}
