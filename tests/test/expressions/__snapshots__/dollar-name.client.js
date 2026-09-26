// 10:10
export default ($0) => $0() + 2;

// 17:5
export default ($0) => {
    const foo$ = 1;
    return $0(foo$);
};

// 19:20
export default ($0) => $0;
