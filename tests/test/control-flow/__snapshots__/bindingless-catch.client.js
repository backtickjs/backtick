// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    try {
        throw "boom";
    }
    catch {
        return "caught";
    }
});
}
