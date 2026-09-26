// 8:14
() => (p) => {
    return p?.x;
}

// 12:14
() => (o) => {
    return o?.inner?.z;
}

// 16:15
() => (s) => {
    return s?.concat("!");
}

// 24:5
($splice0, $splice1, $splice2) => ({
    found: $splice0()({ x: 5 }),
    missing: $splice0()(null),
    deep: $splice1()({ inner: { z: 7 } }),
    cut: $splice1()({ inner: null }),
    top: $splice1()(null),
    loud: $splice2()("hi"),
    silent: $splice2()(null),
})
