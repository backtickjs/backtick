// 20:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => (props) => {
    const [items, setItems] = $splice0()([]);
    const started = window.setTimeout(() => {
        if (props.more()) {
            setItems($splice1());
        }
    }, 0);
    return ($For => <$For each={items()}>{(item) => <em>{item}</em>}</$For>)($splice2());
});
}

// 32:23
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [asked, setAsked] = $splice0()(0);
    return (<div>
      <span>{"asked " + asked()}</span>
      {($WaitingList => <$WaitingList more={() => {
                setAsked(asked() + 1);
                return asked() < 5;
            }}/>)($splice1())}
    </div>);
});
}
