// 28:9
export default ($0, $1, $2) => {
    const count = $0()(0);
    $1()(() => {
        $2().console.log();
        count.set(count.get() + 1);
    });
    return <p>{"mounted " + count.get()}</p>;
};

// 44:7
export default ($0, $1) => {
    const said = $0()("not yet");
    return (<button onclick={() => $1()(() => said.set("ran"))}>
            {said.get()}
          </button>);
};
