// 14:10
($splice0, $splice1, $tag2) => {
    const selected = $splice0()(0);
    const isSelected = $splice1()(selected[0]);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        <div>
          <$tag2 each={[0, 1, 2]}>
            {(id) => (<a href={isSelected(id) ? "#open" : "#closed"}>{"row " + id}</a>)}
          </$tag2>
        </div>
      </div>);
}
