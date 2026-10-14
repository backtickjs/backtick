// 7:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => class Base {
    value;
    constructor(value) {
        this.value = value;
    }
    greet() {
        return "hi " + String(this.value);
    }
});
}

// 16:37
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    class Loud extends $splice0() {
        greet() {
            return super.greet() + "!";
        }
    }
    return new Loud("Ada").greet();
});
}

// 28:37
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    class Counted extends $splice0() {
        greet() {
            return super.greet() + " times";
        }
    }
    return new Counted(3).greet();
});
}
