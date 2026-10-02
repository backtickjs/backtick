// 10:33
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => null === null));
}

// 12:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => undefined === undefined));
}

// 19:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => null !== undefined));
}

// 23:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => null === undefined));
}

// 34:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => $splice0()(() => {
    const names = ["a"];
    return [
        $splice1() === undefined,
        $splice1() !== null,
        $splice2() === null,
        $splice2() !== undefined,
        names[1] === undefined,
        names[1] !== null,
    ];
}));
}
