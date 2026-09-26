// 13:7
($splice0) => {
    const field = $splice0()(null);
    return (<div>
            <input aria-label="name" ref={(element) => field[1](element)}/>
            <button onclick={() => field[0]()?.focus()}>edit</button>
          </div>);
}

// 29:7
($splice0) => {
    return (<input aria-label="name" ref={(element) => $splice0()(() => element.focus())}/>);
}

// 42:18
() => <input aria-label="name" ref={() => { }}/>

// 64:9
($splice0, $splice1) => {
    const shown = $splice0()(true);
    const n = $splice0()(0);
    return (<div>
              <button onclick={() => n[1](n[0]() + 1)}>
                {"n " + n[0]()}
              </button>
              {shown[0]() ? (<p ref={() => $splice1().console.log(n[0]())}>shown</p>) : null}
            </div>);
}
