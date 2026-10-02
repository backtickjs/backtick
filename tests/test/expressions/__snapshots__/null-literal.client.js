// 7:58
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (value) => {
    if (value === null) {
        return "-";
    }
    return value;
});
}

// 20:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ({
    missing: $splice0()(null),
    present: $splice0()("hi"),
    bare: null,
}));
}
