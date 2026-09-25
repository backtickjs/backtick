// 16:3
export default () => (props) => <b>{"count " + props.count}</b>;

// 19:31
export default ($0, $1) => {
    const count = $0()(0);
    const drawn = $0()(null);
    const Badge = (props) => {
        const held = drawn.get();
        return held === null ? null : eval(held)(props);
    };
    return (<div>
      {drawn.get() === null ? <i>loading</i> : <Badge count={count.get()}/>}
      <button onclick={() => drawn.set($1())}>load</button>
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>);
};
