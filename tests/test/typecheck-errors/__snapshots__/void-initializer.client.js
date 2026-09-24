// 5:14
() => () => {
    let n = 0;
    n = 1;
}

// 10:16
$0 => {
    const x = $0()();
    return 1;
}

// 15:16
$0 => {
    const x = $0()();
}

// 21:15
() => (text) => {
    return text;
}

// 25:23
$0 => {
    const x = $0()(true);
    return 1;
}
