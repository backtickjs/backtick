// 7:10
($0) => {
    const base = 1;
    return base + $0();
}

// 14:10
($0) => {
    const base = 2;
    return base * $0();
}

// 28:5
($0) => {
    const base = 10;
    return $0(base);
}

// 30:26
($0) => $0
