// 13:17
() => (n) => n * 2

// 14:14
() => (n) => (m) => n + m

// 20:16
() => "shared"

// 22:20
($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $tag7) => {
    const count = $splice0()(1);
    const rows = [1, 2, 3];
    const total = count[0]() + $splice1(rows);
    return (<section>
      {$splice2(rows)}
      {$splice3(rows)}
      <p>{$splice4(rows)(count[0]())}</p>
      <p>{$splice5(rows)(1)(2)}</p>
      <p>{$splice6(rows)}</p>
      <p>{total}</p>
      <ul>
        <$tag7 each={rows}>{(row) => <li>{row + count[0]()}</li>}</$tag7>
      </ul>
    </section>);
}

// 25:32
($capture0) => $capture0.length

// 47:14
($splice0) => $splice0()(1)

// 48:14
($splice0, $splice1) => $splice0()(1)(2) + $splice1().length

// 49:14
($splice0) => $splice0()
