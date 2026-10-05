// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [ids, setIds] = $splice0()([1, 2, 3]);
    const swap = () => {
        const held = ids();
        setIds(held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
        setIds(ids().filter((id) => id !== 2));
    };
    return (<div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          {($For => <$For each={ids()}>{(id) => <span>{"row " + id}</span>}</$For>)($splice1())}
        </div>
      </div>);
});
}
