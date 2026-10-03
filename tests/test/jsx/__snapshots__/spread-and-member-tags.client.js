// 13:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const rest = { title: "spread", "data-kind": "span" };
    return <span {...rest}>styled</span>;
});
}

// 27:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const Text = {
        Small: (props) => (<small>{props.children}</small>),
    };
    return <Text.Small>fine print</Text.Small>;
});
}
