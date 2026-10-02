// 11:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (name) => (<>
    <span>a sentence across lines</span>
    <span>
      {name} {name}
    </span>
  </>));
}

// 21:43
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <div>{$splice0()("x")}</div>);
}
