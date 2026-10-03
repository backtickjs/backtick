// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [shown, setShown] = $splice0()(false);
    const started = window.setTimeout(() => {
        if ($splice1()()) {
            setShown(true);
        }
    }, 0);
    const read = shown();
    return <em>{"read " + read}</em>;
});
}

// 27:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [builds, setBuilds] = $splice0()(0);
    return (<div>
      <span>{"builds " + builds()}</span>
      <section>{$splice1(builds, setBuilds)}</section>
    </div>);
});
}

// 35:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0, $capture1) => () => {
    $capture0($capture1() + 1);
    return $capture1() < 5;
});
}
