// 13:10
export default ($0) => {
    const Badge = (p) => <i>{"panel " + p.n}</i>;
    return (<section>
        <Badge n={0}/>
        {$0().body}
      </section>);
};

// 28:31
export default ($0, $1, $2) => {
    const count = $0()(0);
    const Badge = (p) => (<b>
      {"outer " + p.n}
      {p.children}
    </b>);
    return (<div>
      <$2 body={$1(count, Badge)}/>
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
};

// 41:13
export default ($0, $1) => <$0 n={$1[0]()}>
            <u>{"kid " + $1[0]()}</u>
          </$0>;
