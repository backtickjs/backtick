// 12:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (n) => n * 2);
}

// 13:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (n) => (m) => n + m);
}

// 16:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <h2>{$splice0().title}</h2>);
}

// 19:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => "shared");
}

// 21:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $tag7) => {
    const count = $splice0()(1);
    const rows = [1, 2, 3];
    const total = count[0]() + $splice1(rows);
    return (<section>
      {$splice2(rows)}
      {$splice3(rows)}
      <p>{$splice4(rows)(count[0]())}</p>
      <p>{$splice5(rows)(1)(2)}</p>
      <p>{$splice6(rows)}</p>
      <p>{total}</p>
      <ul>
        <$tag7 each={rows}>{(row) => <li>{row + count[0]()}</li>}</$tag7>
      </ul>
    </section>);
});
}

// 24:32
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => $capture0.length);
}

// 46:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(1));
}

// 47:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => $splice0()(1)(2) + $splice1().length);
}

// 48:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0());
}
