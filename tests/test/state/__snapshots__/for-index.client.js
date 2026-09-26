// 16:10
($splice0, $tag1) => {
    const names = $splice0()(["a", "b", "c"]);
    const rotate = () => {
        const held = names[0]();
        names[1]([held[2], held[0], held[1]]);
    };
    return (<div>
        <span onclick={rotate}>rotate</span>
        <div>
          <$tag1 each={names[0]()}>
            {(name, index) => (<span>{name + " at " + index()}</span>)}
          </$tag1>
        </div>
      </div>);
}
