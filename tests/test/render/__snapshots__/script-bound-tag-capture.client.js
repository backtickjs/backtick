// 12:31
($0, $1, $2, $3, $4) => {
    const count = $0()(0);
    const Badge = (props) => <b>{"n " + props.n}</b>;
    return (<div>
      {$1(count, Badge)}
      {$2(count, Badge)}
      {$3(count, Badge)}
      {$4(count, Badge)}
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
}

// 18:10
($0, $1) => <$0 n={$1[0]()}/>

// 20:11
($0, $1, $2) => {
    const skipped = 10;
    return $0($1, $2);
}

// 22:20
($0, $1) => <$0 n={$1[0]() + 100}/>

// 25:21
($0, $1) => <$0 n={$1[0]() + 1000}/>

// 27:11
($0, $1, $2) => <$0 each={[1, 2]}>
          {(m) => <$1 n={m * $2[0]()}/>}
        </$0>
