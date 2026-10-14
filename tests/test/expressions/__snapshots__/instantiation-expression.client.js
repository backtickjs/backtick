// 6:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (value) => [value, value]);
}

// 11:34
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    function wrap(value) {
        return [value];
    }
    const wrapNumber = (wrap);
    return wrapNumber(1);
});
}

// 22:34
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const pairString = ($splice0());
    return pairString("a");
});
}
