// 15:3
export default () => (props) => <b>{"count " + props.count}</b>;

// 19:24
export default ($0, $1) => {
    const count = $0()(0);
    const Badge = eval($1());
    return (<div>
      <Badge count={count[0]()}/>
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
};
