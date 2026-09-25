// 10:17
export default ($0) => (label) => {
    return { label: $0()(label) };
};

// 16:14
export default () => "font-size: 16px";

// 17:16
export default ($0) => () => {
    const row = $0()("one");
    row.label.set(row.label.get() + " !!!");
};

// 22:8
export default ($0) => $0()("one").label.get();
