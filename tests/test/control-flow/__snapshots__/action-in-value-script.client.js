// 7:42
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const x = 1;
});
}

// 11:34
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => () => {
    let n = 0;
    n = 1;
});
}

// 20:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (b) => {
    let n = 0;
    $splice0();
    if (b) {
        $splice1()();
        n = 1;
    }
    return n;
});
}
