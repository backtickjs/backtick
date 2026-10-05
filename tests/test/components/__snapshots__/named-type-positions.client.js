// 19:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [rows, setRows] = $splice0()([]);
    const add = (row) => {
        setRows([row]);
    };
    const label = (row) => {
        return row.label;
    };
    return (<div>
        <span onclick={() => add({ id: 1, label: "one" })}>add</span>
        <div>
          {($For => <$For each={rows()}>{(row) => <span>{label(row)}</span>}</$For>)($splice1())}
        </div>
      </div>);
});
}
