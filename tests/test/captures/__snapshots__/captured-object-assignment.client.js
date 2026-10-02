// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const counter = { count: 0 };
    const bump = $splice0(counter);
    bump();
    bump();
    return counter.count;
});
}

// 14:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => () => {
    $capture0.count += 1;
});
}
