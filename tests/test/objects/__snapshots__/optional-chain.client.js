// 8:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (p) => {
    return p?.x;
});
}

// 12:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (o) => {
    return o?.inner?.z;
});
}

// 16:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (s) => {
    return s?.concat("!");
});
}

// 24:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6) => ({
    found: $splice0()({ x: 5 }),
    missing: $splice1()(null),
    deep: $splice2()({ inner: { z: 7 } }),
    cut: $splice3()({ inner: null }),
    top: $splice4()(null),
    loud: $splice5()("hi"),
    silent: $splice6()(null),
}));
}
