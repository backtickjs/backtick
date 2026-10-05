// 11:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => <b>{"badge " + props.n}</b>);
}

// 14:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (<p>
    {($ui => <$ui.Badge n={1}/>)($splice0())}
    {($ui => <$ui.Badge n={2}></$ui.Badge>)($splice0())}
  </p>));
}
