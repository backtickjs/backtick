// 11:17
export default ($0) => (label) => {
    return { label: $0()(label) };
};

// 17:14
export default () => "font-size: 16px";

// 18:16
export default ($0) => () => {
    const row = $0()("one");
    row.label[1](row.label[0]() + " !!!");
};

// 23:8
export default ($0) => $0()("one").label[0]();
