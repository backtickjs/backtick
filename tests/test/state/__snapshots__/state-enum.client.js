// 18:49
$0 => (c) => {
    return c === $0() ? "blue" : "red";
}

// 23:10
($0, $1, $2, $3) => {
    const held = $0()($1());
    return (<span onclick={() => held.set($2())}>
        {$3()(held.get())}
      </span>);
}
