// 20:10
($splice0, $tag1) => {
    const build = (from) => {
        return Array.from({ length: 3 }, (_, at) => {
            return { id: from + at, label: $splice0()("row " + (from + at)) };
        });
    };
    const held = $splice0()(build(1));
    return (<div>
        <ul class="rows">
          <$tag1 each={held[0]()}>
            {(row) => (<li onclick={() => row.label[1]("pressed")}>
                {row.label[0]()}
              </li>)}
          </$tag1>
        </ul>
      </div>);
}
