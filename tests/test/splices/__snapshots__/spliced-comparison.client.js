// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ({
    under: $splice0() < $splice1(),
    atMost: $splice0() <= $splice1(),
    over: $splice1() > $splice0(),
    between: $splice0() < $splice1() && $splice1() > $splice0(),
}));
}
