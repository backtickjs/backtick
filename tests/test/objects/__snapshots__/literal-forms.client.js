// 13:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const a = 1;
    const key = "dyn";
    const counter = {
        a,
        count: 0,
        [key + "amic"]: true,
        bump() {
            this.count = this.count + 1;
            return this.count;
        },
        get double() {
            return this.count * 2;
        },
        set to(value) {
            this.count = value;
        },
    };
    counter.bump();
    counter.to = 5;
    return [counter.a, counter.dynamic, counter.bump(), counter.double];
}));
}

// 43:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const names = ["a"];
    const none = null;
    const o = { inner: { z: 3 } };
    const empty = null;
    return [names?.[0], none?.[0], o?.inner.z, empty?.inner.z];
}));
}
