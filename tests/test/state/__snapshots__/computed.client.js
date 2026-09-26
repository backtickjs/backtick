// 26:7
export default ($0, $1, $2) => {
    const n = $0()(1);
    const doubled = $1()(() => {
        $2().console.log();
        return n[0]() * 2;
    });
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{"a " + doubled()}</p>
            <p>{"b " + doubled()}</p>
            <p>{"c " + doubled()}</p>
          </div>);
};

// 52:7
export default ($0, $1, $2) => {
    const n = $0()(1);
    const isBig = $1()(() => n[0]() > 2);
    const label = () => {
        $2().console.log();
        return isBig() ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
};
