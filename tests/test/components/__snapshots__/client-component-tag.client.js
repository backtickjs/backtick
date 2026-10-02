// 12:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => <b>{"badge " + props.n}</b>);
}

// 14:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1, $tag2) => {
    const scale = $splice0()(1);
    return (<div>
      <$tag1 each={[1, 2]}>{(n) => <$tag2 n={n * scale[0]()}/>}</$tag1>
      <button onclick={() => scale[1](scale[0]() * 2)}>double</button>
    </div>);
});
}
