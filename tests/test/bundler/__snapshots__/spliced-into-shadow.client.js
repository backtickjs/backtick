// 32:17
($0, $1) => {
    const total = 1;
    const first = $0(total);
    {
        const total = 2;
        return first + total + $1();
    }
}

// 34:28
$0 => $0
