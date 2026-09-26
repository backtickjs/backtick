// 11:36
() => () => "hi"

// 17:5
($0) => {
    const stored = $0();
    const caught = $0()();
    return 1;
}
