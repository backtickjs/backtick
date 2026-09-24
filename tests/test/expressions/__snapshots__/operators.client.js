// 10:5
() => {
    const n = 5;
    return [
        n ** 2,
        n & 6,
        n | 8,
        n ^ 1,
        n << 2,
        -n >> 1,
        -n >>> 28,
        n == 5,
        n != 5,
        "length" in [n],
        [n] instanceof Array,
    ];
}

// 33:5
() => {
    const s = "7";
    const o = { a: 1, b: 2 };
    const deleted = delete o.a;
    return [+s, ~5, void s === null, deleted, "a" in o];
}

// 46:5
() => {
    let n = 3;
    n **= 2;
    n <<= 1;
    n >>= 2;
    n >>>= 1;
    n &= 7;
    n |= 8;
    n ^= 1;
    let a = null;
    a ??= 4;
    let b = false;
    b ||= true;
    let c = true;
    c &&= false;
    return [n, a, b, c];
}

// 71:5
() => {
    const o = { n: 1 };
    const list = [1, 2];
    o.n += 1;
    o.n++;
    list[0] = 10;
    list[1] **= 3;
    --list[1];
    return [o.n, list];
}

// 89:5
() => {
    let n = 0;
    const last = (n++, n + 10);
    return [n, last];
}
