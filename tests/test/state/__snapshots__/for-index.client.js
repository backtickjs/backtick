// 16:10
export default ($0, $1) => {
    const names = $0()(["a", "b", "c"]);
    const rotate = () => {
        const held = names[0]();
        names[1]([held[2], held[0], held[1]]);
    };
    return (<div>
        <span onclick={rotate}>rotate</span>
        <div>
          <$1 each={names[0]()}>
            {(name, index) => (<span>{name + " at " + index()}</span>)}
          </$1>
        </div>
      </div>);
};
