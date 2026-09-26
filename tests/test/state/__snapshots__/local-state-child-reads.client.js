// 29:14
($splice0, $splice1) => "font-size: " + ($splice0()[0]() === $splice1() ? 20 : 16) + "px"

// 31:8
($splice0, $splice1) => "row " + $splice0() + " of " + $splice1()[0]()

// 33:6
($splice0, $splice1, $splice2) => $splice0()[0]() === $splice1() ? $splice2() : null

// 38:10
($splice0, $tag1) => {
    const selected = $splice0()(0);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        <$tag1 id={0} selected={selected}/>
        <$tag1 id={1} selected={selected}/>
      </div>);
}
