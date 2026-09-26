// 34:7
($0, $1) => {
    const total = 1;
    const first = $0(total);
    {
        const total = 2;
        return first + total + $1();
    }
}

// 36:30
($0) => $0
