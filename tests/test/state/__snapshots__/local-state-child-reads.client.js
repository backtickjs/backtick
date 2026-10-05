// 26:7
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (<div>
    <span style={"font-size: " + ($splice0()[0]() === $splice1() ? 20 : 16) + "px"}>
      {"row " + $splice1() + " of " + $splice0()[0]()}
    </span>
    {$splice0()[0]() === $splice1() ? <span>marker</span> : null}
  </div>));
}

// 36:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => {
    const selected = $splice0()(0);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        {$splice1(selected)}
        {$splice2(selected)}
      </div>);
});
}

// 41:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => 0);
}

// 41:46
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => $capture0);
}

// 42:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => 1);
}

// 42:46
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => $capture0);
}
