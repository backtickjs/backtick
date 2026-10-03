// 9:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => (<span data-id={props["data-id"]} title={props.disabled ? "off" : "on"}>
    {props.icon}
    {props.label}
  </span>));
}

// 25:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => {
    const rest = { label: "spread" };
    return <$tag0 {...rest} disabled data-id="seven" icon=<b>!</b>/>;
});
}
