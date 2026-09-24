// 7:10
($0, $1) => {
    let total = 0;
    total = total + $0();
    total = total + $1();
    return total;
}

// 19:5
$0 => {
    const total = 1;
    return $0(total);
}

// 21:28
$0 => $0
