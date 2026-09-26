// 12:5
($splice0) => {
    const count = $splice0()(0);
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
}

// 35:5
() => {
    const measure = (v) => typeof v === "string" ? v.length : v * 2;
    return [measure("abc"), measure(4)];
}
