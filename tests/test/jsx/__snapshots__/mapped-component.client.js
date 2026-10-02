// 26:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $tag2) => <div>
      <$tag2 each={$splice0()}>
        {(row) => $splice1(row)}
      </$tag2>
    </div>);
}

// 28:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => <span>{"row " + $capture0}</span>);
}
