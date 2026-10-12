// 13:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(0));
}

// 15:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => <span>{"count " + $splice0()[0]()}</span>);
}

// 16:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => (<button onclick={() => $splice0()[1]($splice1()[0]() + 1)}>bump</button>));
}

// 20:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => (<div>
    {($Shown => <$Shown />)($splice0())}
    {($Shown => <$Shown />)($splice1())}
    {($Bump => <$Bump />)($splice2())}
  </div>));
}

// 31:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => $splice0()(() => {
    const pair = [$splice1(), $splice2()];
    return pair[0] === pair[1];
}));
}
