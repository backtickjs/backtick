// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);
    const swap = () => {
        const held = ids();
        setIds(held.with(1, held[3]).with(3, held[1]));
    };
    return (<div>
        <button onclick={swap}>swap</button>
        <table>
          <tbody>
            {($For => <$For each={ids()}>
              {(id) => (<tr id={"row-" + id}>
                  <td>{"row " + id}</td>
                </tr>)}
            </$For>)($splice1())}
          </tbody>
        </table>
      </div>);
});
}
