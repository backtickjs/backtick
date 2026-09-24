// 13:7
$0 => {
    const field = $0()(null);
    return (<div>
            <input aria-label="name" ref={(element) => field.set(element)}/>
            <button onclick={() => field.get()?.focus()}>edit</button>
          </div>);
}

// 29:7
$0 => {
    return (<input aria-label="name" ref={(element) => $0()(() => element.focus())}/>);
}

// 42:18
() => <input aria-label="name" ref={() => { }}/>

// 64:9
($0, $1) => {
    const shown = $0()(true);
    const n = $0()(0);
    return (<div>
              <button onclick={() => n.set(n.get() + 1)}>
                {"n " + n.get()}
              </button>
              {shown.get() ? (<p ref={() => $1().console.log(n.get())}>shown</p>) : null}
            </div>);
}
