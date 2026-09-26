// 9:3
($splice0) => {
    return $splice0()(1)[0]();
}

// 13:17
($splice0) => (n) => $splice0()(n + 10)

// 19:5
($splice0, $splice1) => {
    return $splice0() + $splice1();
}
