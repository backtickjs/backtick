// 21:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
    const [count, setCount] = $splice0()(0);
    return (<$tag1 variant="primary" icon={<b>+</b>} onClick={() => setCount(count() + 1)}>
      <span>{"Pressed " + count() + " times"}</span>
    </$tag1>);
});
}

// 36:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <$tag0 variant="large" onClick={() => { }}>
  Save
</$tag0>);
}
