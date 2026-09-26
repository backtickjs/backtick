// 16:10
() => <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor"/>

// 19:22
($tag0, $tag1) => {
    const Dot = (props) => (<circle cx={props.x} cy="5" r="2">
      <title>{"dot " + props.x}</title>
    </circle>);
    return (<div>
      <a href="/shapes">{"shapes"}</a>
      <svg viewBox="0 0 30 10" width="120">
        <$tag0 />
        <$tag1 each={[10, 20]}>{(x) => <Dot x={x}/>}</$tag1>
        <foreignObject x="0" y="0" width="10" height="10">
          <p>{"html again"}</p>
        </foreignObject>
      </svg>
    </div>);
}
