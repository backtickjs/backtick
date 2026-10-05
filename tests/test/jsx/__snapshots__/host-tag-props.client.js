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
exports.default = (($splice0) => {
    const rest = { label: "spread" };
    return ($Badge => <$Badge {...rest} disabled data-id="seven" icon=<b>!</b>/>)($splice0());
});
}
