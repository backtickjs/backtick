// 5:14
() => () => {
    let n = 0;
    n = 1;
}

// 10:16
($splice0) => {
    const x = $splice0()();
    return 1;
}

// 15:16
($splice0) => {
    const x = $splice0()();
}

// 21:15
() => (text) => {
    return text;
}

// 25:23
($splice0) => {
    const x = $splice0()(true);
    return 1;
}
