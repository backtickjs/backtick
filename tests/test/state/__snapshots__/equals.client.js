// 28:7
($splice0, $splice1, $splice2) => {
    const n = $splice0()(1);
    const size = $splice1()(() => ({ isBig: n[0]() > 2, n: n[0]() }), undefined, { equals: (previous, next) => previous.isBig === next.isBig });
    const label = () => {
        $splice2().console.log();
        return size().isBig ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n[1](n[0]() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
}

// 60:7
($splice0, $splice1) => {
    const point = $splice0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });
    const label = () => {
        $splice1().console.log();
        return "x " + point[0]().x;
    };
    return (<div>
            <button onclick={() => point[1]({ x: point[0]().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
}

// 85:7
($splice0, $splice1) => {
    const n = $splice0()(1, {
        equals: (previous, next) => {
            $splice1().console.log(previous, next);
            return previous === next;
        },
    });
    return <button onclick={() => n[1](2)}>{"n " + n[0]()}</button>;
}

// 102:7
($splice0, $splice1) => {
    const n = $splice0()(1);
    const label = () => {
        $splice1().console.log();
        return "n " + n[0]();
    };
    return (<div>
            <button onclick={() => n[1](1)}>same</button>
            <p>{label()}</p>
          </div>);
}

// 122:7
($splice0, $splice1) => {
    const point = $splice0()({ x: 1 });
    const label = () => {
        $splice1().console.log();
        return "x " + point[0]().x;
    };
    return (<div>
            <button onclick={() => point[1]({ x: point[0]().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
}
