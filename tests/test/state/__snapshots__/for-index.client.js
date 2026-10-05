// 16:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [names, setNames] = $splice0()(["a", "b", "c"]);
    const rotate = () => {
        const held = names();
        setNames([held[2], held[0], held[1]]);
    };
    return (<div>
        <span onclick={rotate}>rotate</span>
        <div>
          {($For => <$For each={names()}>
            {(name, index) => (<span>{name + " at " + index()}</span>)}
          </$For>)($splice1())}
        </div>
      </div>);
});
}
