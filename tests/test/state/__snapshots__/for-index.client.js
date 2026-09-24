// 16:10
($0, $1) => {
    const names = $0()(["a", "b", "c"]);
    const rotate = () => {
        const held = names.get();
        names.set([held[2], held[0], held[1]]);
    };
    return (<div>
        <span onclick={rotate}>rotate</span>
        <div>
          <$1 each={names.get()}>
            {(name, index) => (<span>{name + " at " + index.get()}</span>)}
          </$1>
        </div>
      </div>);
}
