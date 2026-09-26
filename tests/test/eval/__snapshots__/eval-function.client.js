// 9:33
export default () => (name) => "hello " + name;

// 14:3
export default () => (props) => <b>{"count " + props.count}</b>;

// 22:5
export default ($0, $1) => <div>
      <span>{eval($0())("ada")}</span>
      {eval($1())({ count: 3 })}
    </div>;
