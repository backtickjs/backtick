// 13:23
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [count, setCount] = $splice0()(0);
    return (<button onclick={() => setCount(count() + 1)}>{"child " + count()}</button>);
});
}

// 21:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (<section>
      <h2>{$splice0()}</h2>
      {($CounterButton => <$CounterButton />)($splice1())}
    </section>));
}

// 29:16
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [count, setCount] = $splice0()(0);
    return (<div>
      <button onclick={() => setCount(count() + 1)}>
        {"parent " + count()}
      </button>
      {$splice1(count)}
    </div>);
});
}

// 36:27
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => "Section " + $capture0());
}
