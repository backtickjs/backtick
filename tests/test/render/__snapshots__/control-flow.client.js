// 20:17
($splice0, $tag1) => <ul>
  <$tag1 each={$splice0()}>
    {(row, index) => <li>{index + ": " + row()}</li>}
  </$tag1>
</ul>

// 26:18
($tag0, $tag1) => <$tag0 fallback={<p>none</p>}>
  <$tag1 when={1 > 2}>
    <p>wrong</p>
  </$tag1>
  <$tag1 when={2 > 1}>
    <p>right</p>
  </$tag1>
</$tag0>

// 35:16
($splice0, $tag1) => <$tag1 fallback={<p>caught</p>}>{$splice0()}</$tag1>

// 36:5
() => {
    throw "drawn wrong";
}

// 41:19
($tag0) => <$tag0 fallback={<p>loading</p>}>
  <p>loaded</p>
</$tag0>

// 45:18
($tag0) => <div>
  <p>here</p>
  <$tag0>
    <p>elsewhere</p>
  </$tag0>
</div>
