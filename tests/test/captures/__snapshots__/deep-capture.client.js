// 18:10
($splice0, $splice1) => {
    const outer = $splice0();
    return $splice1(outer);
}

// 20:14
($splice0, $capture1) => {
    const middle = 10;
    return middle + $splice0($capture1);
}

// 22:25
($capture0) => $capture0

// 28:40
($splice0, $splice1) => $splice0() + $splice1()

// 28:50
() => 1

// 28:67
() => 2
