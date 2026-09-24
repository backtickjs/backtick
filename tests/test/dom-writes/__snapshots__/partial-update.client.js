// 12:10
($0, $1) => {
    const rows = [1, 2, 3, 4].map((id) => ({
        id: id,
        label: $0()("row " + id),
    }));
    const update = () => {
        for (let index = 0; index < rows.length; index = index + 2) {
            const label = rows[index].label;
            label.set(label.get() + " !!!");
        }
    };
    return (<div>
        <button onclick={update}>update</button>
        <table>
          <tbody>
            <$1 each={rows}>
              {(row) => (<tr id={"row-" + row.id}>
                  <td>{row.label.get()}</td>
                </tr>)}
            </$1>
          </tbody>
        </table>
      </div>);
}
