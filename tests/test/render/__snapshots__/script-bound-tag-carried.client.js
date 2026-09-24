// 12:10
$0 => {
    const Badge = (p) => <i>{"panel " + p.n}</i>;
    return (<section>
        <Badge n={0}/>
        {$0().body}
      </section>);
}

// 27:31
($0, $1, $2) => {
    const count = $0()(0);
    const Badge = (p) => (<b>
      {"outer " + p.n}
      {p.children}
    </b>);
    return (<div>
      <$2 body={$1(count, Badge)}/>
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>);
}

// 40:13
($0, $1) => <$0 n={$1.get()}>
            <u>{"kid " + $1.get()}</u>
          </$0>
