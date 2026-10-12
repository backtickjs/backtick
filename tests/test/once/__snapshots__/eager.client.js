// 11:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const counter = globalThis;
    counter.onceRuns = (counter.onceRuns ?? 0) + 1;
    return "counted";
});
}

// 17:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <p>{false ? $splice0() : "ok"}</p>);
}
