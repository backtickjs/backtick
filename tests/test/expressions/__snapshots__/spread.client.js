// 12:5
() => {
    const front = [1, 2];
    const back = [3];
    const none = [];
    const all = [0, ...front, ...none, ...back, 4];
    const twice = [...all, ...all];
    return all.join(",") + "|" + twice.length;
}
