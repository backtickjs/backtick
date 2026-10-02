// 11:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const label = $splice0()("hi");
    const row = (size) => {
        const css = "font-size: " + size + "px";
        const press = () => label[1]("held");
        return (<div style={css}>
          <span style={css} onclick={() => label[1]("pressed")}>
            {label[0]()}
          </span>
          <span style="font-size: 8px">fixed</span>
          <span style={css} onclick={press}>
            held
          </span>
        </div>);
    };
    return <div style="padding: 0">{row(12)}</div>;
});
}
