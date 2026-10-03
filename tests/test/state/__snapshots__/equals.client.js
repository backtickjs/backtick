// 30:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => () => {
    const [n, setN] = $splice0()(1);
    const size = $splice1()(() => ({ isBig: n() > 2, n: n() }), undefined, { equals: (previous, next) => previous.isBig === next.isBig });
    const label = () => {
        window.console.log();
        return size().isBig ? "big" : "small";
    };
    return (<div>
              <button onclick={() => setN(n() + 1)}>add</button>
              <p>{label()}</p>
            </div>);
});
}

// 64:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [point, setPoint] = $splice0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });
    const label = () => {
        window.console.log();
        return "x " + point().x;
    };
    return (<div>
              <button onclick={() => setPoint({ x: point().x })}>same</button>
              <p>{label()}</p>
            </div>);
});
}

// 89:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [n, setN] = $splice0()(1, {
        equals: (previous, next) => {
            window.console.log(previous, next);
            return previous === next;
        },
    });
    return <button onclick={() => setN(2)}>{"n " + n()}</button>;
});
}

// 108:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [n, setN] = $splice0()(1);
    const label = () => {
        window.console.log();
        return "n " + n();
    };
    return (<div>
              <button onclick={() => setN(1)}>same</button>
              <p>{label()}</p>
            </div>);
});
}

// 130:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [point, setPoint] = $splice0()({ x: 1 });
    const label = () => {
        window.console.log();
        return "x " + point().x;
    };
    return (<div>
              <button onclick={() => setPoint({ x: point().x })}>same</button>
              <p>{label()}</p>
            </div>);
});
}
