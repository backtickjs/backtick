// 22:10
($splice0, $splice1, $splice2, $splice3, $tag4) => {
    const items = $splice0()([]);
    const started = $splice1().setTimeout(() => {
        if ($splice2()()) {
            items[1]($splice3());
        }
    }, 0);
    return <$tag4 each={items[0]()}>{(item) => <em>{item}</em>}</$tag4>;
}

// 35:23
($splice0, $tag1) => {
    const asked = $splice0()(0);
    return (<div>
      <span>{"asked " + asked[0]()}</span>
      <$tag1 more={() => {
            asked[1](asked[0]() + 1);
            return asked[0]() < 5;
        }}/>
    </div>);
}
