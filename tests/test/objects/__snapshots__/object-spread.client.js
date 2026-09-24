// 17:5
() => {
    const base = { a: 1, b: 2 };
    const over = { b: 9 };
    return {
        ...base,
        ...over,
        c: 3,
    };
}
