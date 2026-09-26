// 8:16
($splice0) => (name) => {
    const coins = [5, 31, 7];
    const first = coins["0"];
    const wrong = coins[name];
    const which = $splice0()[name];
    return first + wrong + which;
}
