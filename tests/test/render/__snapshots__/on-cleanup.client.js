// 28:7
($0, $1) => {
    $0()(() => $1().console.log());
    return <p>drawn</p>;
}

// 40:7
($0, $1, $2, $3) => {
    const n = $0()(1);
    const doubled = $1()(() => {
        $2()(() => $3().console.log());
        return n[0]() * 2;
    });
    return (<button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>);
}

// 74:7
($0, $1, $2, $3) => {
    const timer = $0()(0);
    $1()(() => {
        timer[1]($2().setInterval(() => $2().console.log(), 5));
    });
    $3()(() => $2().clearInterval(timer[0]()));
    return <p>ticking</p>;
}

// 94:7
($0, $1) => {
    return (<button onclick={() => $0()(() => $1().console.log())}>
            press
          </button>);
}
