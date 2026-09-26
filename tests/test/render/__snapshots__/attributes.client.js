// 113:12
($splice0) => {
    const text = $splice0()("first");
    const isOn = $splice0()(false);
    return (<div>
          <input aria-label="text" value={text[0]()}/>
          <input type="checkbox" aria-label="on" checked={isOn[0]()}/>
          <button onclick={() => {
            text[1]("second");
            isOn[1](true);
        }}>
            write
          </button>
        </div>);
}
