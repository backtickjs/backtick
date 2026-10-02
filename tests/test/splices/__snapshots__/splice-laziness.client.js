// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (flag) => {
    if (flag) {
        return $splice0();
    }
    return "skipped";
});
}

// 21:12
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => "evaluated");
}

// 23:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    throw "the guarded fragment must never evaluate";
});
}

// 31:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ({
    taken: $splice0()(true),
    skipped: $splice1()(false),
}));
}
