// 7:42
() => {
    const x = 1;
}

// 11:34
() => () => {
    let n = 0;
    n = 1;
}

// 20:5
($splice0, $splice1) => (b) => {
    let n = 0;
    $splice0();
    if (b) {
        $splice1()();
        n = 1;
    }
    return n;
}
