// 13:5
export default ($0) => {
    const apply = (f) => f() + 1;
    return apply($0());
};

// 15:22
export default () => () => 2;
