// 8:25
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => true);
}

// 10:72
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (text, upper) => {
    if (upper && text !== null) {
        return text.toUpperCase();
    }
    if ($splice0() && text !== null && text.charAt(0) === "!") {
        return text.concat("?");
    }
    return "none";
});
}

// 27:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ({
    missing: $splice0()(null, true),
    loud: $splice0()("!hi", true),
    quiet: $splice0()("!hi", false),
    plain: $splice0()("zz", false),
}));
}
