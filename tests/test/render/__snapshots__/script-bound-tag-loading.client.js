// 18:3
export default () => (props) => <b>{"count " + props.count}</b>;

// 22:31
export default ($0, $1) => {
    const count = $0()(0);
    const drawn = $0()(null);
    const Badge = (props) => {
        const held = drawn[0]();
        return held === null ? null : eval(held)(props);
    };
    return (<div>
      {drawn[0]() === null ? <i>loading</i> : <Badge count={count[0]()}/>}
      <button onclick={() => drawn[1]($1())}>load</button>
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
};
