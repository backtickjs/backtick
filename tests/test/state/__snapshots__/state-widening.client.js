// 24:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => {
    const flag = $splice0()(true);
    const tone = $splice0()($splice1());
    const step = $splice0()(() => 0);
    return (<span onclick={() => {
            flag[1](false);
            tone[1]($splice2());
            step[1](() => () => 1);
        }}>
        {flag[0]() + " " + tone[0]() + " " + step[0]()()}
      </span>);
});
}
