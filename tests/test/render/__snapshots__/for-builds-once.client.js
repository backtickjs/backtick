// 21:10
export default ($0, $1, $2, $3, $4) => {
    const items = $0()([]);
    const started = $1().setTimeout(() => {
        if ($2()()) {
            items.set($3());
        }
    }, 0);
    return <$4 each={items.get()}>{(item) => <em>{item}</em>}</$4>;
};

// 34:23
export default ($0, $1) => {
    const asked = $0()(0);
    return (<div>
      <span>{"asked " + asked.get()}</span>
      <$1 more={() => {
            asked.set(asked.get() + 1);
            return asked.get() < 5;
        }}/>
    </div>);
};
