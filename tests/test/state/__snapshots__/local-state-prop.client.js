// 17:12
($splice0) => "font-size: " + $splice0()[0]() + "px"

// 18:14
($splice0) => () => {
    $splice0()[1]($splice0()[0]() + 1);
}

// 27:10
($splice0, $splice1, $splice2) => {
    const size = $splice0()(16);
    return (<div>
        {$splice1(size)}
        {$splice2(size)}
      </div>);
}

// 31:33
($capture0) => $capture0

// 32:33
($capture0) => $capture0
