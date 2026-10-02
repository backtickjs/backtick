// 16:3
($splice0) => <span style={"font-size: " + $splice0()[0]() + "px"} onclick={() => {
        $splice0()[1]($splice0()[0]() + 1);
    }}>
    press
  </span>

// 26:10
($splice0, $splice1, $splice2) => {
    const size = $splice0()(16);
    return (<div>
        {$splice1(size)}
        {$splice2(size)}
      </div>);
}

// 30:34
($capture0) => $capture0

// 31:34
($capture0) => $capture0
