// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
    const ids = $splice0()([1, 2, 3]);
    const swap = () => {
        const held = ids[0]();
        ids[1](held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
        ids[1](ids[0]().filter((id) => id !== 2));
    };
    return (<div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          <$tag1 each={ids[0]()}>
            {(id) => <span>{"row " + id}</span>}
          </$tag1>
        </div>
      </div>);
});
}
