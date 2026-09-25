// 11:5
export default ($0) => {
    const count = $0()(0);
    return [
        typeof undefined,
        typeof null,
        typeof true,
        typeof 1,
        typeof "a",
        typeof [1],
        typeof { a: 1 },
        typeof ((n) => n),
        typeof Math.floor,
        typeof count,
    ];
};

// 34:5
export default () => {
    const measure = (v) => typeof v === "string" ? v.length : v * 2;
    return [measure("abc"), measure(4)];
};
