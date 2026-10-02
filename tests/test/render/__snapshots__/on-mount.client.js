// 28:7
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const count = $splice0()(0);
    $splice1()(() => {
        window.console.log();
        count[1](count[0]() + 1);
    });
    return <p>{"mounted " + count[0]()}</p>;
});
}

// 45:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const said = $splice0()("not yet");
    return (<button onclick={() => $splice1()(() => said[1]("ran"))}>
              {said[0]()}
            </button>);
});
}
