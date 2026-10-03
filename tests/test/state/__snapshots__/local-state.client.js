// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const [size, setSize] = $splice0()(16);
    return (<span style={"font-size: " + size() + "px"} onclick={() => {
            setSize(size() + 1);
        }}>
        press
      </span>);
});
}
