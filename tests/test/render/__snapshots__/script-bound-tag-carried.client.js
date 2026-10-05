// 15:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const Badge = (p) => <i>{"panel " + p.n}</i>;
    return (<section>
        <Badge n={0}/>
        {$splice0().body}
      </section>);
});
}

// 30:31
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [count, setCount] = $splice0()(0);
    const Badge = (p) => (<b>
      {"outer " + p.n}
      {p.children}
    </b>);
    return (<div>
      {$splice1(count, Badge)}
      <button onclick={() => setCount(count() + 1)}>more</button>
    </div>);
});
}

// 44:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0, $capture1) => (<$capture0 n={$capture1()}>
                <u>{"kid " + $capture1()}</u>
              </$capture0>));
}
