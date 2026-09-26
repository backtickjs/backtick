// 10:5
() => {
    let n = 1;
    if (n === 2) {
        return "some";
    }
}

// 23:5
() => {
    const pick = (b) => {
        if (b) {
            return "taken";
        }
    };
    return [pick(true), pick(false)];
}
