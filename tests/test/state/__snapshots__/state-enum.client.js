// 19:49
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (c) => {
    return c === $splice0() ? "blue" : "red";
});
}

// 24:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2, $splice3) => {
    const held = $splice0()($splice1());
    return (<span onclick={() => held[1]($splice2())}>
        {$splice3()(held[0]())}
      </span>);
});
}
