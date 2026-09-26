// 12:7
($splice0) => {
    const field = $splice0()(null);
    return (<div>
            <input aria-label="name" ref={(element) => field[1](element)}/>
            <button onclick={() => field[0]()?.focus()}>edit</button>
          </div>);
}

// 28:7
($splice0) => {
    return (<input aria-label="name" ref={(element) => $splice0()(() => element.focus())}/>);
}

// 41:18
() => <input aria-label="name" ref={() => { }}/>

// 63:9
($splice0) => {
    const shown = $splice0()(true);
    const n = $splice0()(0);
    return (<div>
              <button onclick={() => n[1](n[0]() + 1)}>
                {"n " + n[0]()}
              </button>
              {shown[0]() ? (<p ref={() => window.console.log(n[0]())}>shown</p>) : null}
            </div>);
}
