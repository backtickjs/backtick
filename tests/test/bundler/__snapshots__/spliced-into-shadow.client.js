// 34:7
($splice0, $splice1) => {
    const total = 1;
    const first = $splice0(total);
    {
        const total = 2;
        return first + total + $splice1();
    }
}

// 36:30
($capture0) => $capture0
