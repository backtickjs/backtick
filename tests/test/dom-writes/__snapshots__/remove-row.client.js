// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);
    return (<table>
        <tbody>
          <$tag1 each={ids()}>
            {(id) => (<tr id={"row-" + id}>
                <td>
                  <button onclick={() => setIds(ids().filter((each) => each !== id))}>
                    {"remove " + id}
                  </button>
                </td>
              </tr>)}
          </$tag1>
        </tbody>
      </table>);
});
}
