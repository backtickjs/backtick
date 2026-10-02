// 15:10
($splice0) => {
    const Badge = (p) => <i>{"panel " + p.n}</i>;
    return (<section>
        <Badge n={0}/>
        {$splice0().body}
      </section>);
}

// 30:31
($splice0, $splice1) => {
    const count = $splice0()(0);
    const Badge = (p) => (<b>
      {"outer " + p.n}
      {p.children}
    </b>);
    return (<div>
      {$splice1(count, Badge)}
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
}

// 44:19
($capture0, $capture1) => <$capture0 n={$capture1[0]()}>
              <u>{"kid " + $capture1[0]()}</u>
            </$capture0>
