// 12:31
($splice0, $splice1, $splice2, $splice3, $splice4) => {
    const count = $splice0()(0);
    const Badge = (props) => <b>{"n " + props.n}</b>;
    return (<div>
      {$splice1(count, Badge)}
      {$splice2(count, Badge)}
      {$splice3(count, Badge)}
      {$splice4(count, Badge)}
      <button onclick={() => count[1](count[0]() + 1)}>more</button>
    </div>);
}

// 18:10
($capture0, $capture1) => <$capture0 n={$capture1[0]()}/>

// 20:11
($splice0, $capture1, $capture2) => {
    const skipped = 10;
    return $splice0($capture1, $capture2);
}

// 22:20
($capture0, $capture1) => <$capture0 n={$capture1[0]() + 100}/>

// 25:21
($capture0, $capture1) => <$capture0 n={$capture1[0]() + 1000}/>

// 27:11
($tag0, $capture1, $capture2) => <$tag0 each={[1, 2]}>
          {(m) => <$capture1 n={m * $capture2[0]()}/>}
        </$tag0>
