// 7:10
($splice0, $splice1) => {
    let total = 0;
    total = total + $splice0();
    total = total + $splice1();
    return total;
}

// 19:5
($splice0) => {
    const total = 1;
    return $splice0(total);
}

// 21:28
($capture0) => $capture0
