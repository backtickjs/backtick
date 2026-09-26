// 12:5
($splice0) => {
    const counter = { count: 0 };
    const bump = $splice0(counter);
    bump();
    bump();
    return counter.count;
}

// 14:22
($capture0) => () => {
    $capture0.count += 1;
}
