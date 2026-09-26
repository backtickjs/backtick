// 7:14
() => (n) => {
    return n === null ? 0 : n + 1;
}

// 15:5
($0) => ({
    absent: $0()(null),
    present: $0()(4),
})
