// 14:10
($splice0, $tag1) => {
    const ids = $splice0()([1, 2, 3, 4, 5]);
    const swap = () => {
        const held = ids[0]();
        ids[1](held.with(1, held[3]).with(3, held[1]));
    };
    return (<div>
        <button onclick={swap}>swap</button>
        <table>
          <tbody>
            <$tag1 each={ids[0]()}>
              {(id) => (<tr id={"row-" + id}>
                  <td>{"row " + id}</td>
                </tr>)}
            </$tag1>
          </tbody>
        </table>
      </div>);
}
