// 8:14
export default () => (p) => {
    return p?.x;
};

// 12:14
export default () => (o) => {
    return o?.inner?.z;
};

// 16:15
export default () => (s) => {
    return s?.concat("!");
};

// 24:5
export default ($0, $1, $2) => ({
    found: $0()({ x: 5 }),
    missing: $0()(null),
    deep: $1()({ inner: { z: 7 } }),
    cut: $1()({ inner: null }),
    top: $1()(null),
    loud: $2()("hi"),
    silent: $2()(null),
});
