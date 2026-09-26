// 16:10
($0) => {
    const count = $0()(0);
    return (<button id="row" style="display: flex; gap: 8px" onclick={() => count[1](count[0]() + 1)}>
        <span style="font-weight: 700">{count[0]() > 0 ? "☑" : "☐"}</span>
        <span>{"pressed " + count[0]() + " times"}</span>
      </button>);
}
