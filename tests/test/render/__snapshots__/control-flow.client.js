// 20:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => <ul>
  {($Index => <$Index each={$splice1()}>
    {(row, index) => <li>{index + ": " + row()}</li>}
  </$Index>)($splice0())}
</ul>);
}

// 26:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ($Switch => <$Switch fallback={<p>none</p>}>
  {($Match => <$Match when={1 > 2}>
    <p>wrong</p>
  </$Match>)($splice1())}
  {($Match => <$Match when={2 > 1}>
    <p>right</p>
  </$Match>)($splice1())}
</$Switch>)($splice0()));
}

// 35:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ($ErrorBoundary => <$ErrorBoundary fallback={<p>caught</p>}>{$splice1()}</$ErrorBoundary>)($splice0()));
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
exports.default = (($splice0) => ($Suspense => <$Suspense fallback={<p>loading</p>}>
  <p>loaded</p>
</$Suspense>)($splice0()));
}

// 45:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <div>
  <p>here</p>
  {($Portal => <$Portal>
    <p>elsewhere</p>
  </$Portal>)($splice0())}
</div>);
}
