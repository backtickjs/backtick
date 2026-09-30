// 27:9
($splice0, $splice1) => () => {
    const n = $splice0()(1);
    const doubled = $splice1()(() => {
        window.console.log();
        return n[0]() * 2;
    });
    return (<div>
              <button onclick={() => n[1](n[0]() + 1)}>add</button>
              <p>{"a " + doubled()}</p>
              <p>{"b " + doubled()}</p>
              <p>{"c " + doubled()}</p>
            </div>);
}

// 55:9
($splice0, $splice1) => () => {
    const n = $splice0()(1);
    const isBig = $splice1()(() => n[0]() > 2);
    const label = () => {
        window.console.log();
        return isBig() ? "big" : "small";
    };
    return (<div>
              <button onclick={() => n[1](n[0]() + 1)}>add</button>
              <p>{label()}</p>
            </div>);
}
