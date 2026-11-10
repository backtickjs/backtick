// 10:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const counter = globalThis;
    counter.scriptRuns = (counter.scriptRuns ?? 0) + 1;
    return "counted";
});
}

// 16:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <p>{false ? $splice0() : "ok"}</p>);
}
