// 10:5
export default () => {
    let n = 1;
    if (n === 2) {
        return "some";
    }
};

// 23:5
export default () => {
    const pick = (b) => {
        if (b) {
            return "taken";
        }
    };
    return [pick(true), pick(false)];
};
