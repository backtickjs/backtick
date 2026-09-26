// 28:9
($splice0, $splice1) => {
    const count = $splice0()(0);
    $splice1()(() => {
        window.console.log();
        count[1](count[0]() + 1);
    });
    return <p>{"mounted " + count[0]()}</p>;
}

// 44:7
($splice0, $splice1) => {
    const said = $splice0()("not yet");
    return (<button onclick={() => $splice1()(() => said[1]("ran"))}>
            {said[0]()}
          </button>);
}
