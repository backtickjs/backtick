// 30:14
($splice0) => (props) => {
    const shown = $splice0()(false);
    const started = window.setTimeout(() => {
        if (props.again()) {
            shown[1](true);
        }
    }, 0);
    return <>{shown[0]() ? <em>shown</em> : <i>waiting</i>}</>;
}

// 42:28
($splice0, $tag1) => {
    const builds = $splice0()(0);
    return (<div>
      <span>{"builds " + builds[0]()}</span>
      <section>
        <$tag1 again={() => {
            builds[1](builds[0]() + 1);
            return builds[0]() < 5;
        }}/>
      </section>
    </div>);
}
