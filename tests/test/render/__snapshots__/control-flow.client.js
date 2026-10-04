// 20:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $splice1) => <ul>
  <$tag0 each={$splice1()}>
    {(row, index) => <li>{index + ": " + row()}</li>}
  </$tag0>
</ul>);
}

// 26:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $tag1) => <$tag0 fallback={<p>none</p>}>
  <$tag1 when={1 > 2}>
    <p>wrong</p>
  </$tag1>
  <$tag1 when={2 > 1}>
    <p>right</p>
  </$tag1>
</$tag0>);
}

// 35:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $splice1) => <$tag0 fallback={<p>caught</p>}>{$splice1()}</$tag0>);
}

// 36:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    throw "drawn wrong";
});
}

// 41:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <$tag0 fallback={<p>loading</p>}>
  <p>loaded</p>
</$tag0>);
}

// 45:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <div>
  <p>here</p>
  <$tag0>
    <p>elsewhere</p>
  </$tag0>
</div>);
}
