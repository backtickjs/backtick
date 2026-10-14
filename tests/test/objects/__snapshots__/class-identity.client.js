// 6:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => class Point {
    x;
    constructor(x) {
        this.x = x;
    }
});
}

// 10:25
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => class Made {
});
}

// 15:33
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => $splice0() === $splice1());
}

// 19:33
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => $splice0() === $splice1());
}

// 23:33
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const make = (label) => $splice0(label);
    const A = make("a");
    return [A === make("b"), new A().name];
});
}

// 25:11
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => class Labelled {
    name = $capture0;
});
}
