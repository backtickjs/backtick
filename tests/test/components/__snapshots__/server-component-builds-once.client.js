// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const shown = $splice0()(false);
    const started = window.setTimeout(() => {
        if ($splice1()()) {
            shown[1](true);
        }
    }, 0);
    const read = shown[0]();
    return <em>{"read " + read}</em>;
});
}

// 27:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const builds = $splice0()(0);
    return (<div>
      <span>{"builds " + builds[0]()}</span>
      <section>{$splice1(builds)}</section>
    </div>);
});
}

// 35:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => () => {
    $capture0[1]($capture0[0]() + 1);
    return $capture0[0]() < 5;
});
}
