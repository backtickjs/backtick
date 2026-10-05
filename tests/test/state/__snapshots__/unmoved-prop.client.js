// 14:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => {
    const [selected, setSelected] = $splice0()(0);
    const isSelected = $splice1()(selected);
    return (<div>
        <span onclick={() => setSelected(1)}>select</span>
        <div>
          {($For => <$For each={[0, 1, 2]}>
            {(id) => (<a href={isSelected(id) ? "#open" : "#closed"}>{"row " + id}</a>)}
          </$For>)($splice2())}
        </div>
      </div>);
});
}
