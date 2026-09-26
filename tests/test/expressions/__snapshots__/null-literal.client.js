// 7:58
() => (value) => {
    if (value === null) {
        return "-";
    }
    return value;
}

// 20:5
($splice0) => ({
    missing: $splice0()(null),
    present: $splice0()("hi"),
    bare: null,
})
