// 19:49
($splice0) => (c) => {
    return c === $splice0() ? "blue" : "red";
}

// 24:10
($splice0, $splice1, $splice2, $splice3) => {
    const held = $splice0()($splice1());
    return (<span onclick={() => held[1]($splice2())}>
        {$splice3()(held[0]())}
      </span>);
}
