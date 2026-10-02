// 11:17
($splice0) => (label) => {
    return { label: $splice0()(label) };
}

// 15:10
($splice0) => <span style="font-size: 16px" onclick={() => {
        const row = $splice0()("one");
        row.label[1](row.label[0]() + " !!!");
    }}>
    {$splice0()("one").label[0]()}
  </span>
