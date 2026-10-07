// 11:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <span>{$splice0()}</span>);
}

// 17:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [count, setCount] = $splice0()(0);
    return (<div>
      <button onclick={() => setCount(count() + 1)}>add</button>
      {$splice1(count)}
    </div>);
});
}

// 22:24
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => "Count: " + $capture0());
}
