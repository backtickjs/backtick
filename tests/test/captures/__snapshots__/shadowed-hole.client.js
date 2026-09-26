// 15:10
($splice0) => {
    const total = 1;
    {
        const total = 2;
        return total + $splice0();
    }
}

// 28:5
($splice0, $splice1) => $splice0() + $splice1()

// 28:23
() => 10

// 28:49
() => 20
