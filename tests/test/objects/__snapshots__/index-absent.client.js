// 14:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const names = ["zero", "one"];
    const missing = $splice0()["nowhere"] ?? "gone";
    return names[1] + "/" + missing;
});
}
