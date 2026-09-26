// 22:10
export default ($0, $1, $2, $3, $4) => {
    const items = $0()([]);
    const started = $1().setTimeout(() => {
        if ($2()()) {
            items[1]($3());
        }
    }, 0);
    return <$4 each={items[0]()}>{(item) => <em>{item}</em>}</$4>;
};

// 35:23
export default ($0, $1) => {
    const asked = $0()(0);
    return (<div>
      <span>{"asked " + asked[0]()}</span>
      <$1 more={() => {
            asked[1](asked[0]() + 1);
            return asked[0]() < 5;
        }}/>
    </div>);
};
