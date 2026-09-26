// 111:12
export default ($0) => {
    const text = $0()("first");
    const isOn = $0()(false);
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
};
