// 19:10
($splice0, $tag1) => {
    const rows = $splice0()([]);
    const add = (row) => {
        rows[1]([row]);
    };
    const label = (row) => {
        return row.label;
    };
    return (<div>
        <span onclick={() => add({ id: 1, label: "one" })}>add</span>
        <div>
          <$tag1 each={rows[0]()}>{(row) => <span>{label(row)}</span>}</$tag1>
        </div>
      </div>);
}
