// 27:7
($splice0, $splice1) => {
    const n = $splice0()(1);
    const size = $splice1()(() => ({ isBig: n[0]() > 2, n: n[0]() }), undefined, { equals: (previous, next) => previous.isBig === next.isBig });
    const label = () => {
        window.console.log();
        return size().isBig ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
}

// 59:7
($splice0) => {
    const point = $splice0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });
    const label = () => {
        window.console.log();
        return "x " + point[0]().x;
    };
    return (<div>
            <button onclick={() => point[1]({ x: point[0]().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
}

// 84:7
($splice0) => {
    const n = $splice0()(1, {
        equals: (previous, next) => {
            window.console.log(previous, next);
            return previous === next;
        },
    });
    return <button onclick={() => n[1](2)}>{"n " + n[0]()}</button>;
}

// 101:7
($splice0) => {
    const n = $splice0()(1);
    const label = () => {
        window.console.log();
        return "n " + n[0]();
    };
    return (<div>
            <button onclick={() => n[1](1)}>same</button>
            <p>{label()}</p>
          </div>);
}

// 121:7
($splice0) => {
    const point = $splice0()({ x: 1 });
    const label = () => {
        window.console.log();
        return "x " + point[0]().x;
    };
    return (<div>
            <button onclick={() => point[1]({ x: point[0]().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
}
