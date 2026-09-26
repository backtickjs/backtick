// 13:10
($0, $1) => {
    const ids = $0()([1, 2, 3, 4, 5]);
    const swap = () => {
        const held = ids[0]();
        ids[1](held.with(1, held[3]).with(3, held[1]));
    };
    return (<div>
        <button onclick={swap}>swap</button>
        <table>
          <tbody>
            <$1 each={ids[0]()}>
              {(id) => (<tr id={"row-" + id}>
                  <td>{"row " + id}</td>
                </tr>)}
            </$1>
          </tbody>
        </table>
      </div>);
}
