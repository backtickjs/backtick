// 21:17
($splice0, $tag1) => {
    const count = $splice0()(0);
    return (<$tag1 variant="primary" icon={<b>+</b>} onClick={() => count[1](count[0]() + 1)}>
      <span>{"Pressed " + count[0]() + " times"}</span>
    </$tag1>);
}

// 36:29
($tag0) => <$tag0 variant="large" onClick={() => { }}>
  Save
</$tag0>
