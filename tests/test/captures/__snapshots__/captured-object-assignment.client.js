// 12:5
export default ($0) => {
    const counter = { count: 0 };
    const bump = $0(counter);
    bump();
    bump();
    return counter.count;
};

// 14:22
export default ($0) => () => {
    $0.count += 1;
};
