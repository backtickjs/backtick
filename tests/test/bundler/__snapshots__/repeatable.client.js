// 13:40
($splice0) => $splice0() * 2

// 14:60
($splice0, $splice1) => $splice0() + $splice1()

// 20:16
() => "shared"

// 22:20
($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $splice7, $tag8) => {
    const count = $splice0()(1);
    const Heading = $splice1();
    const rows = [1, 2, 3];
    const total = count[0]() + $splice2(rows);
    return (<section>
      <Heading title="spliced"/>
      {$splice3(rows)}
      {$splice4(rows)}
      <p>{$splice5(rows)(count[0]())}</p>
      <p>{$splice6(rows)(1)(2)}</p>
      <p>{$splice7(rows)}</p>
      <p>{total}</p>
      <ul>
        <$tag8 each={rows}>
          {(row) => <li>{row + count[0]()}</li>}
        </$tag8>
      </ul>
    </section>);
}

// 26:32
($capture0) => $capture0.length

// 51:14
($splice0) => $splice0()(1)

// 52:14
($splice0, $splice1) => $splice0()(1)(2) + $splice1().length

// 53:14
($splice0) => $splice0()
