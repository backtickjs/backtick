// 12:5
() => {
    let last = () => 0;
    for (let i = 0; i < 3; i = i + 1) {
        last = () => i;
    }
    return last();
}
