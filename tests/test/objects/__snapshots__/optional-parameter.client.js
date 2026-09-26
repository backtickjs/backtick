// 8:15
() => (name) => {
    return name?.concat("!");
}

// 14:16
() => () => 2

// 16:21
() => (cb) => {
    return cb?.() ?? 0;
}

// 24:5
($splice0, $splice1, $splice2) => ({
    named: $splice0()("hi"),
    explicit: $splice0()(undefined),
    omitted: $splice0()(),
    supplied: $splice1()($splice2()),
    fallback: $splice1()(undefined),
    omittedCallback: $splice1()(),
})
