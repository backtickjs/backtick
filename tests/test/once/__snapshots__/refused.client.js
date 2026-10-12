// 13:13
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const x = 1;
    return $splice0(x);
});
}

// 15:23
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => $capture0 + 1);
}

// 23:24
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ({ label: $splice0() }));
}

// 24:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0().label);
}

// 26:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const name = "n";
    return $splice0(name);
});
}

// 28:31
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => $capture0);
}
