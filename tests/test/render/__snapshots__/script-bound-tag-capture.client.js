// 11:31
export default ($0, $1, $2, $3, $4) => {
    const count = $0()(0);
    const Badge = (props) => <b>{"n " + props.n}</b>;
    return (<div>
      {$1(count, Badge)}
      {$2(count, Badge)}
      {$3(count, Badge)}
      {$4(count, Badge)}
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>);
};

// 17:10
export default ($0, $1) => <$0 n={$1.get()}/>;

// 19:11
export default ($0, $1, $2) => {
    const skipped = 10;
    return $0($1, $2);
};

// 21:20
export default ($0, $1) => <$0 n={$1.get() + 100}/>;

// 24:21
export default ($0, $1) => <$0 n={$1.get() + 1000}/>;

// 26:11
export default ($0, $1, $2) => <$0 each={[1, 2]}>
          {(m) => <$1 n={m * $2.get()}/>}
        </$0>;
