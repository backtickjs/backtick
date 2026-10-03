// 14:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const x = 1;
    const both = { x, Math };
    return [both.x, both.Math.max(2, 3)];
}));
}

// 27:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const start = { n: 1 };
    const copy = { n: start.n + 1 };
    class Base {
        twice() {
            return copy.n * 2;
        }
    }
    class Child extends Base {
    }
    return [copy.n, new Child().twice()];
}));
}
