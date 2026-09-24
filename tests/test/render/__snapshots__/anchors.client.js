// 31:10
($0, $1) => {
    const ids = $0()([1, 2, 3]);
    const clear = () => {
        ids.set([]);
    };
    return (<>
        <span onclick={clear}>clear</span>
        <$1 each={ids.get()}>{(id) => <span>{"row " + id}</span>}</$1>
      </>);
}
