// 15:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const rows = [1, 2, 3, 4].map((id) => ({
        id: id,
        label: $splice0()("row " + id),
    }));
    const update = () => {
        for (let index = 0; index < rows.length; index = index + 2) {
            const label = rows[index].label;
            label[1](label[0]() + " !!!");
        }
    };
    return (<div>
        <button onclick={update}>update</button>
        <table>
          <tbody>
            {($For => <$For each={rows}>
              {(row) => (<tr id={"row-" + row.id}>
                  <td>{row.label[0]()}</td>
                </tr>)}
            </$For>)($splice1())}
          </tbody>
        </table>
      </div>);
});
}
