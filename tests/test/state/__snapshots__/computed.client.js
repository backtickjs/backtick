// 26:7
($splice0, $splice1, $splice2) => {
    const n = $splice0()(1);
    const doubled = $splice1()(() => {
        $splice2().console.log();
        return n[0]() * 2;
    });
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{"a " + doubled()}</p>
            <p>{"b " + doubled()}</p>
            <p>{"c " + doubled()}</p>
          </div>);
}

// 52:7
($splice0, $splice1, $splice2) => {
    const n = $splice0()(1);
    const isBig = $splice1()(() => n[0]() > 2);
    const label = () => {
        $splice2().console.log();
        return isBig() ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
}
