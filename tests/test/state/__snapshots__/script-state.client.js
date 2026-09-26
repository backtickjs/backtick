// 11:17
($splice0) => (label) => {
    return { label: $splice0()(label) };
}

// 17:14
() => "font-size: 16px"

// 18:16
($splice0) => () => {
    const row = $splice0()("one");
    row.label[1](row.label[0]() + " !!!");
}

// 23:8
($splice0) => $splice0()("one").label[0]()
