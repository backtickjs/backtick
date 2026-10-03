// 20:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $tag2) => (props) => {
    const [items, setItems] = $splice0()([]);
    const started = window.setTimeout(() => {
        if (props.more()) {
            setItems($splice1());
        }
    }, 0);
    return <$tag2 each={items()}>{(item) => <em>{item}</em>}</$tag2>;
});
}

// 32:23
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
    const [asked, setAsked] = $splice0()(0);
    return (<div>
      <span>{"asked " + asked()}</span>
      <$tag1 more={() => {
            setAsked(asked() + 1);
            return asked() < 5;
        }}/>
    </div>);
});
}
