// 7:3
export default ($0) => {
    return $0()(1).get();
};

// 11:17
export default ($0) => (n) => $0()(n + 10);

// 17:5
export default ($0, $1) => {
    return $0() + $1();
};
