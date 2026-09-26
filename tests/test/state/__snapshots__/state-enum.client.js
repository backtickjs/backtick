// 19:49
export default ($0) => (c) => {
    return c === $0() ? "blue" : "red";
};

// 24:10
export default ($0, $1, $2, $3) => {
    const held = $0()($1());
    return (<span onclick={() => held[1]($2())}>
        {$3()(held[0]())}
      </span>);
};
