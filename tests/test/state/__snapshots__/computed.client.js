// 25:7
($0, $1, $2) => {
    const n = $0()(1);
    const doubled = $1()(() => {
        $2().console.log();
        return n.get() * 2;
    });
    return (<div>
            <button onclick={() => n.set(n.get() + 1)}>add</button>
            <p>{"a " + doubled.get()}</p>
            <p>{"b " + doubled.get()}</p>
            <p>{"c " + doubled.get()}</p>
          </div>);
}

// 51:7
($0, $1, $2) => {
    const n = $0()(1);
    const isBig = $1()(() => n.get() > 2);
    const label = () => {
        $2().console.log();
        return isBig.get() ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n.set(n.get() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
}
