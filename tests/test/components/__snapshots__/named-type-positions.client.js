// 19:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $tag1) => {
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
          <$tag1 each={rows()}>{(row) => <span>{label(row)}</span>}</$tag1>
        </div>
      </div>);
});
}
