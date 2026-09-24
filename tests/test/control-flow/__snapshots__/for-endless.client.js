// 10:5
() => {
    let i = 0;
    for (;;) {
        if (i === 4) {
            break;
        }
        i = i + 1;
    }
    return i;
}
