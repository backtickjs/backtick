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
exports.default = (($tag0) => <p>
  <$tag0.Badge n={1}/>
  <$tag0.Badge n={2}></$tag0.Badge>
</p>);
}
