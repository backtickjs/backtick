// 8:28
() => {
    let n = 0;
    n = 1;
}

// 13:45
$0 => (id) => {
    $0();
}

// 21:5
$0 => {
    const handlers = {
        tap: $0(),
        hold: $0(),
    };
    return handlers;
}
