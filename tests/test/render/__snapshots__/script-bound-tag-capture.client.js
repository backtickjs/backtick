// 13:31
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2, $splice3, $splice4) => {
    const count = $splice0()(0);
    const Badge = (props) => <b>{"n " + props.n}</b>;
    return (<div>
      {$splice1(count, Badge)}
      {$splice2(count, Badge)}
      {$splice3(count, Badge)}
      {$splice4(count, Badge)}
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
});
}

// 19:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0, $capture1) => <$capture0 n={$capture1[0]()}/>);
}

// 21:11
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $capture1, $capture2) => {
    const skipped = 10;
    return $splice0($capture1, $capture2);
});
}

// 23:20
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0, $capture1) => <$capture0 n={$capture1[0]() + 100}/>);
}

// 26:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $capture1, $capture2) => <section>{$splice0($capture1, $capture2)}</section>);
}

// 26:25
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0, $capture1) => <$capture0 n={$capture1[0]() + 1000}/>);
}

// 28:11
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $capture1, $capture2) => <$tag0 each={[1, 2]}>
          {(m) => <$capture1 n={m * $capture2[0]()}/>}
        </$tag0>);
}
