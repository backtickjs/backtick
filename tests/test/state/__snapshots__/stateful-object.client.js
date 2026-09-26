// 10:17
($0) => (initial) => {
    const count = $0()(initial);
    return {
        get: () => count[0](),
        add: (n) => {
            count[1](count[0]() + n);
        },
    };
}

// 24:5
($0) => {
    const c = $0()(10);
    return (<button onclick={() => {
            c.add(5);
        }}>
          {c.get()}
        </button>);
}
