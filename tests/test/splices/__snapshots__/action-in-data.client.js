// 7:16
() => {
    const x = 1;
}

// 15:5
($splice0, $splice1) => {
    const list = $splice0();
    const map = $splice1();
    return list.length + Object.keys(map).length;
}
