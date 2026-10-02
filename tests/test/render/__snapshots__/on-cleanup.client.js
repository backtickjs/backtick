// 35:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    $splice0()(() => window.console.log());
    return <p>drawn</p>;
});
}

// 49:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => () => {
    const n = $splice0()(1);
    const doubled = $splice1()(() => {
        $splice2()(() => window.console.log());
        return n[0]() * 2;
    });
    return <button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>;
});
}

// 83:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => () => {
    const timer = $splice0()(0);
    $splice1()(() => {
        timer[1](window.setInterval(() => window.console.log(), 5));
    });
    $splice2()(() => window.clearInterval(timer[0]()));
    return <p>ticking</p>;
});
}

// 105:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    return (<button onclick={() => $splice0()(() => window.console.log())}>
              press
            </button>);
});
}
