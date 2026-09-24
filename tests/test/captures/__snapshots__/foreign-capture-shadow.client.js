// 18:10
$0 => {
    const base = 100;
    return $0(base);
}

// 20:14
($0, $1) => $1 + $0($1)

// 28:5
$0 => {
    const base = 1;
    return $0(base);
}

// 30:26
$0 => $0
