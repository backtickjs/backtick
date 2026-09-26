// 13:10
export default ($0) => (flag) => {
    if (flag) {
        return $0();
    }
    return "skipped";
};

// 21:12
export default () => "evaluated";

// 23:16
export default () => {
    throw "the guarded fragment must never evaluate";
};

// 31:5
export default ($0, $1) => ({
    taken: $0()(true),
    skipped: $1()(false),
});
