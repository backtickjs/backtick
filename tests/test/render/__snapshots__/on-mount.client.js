// 28:7
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [count, setCount] = $splice0()(0);
    $splice1()(() => {
        window.console.log();
        setCount(count() + 1);
    });
    return <p>{"mounted " + count()}</p>;
});
}

// 45:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [said, setSaid] = $splice0()("not yet");
    return (<button onclick={() => $splice1()(() => setSaid("ran"))}>
              {said()}
            </button>);
});
}
