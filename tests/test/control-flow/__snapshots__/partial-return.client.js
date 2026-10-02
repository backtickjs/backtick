// 10:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let n = 1;
    if (n === 2) {
        return "some";
    }
});
}

// 23:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const pick = (b) => {
        if (b) {
            return "taken";
        }
    };
    return [pick(true), pick(false)];
});
}
