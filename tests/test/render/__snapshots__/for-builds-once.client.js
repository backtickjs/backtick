// 20:21
($splice0, $splice1, $tag2) => (props) => {
    const items = $splice0()([]);
    const started = window.setTimeout(() => {
        if (props.more()) {
            items[1]($splice1());
        }
    }, 0);
    return <$tag2 each={items[0]()}>{(item) => <em>{item}</em>}</$tag2>;
}

// 32:23
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
