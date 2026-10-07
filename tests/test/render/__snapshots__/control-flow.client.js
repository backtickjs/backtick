// 20:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (<ul>
    {($Index => <$Index each={$splice1()}>
      {(row, index) => <li>{index + ": " + row()}</li>}
    </$Index>)($splice0())}
  </ul>));
}

// 28:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => (($Switch => <$Switch fallback={<p>none</p>}>
    {($Match => <$Match when={1 > 2}>
      <p>wrong</p>
    </$Match>)($splice1())}
    {($Match => <$Match when={2 > 1}>
      <p>right</p>
    </$Match>)($splice2())}
  </$Switch>)($splice0())));
}

// 39:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ($ErrorBoundary => <$ErrorBoundary fallback={<p>caught</p>}>{$splice1()}</$ErrorBoundary>)($splice0()));
}

// 40:7
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    throw "drawn wrong";
});
}

// 45:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (($Suspense => <$Suspense fallback={<p>loading</p>}>
    <p>loaded</p>
  </$Suspense>)($splice0())));
}

// 51:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (<div>
    <p>here</p>
    {($Portal => <$Portal>
      <p>elsewhere</p>
    </$Portal>)($splice0())}
  </div>));
}
