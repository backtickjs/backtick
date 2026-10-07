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
exports.default = (($splice0, $splice1, $splice2, $splice3) => ({
    missing: $splice0()(null, true),
    loud: $splice1()("!hi", true),
    quiet: $splice2()("!hi", false),
    plain: $splice3()("zz", false),
}));
}
