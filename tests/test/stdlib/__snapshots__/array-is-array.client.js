// 11:5
() => {
    return [
        Array.isArray([]),
        Array.isArray([1, 2]),
        Array.isArray("ab"),
        Array.isArray({ length: 0 }),
        Array.isArray(null),
    ];
}
