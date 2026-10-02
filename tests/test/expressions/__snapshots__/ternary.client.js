// 7:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (n) => {
    return n === null ? 0 : n + 1;
});
}

// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ({
    absent: $splice0()(null),
    present: $splice0()(4),
}));
}
