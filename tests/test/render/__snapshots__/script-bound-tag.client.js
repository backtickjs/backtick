// 13:3
export default () => (props) => <b>{"count " + props.count}</b>;

// 16:24
export default ($0, $1) => {
    const count = $0()(0);
    const Badge = eval($1());
    return (<div>
      <Badge count={count.get()}/>
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>);
};
