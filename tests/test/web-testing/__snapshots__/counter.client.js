// 11:10
($splice0) => {
    const count = $splice0()(0);
    return (<div>
        <button onclick={() => count[1](count[0]() + 1)}>Add</button>
        <p>{"Count: " + count[0]()}</p>
      </div>);
}
