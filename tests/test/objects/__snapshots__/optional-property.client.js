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
exports.default = (($splice0, $splice1, $splice2) => ({
    present: $splice0()({ label: "a", inner: { z: 3 } }),
    partial: $splice1()({ label: "b", inner: {} }),
    omitted: $splice2()({ label: "c" }),
}));
}
