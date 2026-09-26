// 11:17
($0) => (label) => {
    return { label: $0()(label) };
}

// 17:14
() => "font-size: 16px"

// 18:16
($0) => () => {
    const row = $0()("one");
    row.label[1](row.label[0]() + " !!!");
}

// 23:8
($0) => $0()("one").label[0]()
