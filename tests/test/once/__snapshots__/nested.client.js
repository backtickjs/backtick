// 8:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => ({ n: 1 }));
}

// 9:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => ({ inner: $splice0(), same: $splice1() === $splice2() }));
}

// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => ({ outer: $splice0(), shared: $splice1().inner === $splice2() }));
}

// 20:40
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => "root");
}

// 23:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (n) => n * 2);
}

// 26:39
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(21));
}
