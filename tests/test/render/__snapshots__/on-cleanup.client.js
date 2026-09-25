// 27:7
export default ($0, $1) => {
    $0()(() => $1().console.log());
    return <p>drawn</p>;
};

// 39:7
export default ($0, $1, $2, $3) => {
    const n = $0()(1);
    const doubled = $1()(() => {
        $2()(() => $3().console.log());
        return n.get() * 2;
    });
    return (<button onclick={() => n.set(n.get() + 1)}>{doubled.get()}</button>);
};

// 73:7
export default ($0, $1, $2, $3) => {
    const timer = $0()(0);
    $1()(() => {
        timer.set($2().setInterval(() => $2().console.log(), 5));
    });
    $3()(() => $2().clearInterval(timer.get()));
    return <p>ticking</p>;
};

// 93:7
export default ($0, $1) => {
    return (<button onclick={() => $0()(() => $1().console.log())}>
            press
          </button>);
};
