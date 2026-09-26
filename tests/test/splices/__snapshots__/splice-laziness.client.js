// 13:10
($splice0) => (flag) => {
    if (flag) {
        return $splice0();
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
($splice0, $splice1) => ({
    taken: $splice0()(true),
    skipped: $splice1()(false),
})
