// 28:18
($splice0, $splice1) => "font-size: " + ($splice0()[0]() === $splice1() ? 20 : 16) + "px"

// 29:8
($splice0, $splice1) => "row " + $splice0() + " of " + $splice1()[0]()

// 31:6
($splice0, $splice1, $splice2) => $splice0()[0]() === $splice1() ? $splice2() : null

// 36:10
($splice0, $splice1, $splice2) => {
    const selected = $splice0()(0);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        {$splice1(selected)}
        {$splice2(selected)}
      </div>);
}

// 41:29
() => 0

// 41:46
($capture0) => $capture0

// 42:29
() => 1

// 42:46
($capture0) => $capture0
