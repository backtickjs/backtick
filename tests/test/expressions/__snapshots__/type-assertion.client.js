// 19:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const page = JSON.parse($splice0());
    return page.rows[0] + " of " + page.count;
});
}
