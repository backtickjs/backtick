// 7:14
() => (n) => {
    return n === null ? 0 : n + 1;
}

// 15:5
($splice0) => ({
    absent: $splice0()(null),
    present: $splice0()(4),
})
