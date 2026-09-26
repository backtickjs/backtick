// 29:9
export default ($0, $1, $2) => {
    const count = $0()(0);
    $1()(() => {
        $2().console.log();
        count[1](count[0]() + 1);
    });
    return <p>{"mounted " + count[0]()}</p>;
};

// 45:7
export default ($0, $1) => {
    const said = $0()("not yet");
    return (<button onclick={() => $1()(() => said[1]("ran"))}>
            {said[0]()}
          </button>);
};
