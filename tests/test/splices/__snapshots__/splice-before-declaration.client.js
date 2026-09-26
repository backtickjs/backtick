// 16:10
($0) => {
    const before = 1;
    const spliced = $0();
    const after = 2;
    return before + spliced + after;
}

// 28:5
($0, $1) => $0() + $1()

// 28:19
() => 10

// 28:41
() => 20
