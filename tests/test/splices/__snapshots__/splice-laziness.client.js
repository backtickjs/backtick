// 13:10
($0) => (flag) => {
    if (flag) {
        return $0();
    }
    return "skipped";
}

// 21:12
() => "evaluated"

// 23:16
() => {
    throw "the guarded fragment must never evaluate";
}

// 31:5
($0, $1) => ({
    taken: $0()(true),
    skipped: $1()(false),
})
