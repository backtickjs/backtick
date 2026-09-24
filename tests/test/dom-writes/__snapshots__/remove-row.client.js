// 12:10
($0, $1) => {
    const ids = $0()([1, 2, 3, 4, 5]);
    return (<table>
        <tbody>
          <$1 each={ids.get()}>
            {(id) => (<tr id={"row-" + id}>
                <td>
                  <button onclick={() => ids.set(ids.get().filter((each) => each !== id))}>
                    {"remove " + id}
                  </button>
                </td>
              </tr>)}
          </$1>
        </tbody>
      </table>);
}
