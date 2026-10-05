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
exports.default = (($splice0, $splice1, $splice2) => {
    const [scale, setScale] = $splice0()(1);
    return (<div>
      {($For => <$For each={[1, 2]}>{(n) => ($Badge => <$Badge n={n * scale()}/>)($splice2())}</$For>)($splice1())}
      <button onclick={() => setScale(scale() * 2)}>double</button>
    </div>);
});
}
