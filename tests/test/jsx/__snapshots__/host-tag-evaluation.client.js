// 10:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    throw new Error("boom");
    return (props) => <b>never</b>;
});
}

// 15:17
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const counter = globalThis;
    counter.evaluations = (counter.evaluations ?? 0) + 1;
    return (props) => <b>counted</b>;
});
}

// 21:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <p>{false ? ($Boom => <$Boom />)($splice0()) : "ok"}</p>);
}

// 22:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => <p>
  {($Counted => <$Counted />)($splice0())}
  {($Counted => <$Counted />)($splice0())}
</p>);
}
