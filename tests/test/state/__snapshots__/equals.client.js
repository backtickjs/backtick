// 27:7
export default ($0, $1, $2) => {
    const n = $0()(1);
    const size = $1()(() => ({ isBig: n.get() > 2, n: n.get() }), {
        equals: (previous, next) => previous.isBig === next.isBig,
    });
    const label = () => {
        $2().console.log();
        return size.get().isBig ? "big" : "small";
    };
    return (<div>
            <button onclick={() => n.set(n.get() + 1)}>add</button>
            <p>{label()}</p>
          </div>);
};

// 57:7
export default ($0, $1) => {
    const point = $0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });
    const label = () => {
        $1().console.log();
        return "x " + point.get().x;
    };
    return (<div>
            <button onclick={() => point.set({ x: point.get().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
};

// 82:7
export default ($0, $1) => {
    const n = $0()(1, {
        equals: (previous, next) => {
            $1().console.log(previous, next);
            return previous === next;
        },
    });
    return <button onclick={() => n.set(2)}>{"n " + n.get()}</button>;
};

// 99:7
export default ($0, $1) => {
    const n = $0()(1);
    const label = () => {
        $1().console.log();
        return "n " + n.get();
    };
    return (<div>
            <button onclick={() => n.set(1)}>same</button>
            <p>{label()}</p>
          </div>);
};

// 119:7
export default ($0, $1) => {
    const point = $0()({ x: 1 });
    const label = () => {
        $1().console.log();
        return "x " + point.get().x;
    };
    return (<div>
            <button onclick={() => point.set({ x: point.get().x })}>
              same
            </button>
            <p>{label()}</p>
          </div>);
};
