// 14:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [field, setField] = $splice0()(null);
    return (<div>
              <input aria-label="name" ref={(element) => setField(element)}/>
              <button onclick={() => field()?.focus()}>edit</button>
            </div>);
});
}

// 34:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    return (<input aria-label="name" ref={(element) => $splice0()(() => element.focus())}/>);
});
}

// 49:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => () => <input aria-label="name" ref={() => { }}/>);
}

// 73:11
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [shown, setShown] = $splice0()(true);
    const [n, setN] = $splice1()(0);
    return (<div>
                <button onclick={() => setN(n() + 1)}>{"n " + n()}</button>
                {shown() ? (<p ref={() => window.console.log(n())}>shown</p>) : null}
              </div>);
});
}
