// 11:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (label) => {
    return { label: $splice0()(label) };
});
}

// 15:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <span style="font-size: 16px" onclick={() => {
        const row = $splice0()("one");
        row.label[1](row.label[0]() + " !!!");
    }}>
    {$splice0()("one").label[0]()}
  </span>);
}
