// 32:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
    const [ids, setIds] = $splice0()([1, 2, 3]);
    const clear = () => {
        setIds([]);
    };
    return (<>
        <span onclick={clear}>clear</span>
        <$tag1 each={ids()}>{(id) => <span>{"row " + id}</span>}</$tag1>
      </>);
});
}

// 91:34
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2, $splice3, $splice4) => $splice0()((dispose) => {
    const parent = document.getElementById($splice1());
    $splice2()(parent, $splice3(), parent.querySelector($splice4()));
    return dispose;
}));
}
