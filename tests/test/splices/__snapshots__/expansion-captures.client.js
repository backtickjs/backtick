// 14:16
() => [1, 2]

// 15:31
($splice0, $splice1) => <li>{$splice0()} {$splice1()}</li>

// 21:54
($splice0) => $splice0()("row")

// 30:5
($splice0) => {
    const base = 10;
    const add = $splice0(base);
    return add(1) + add(2);
}

// 32:44
($splice0, $capture1) => $capture1 + $splice0($capture1)
