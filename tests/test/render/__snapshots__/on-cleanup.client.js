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
    const [n, setN] = $splice0()(1);
    const doubled = $splice1()(() => {
        $splice2()(() => window.console.log());
        return n() * 2;
    });
    return <button onclick={() => setN(n() + 1)}>{doubled()}</button>;
});
}

// 83:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => () => {
    const [timer, setTimer] = $splice0()(0);
    $splice1()(() => {
        setTimer(window.setInterval(() => window.console.log(), 5));
    });
    $splice2()(() => window.clearInterval(timer()));
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
