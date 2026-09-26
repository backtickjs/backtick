// 20:10
($0, $1) => {
    const build = (from) => {
        return Array.from({ length: 3 }, (_, at) => {
            return { id: from + at, label: $0()("row " + (from + at)) };
        });
    };
    const held = $0()(build(1));
    return (<div>
        <ul class="rows">
          <$1 each={held[0]()}>
            {(row) => (<li onclick={() => row.label[1]("pressed")}>
                {row.label[0]()}
              </li>)}
          </$1>
        </ul>
      </div>);
}
