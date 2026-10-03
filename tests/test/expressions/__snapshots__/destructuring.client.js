// 12:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const [a, , b = 5, ...others] = [1, 2, undefined, 4, 6];
    const { x, y: { z }, w = 7, ...more } = { x: 1, y: { z: 2 }, extra: 3 };
    return [a, b, others, x, z, w, more];
}));
}

// 30:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const sum = (...values) => values.reduce((t, v) => t + v, 0);
    const scaled = (n, by = 2) => n * by;
    const named = ({ first, last }) => first + " " + last;
    const pair = ([left, right]) => left - right;
    return [
        sum(1, 2, 3),
        scaled(4),
        scaled(4, 3),
        named({ first: "A", last: "B" }),
        pair([5, 2]),
    ];
}));
}
