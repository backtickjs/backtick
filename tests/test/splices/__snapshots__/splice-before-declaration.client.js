// 16:10
($splice0) => {
    const before = 1;
    const spliced = $splice0();
    const after = 2;
    return before + spliced + after;
}

// 28:5
($splice0, $splice1) => $splice0() + $splice1()

// 28:19
() => 10

// 28:41
() => 20
