// 28:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [n, setN] = $splice0()(1);
    const doubled = $splice1()(() => {
        window.console.log();
        return n() * 2;
    });
    return (<div>
              <button onclick={() => setN(n() + 1)}>add</button>
              <p>{"a " + doubled()}</p>
              <p>{"b " + doubled()}</p>
              <p>{"c " + doubled()}</p>
            </div>);
});
}

// 56:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [n, setN] = $splice0()(1);
    const isBig = $splice1()(() => n() > 2);
    const label = () => {
        window.console.log();
        return isBig() ? "big" : "small";
    };
    return (<div>
              <button onclick={() => setN(n() + 1)}>add</button>
              <p>{label()}</p>
            </div>);
});
}
