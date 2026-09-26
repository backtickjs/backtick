// 17:10
($splice0, $splice1) => {
    const outer = $splice0();
    return $splice1(outer);
}

// 19:18
($splice0, $capture1) => {
    const middle = 10;
    return middle + $splice0($capture1);
}

// 21:30
($capture0) => $capture0

// 27:10
($splice0) => $splice0() + 1

// 38:5
($splice0, $splice1) => $splice0() + $splice1()

// 38:15
() => 1

// 38:32
() => 2
