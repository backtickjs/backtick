// 8:14
() => (o) => {
    return [o.label, o.inner?.z ?? 0];
}

// 16:5
($splice0) => ({
    present: $splice0()({ label: "a", inner: { z: 3 } }),
    partial: $splice0()({ label: "b", inner: {} }),
    omitted: $splice0()({ label: "c" }),
})
