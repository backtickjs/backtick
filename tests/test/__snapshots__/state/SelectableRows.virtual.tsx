import { cs, For, state } from "@backtickjs/core";

// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs.lift((() => {
    const __cs_selected = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(() => cs.receiver(__cs_selected).write(1))}>select</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift([0, 1, 2])}>{cs.lift((__cs_id: number) => <a href={cs.lift(cs.receiver(__cs_selected).read() === __cs_id ? "#open" : "#closed")}>{cs.lift("row " + __cs_id)}</a>)}</For>)}</div>)}</div>);
})());
}
