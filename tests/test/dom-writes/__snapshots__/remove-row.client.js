// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);
    return (<table>
        <tbody>
          {($For => <$For each={ids()}>
            {(id) => (<tr id={"row-" + id}>
                <td>
                  <button onclick={() => setIds(ids().filter((each) => each !== id))}>
                    {"remove " + id}
                  </button>
                </td>
              </tr>)}
          </$For>)($splice1())}
        </tbody>
      </table>);
});
}
