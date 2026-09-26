// 34:10
($splice0, $tag1) => {
    const ids = $splice0()([1, 2, 3]);
    const clear = () => {
        ids[1]([]);
    };
    return (<>
        <span onclick={clear}>clear</span>
        <$tag1 each={ids[0]()}>{(id) => <span>{"row " + id}</span>}</$tag1>
      </>);
}
