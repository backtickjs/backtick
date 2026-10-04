// 26:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $splice1, $splice2) => <div>
      <$tag0 each={$splice1()}>
        {(row) => $splice2(row)}
      </$tag0>
    </div>);
}

// 28:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => <span>{"row " + $capture0}</span>);
}
