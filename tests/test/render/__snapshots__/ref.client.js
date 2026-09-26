// 13:7
export default ($0) => {
    const field = $0()(null);
    return (<div>
            <input aria-label="name" ref={(element) => field[1](element)}/>
            <button onclick={() => field[0]()?.focus()}>edit</button>
          </div>);
};

// 29:7
export default ($0) => {
    return (<input aria-label="name" ref={(element) => $0()(() => element.focus())}/>);
};

// 42:18
export default () => <input aria-label="name" ref={() => { }}/>;

// 64:9
export default ($0, $1) => {
    const shown = $0()(true);
    const n = $0()(0);
    return (<div>
              <button onclick={() => n[1](n[0]() + 1)}>
                {"n " + n[0]()}
              </button>
              {shown[0]() ? (<p ref={() => $1().console.log(n[0]())}>shown</p>) : null}
            </div>);
};
