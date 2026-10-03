// 10:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (initial) => {
    const [count, setCount] = $splice0()(initial);
    return {
        get: () => count(),
        add: (n) => {
            setCount(count() + n);
        },
    };
});
}

// 24:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const c = $splice0()(10);
    return (<button onclick={() => {
            c.add(5);
        }}>
          {c.get()}
        </button>);
});
}
