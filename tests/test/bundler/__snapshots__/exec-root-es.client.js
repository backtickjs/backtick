// 10:35
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const [count, setCount] = $splice0()(1);
    setCount(count() + 1);
    return count();
});
}
