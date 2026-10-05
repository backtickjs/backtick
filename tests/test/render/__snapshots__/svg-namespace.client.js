// 17:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor"/>);
}

// 20:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const Dot = (props) => (<circle cx={props.x} cy="5" r="2">
      <title>{"dot " + props.x}</title>
    </circle>);
    return (<div>
      <a href="/shapes">{"shapes"}</a>
      <svg viewBox="0 0 30 10" width="120">
        {$splice0()}
        {($For => <$For each={[10, 20]}>{(x) => <Dot x={x}/>}</$For>)($splice1())}
        <foreignObject x="0" y="0" width="10" height="10">
          <p>{"html again"}</p>
        </foreignObject>
      </svg>
    </div>);
});
}
