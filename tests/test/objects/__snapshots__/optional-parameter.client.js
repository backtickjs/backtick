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
($0, $1, $2) => ({
    named: $0()("hi"),
    explicit: $0()(undefined),
    omitted: $0()(),
    supplied: $1()($2()),
    fallback: $1()(undefined),
    omittedCallback: $1()(),
})
