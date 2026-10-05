// 20:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const build = (from) => {
        return Array.from({ length: 3 }, (_, at) => {
            return { id: from + at, label: $splice0()("row " + (from + at)) };
        });
    };
    const [held, setHeld] = $splice0()(build(1));
    return (<div>
        <ul class="rows">
          {($For => <$For each={held()}>
            {(row) => (<li onclick={() => row.label[1]("pressed")}>{row.label[0]()}</li>)}
          </$For>)($splice1())}
        </ul>
      </div>);
});
}
