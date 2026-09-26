// 35:10
($0, $1) => {
    const ids = $0()([1, 2, 3]);
    const clear = () => {
        ids[1]([]);
    };
    return (<>
        <span onclick={clear}>clear</span>
        <$1 each={ids[0]()}>{(id) => <span>{"row " + id}</span>}</$1>
      </>);
}
