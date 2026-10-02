// 11:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    let count = 0;
    const bump = () => {
        count = count + 1;
        return count;
    };
    return bump() + bump();
});
}
