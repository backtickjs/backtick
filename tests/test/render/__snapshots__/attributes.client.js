// 111:12
export default ($0) => {
    const text = $0()("first");
    const isOn = $0()(false);
    return (<div>
          <input aria-label="text" value={text.get()}/>
          <input type="checkbox" aria-label="on" checked={isOn.get()}/>
          <button onclick={() => {
            text.set("second");
            isOn.set(true);
        }}>
            write
          </button>
        </div>);
};

// 147:12
export default ($0) => {
    const texts = $0()(["typed by the script"]);
    const flags = $0()([true]);
    return (<div>
          <input aria-label="text" value={texts.get()[0]}/>
          <input type="checkbox" aria-label="on" checked={flags.get()[0]}/>
          <button onclick={() => {
            texts.set([]);
            flags.set([]);
        }}>
            clear
          </button>
        </div>);
};
