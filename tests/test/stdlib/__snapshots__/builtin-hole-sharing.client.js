// 9:3
export default ($0) => {
    return $0()(1)[0]();
};

// 13:17
export default ($0) => (n) => $0()(n + 10);

// 19:5
export default ($0, $1) => {
    return $0() + $1();
};
