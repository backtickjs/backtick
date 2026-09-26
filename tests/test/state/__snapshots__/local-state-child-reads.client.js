// 29:14
export default ($0, $1) => "font-size: " + ($0()[0]() === $1() ? 20 : 16) + "px";

// 31:8
export default ($0, $1) => "row " + $0() + " of " + $1()[0]();

// 33:6
export default ($0, $1, $2) => $0()[0]() === $1() ? $2() : null;

// 38:10
export default ($0, $1) => {
    const selected = $0()(0);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        <$1 id={0} selected={selected}/>
        <$1 id={1} selected={selected}/>
      </div>);
};
