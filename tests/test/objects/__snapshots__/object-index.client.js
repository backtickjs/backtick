// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (currency) => {
    const table = $splice0();
    const asked = table[currency] ?? 0;
    const usd = table["usd"] ?? 0;
    return asked + usd;
});
}
