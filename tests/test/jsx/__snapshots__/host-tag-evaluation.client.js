// 10:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => {
    throw new Error("boom");
});
}

// 14:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const counter = globalThis;
    counter.evaluations = (counter.evaluations ?? 0) + 1;
    return (props) => <b>counted</b>;
});
}

// 20:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <p>{false ? ($Boom => <$Boom />)($splice0()) : "ok"}</p>);
}

// 21:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (<p>
    {($Counted => <$Counted />)($splice0())}
    {($Counted => <$Counted />)($splice1())}
  </p>));
}
