// 18:10
($0, $1) => {
    const rows = $0()([]);
    const add = (row) => {
        rows.set([row]);
    };
    const label = (row) => {
        return row.label;
    };
    return (<div>
        <span onclick={() => add({ id: 1, label: "one" })}>add</span>
        <div>
          <$1 each={rows.get()}>{(row) => <span>{label(row)}</span>}</$1>
        </div>
      </div>);
}
