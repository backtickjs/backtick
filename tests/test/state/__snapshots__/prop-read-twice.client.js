// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => <p>{$splice0() === $splice1() ? "same" : "different"}</p>);
}

// 17:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [count] = $splice0()(0);
    return <div>{$splice1(count)}</div>;
});
}

// 19:35
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => ({ count: $capture0() }));
}
