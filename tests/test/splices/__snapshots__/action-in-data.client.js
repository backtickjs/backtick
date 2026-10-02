// 7:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const x = 1;
});
}

// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const list = $splice0();
    const map = $splice1();
    return list.length + Object.keys(map).length;
});
}
