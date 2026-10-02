// 12:15
() => (props) => <b>{"badge " + props.n}</b>

// 14:16
($splice0, $tag1, $tag2) => {
    const scale = $splice0()(1);
    return (<div>
      <$tag1 each={[1, 2]}>{(n) => <$tag2 n={n * scale[0]()}/>}</$tag1>
      <button onclick={() => scale[1](scale[0]() * 2)}>double</button>
    </div>);
}
