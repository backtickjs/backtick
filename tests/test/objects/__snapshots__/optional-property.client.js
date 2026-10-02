// 8:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (o) => {
    return [o.label, o.inner?.z ?? 0];
});
}

// 16:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ({
    present: $splice0()({ label: "a", inner: { z: 3 } }),
    partial: $splice0()({ label: "b", inner: {} }),
    omitted: $splice0()({ label: "c" }),
}));
}
