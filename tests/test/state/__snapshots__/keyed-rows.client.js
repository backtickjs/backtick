// 12:10
export default ($0, $1) => {
    const ids = $0()([1, 2, 3]);
    const swap = () => {
        const held = ids.get();
        ids.set(held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
        ids.set(ids.get().filter((id) => id !== 2));
    };
    return (<div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          <$1 each={ids.get()}>
            {(id) => <span>{"row " + id}</span>}
          </$1>
        </div>
      </div>);
};
