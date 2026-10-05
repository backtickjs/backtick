// 21:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [count, setCount] = $splice0()(0);
    return (($Button => <$Button variant="primary" icon={<b>+</b>} onClick={() => setCount(count() + 1)}>
      <span>{"Pressed " + count() + " times"}</span>
    </$Button>)($splice1()));
});
}

// 35:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (($Button => <$Button variant="large" onClick={() => { }}>
    Save
  </$Button>)($splice0())));
}
