// 9:17
export default ($0) => (initial) => {
    const count = $0()(initial);
    return {
        get: () => count.get(),
        add: (n) => {
            count.set(count.get() + n);
        },
    };
};

// 23:5
export default ($0) => {
    const c = $0()(10);
    return (<button onclick={() => {
            c.add(5);
        }}>
          {c.get()}
        </button>);
};
