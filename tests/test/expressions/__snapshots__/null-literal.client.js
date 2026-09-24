// 7:58
() => (value) => {
    if (value === null) {
        return "-";
    }
    return value;
}

// 20:5
$0 => ({
    missing: $0()(null),
    present: $0()("hi"),
    bare: null,
})
