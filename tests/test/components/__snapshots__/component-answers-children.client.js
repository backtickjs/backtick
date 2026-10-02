// 11:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <>counted</>);
}

// 15:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <>
    <em>one</em>
    <em>two</em>
  </>);
}

// 25:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => <div>
      {$splice0()}
      {$splice1()}
    </div>);
}
