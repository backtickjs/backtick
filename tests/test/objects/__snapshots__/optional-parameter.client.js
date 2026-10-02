// 8:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (name) => {
    return name?.concat("!");
});
}

// 14:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => () => 2);
}

// 16:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (cb) => {
    return cb?.() ?? 0;
});
}

// 24:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => ({
    named: $splice0()("hi"),
    explicit: $splice0()(undefined),
    omitted: $splice0()(),
    supplied: $splice1()($splice2()),
    fallback: $splice1()(undefined),
    omittedCallback: $splice1()(),
}));
}
