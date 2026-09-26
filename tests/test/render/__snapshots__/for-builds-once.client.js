// 22:10
($splice0, $splice1, $splice2, $tag3) => {
    const items = $splice0()([]);
    const started = window.setTimeout(() => {
        if ($splice1()()) {
            items[1]($splice2());
        }
    }, 0);
    return <$tag3 each={items[0]()}>{(item) => <em>{item}</em>}</$tag3>;
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
