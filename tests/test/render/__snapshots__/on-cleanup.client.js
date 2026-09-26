// 28:7
($splice0, $splice1) => {
    $splice0()(() => $splice1().console.log());
    return <p>drawn</p>;
}

// 40:7
($splice0, $splice1, $splice2, $splice3) => {
    const n = $splice0()(1);
    const doubled = $splice1()(() => {
        $splice2()(() => $splice3().console.log());
        return n[0]() * 2;
    });
    return (<button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>);
}

// 74:7
($splice0, $splice1, $splice2, $splice3) => {
    const timer = $splice0()(0);
    $splice1()(() => {
        timer[1]($splice2().setInterval(() => $splice2().console.log(), 5));
    });
    $splice3()(() => $splice2().clearInterval(timer[0]()));
    return <p>ticking</p>;
}

// 94:7
($splice0, $splice1) => {
    return (<button onclick={() => $splice0()(() => $splice1().console.log())}>
            press
          </button>);
}
