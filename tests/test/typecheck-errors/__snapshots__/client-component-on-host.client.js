// 7:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => <b>{props.n}</b>);
}

// 16:25
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ($For => <$For each={[1, 2]}>
  {(n) => ($Badge => <$Badge n={n}/>)($splice1())}
</$For>)($splice0()));
}
