import { cs, For, state } from "@backtickjs/core";

// A type the host declared, named from inside a script: as a type argument, as
// a parameter annotation, and as what a `let` was said to hold.
//
// Every one of them is the script's own text carried into the virtual code
// unchanged, and every one is mapped to itself. Without that the text is
// swallowed by the mapping around it, whose generated span and source span are
// different lengths — so no position inside reads back, and everything an
// editor answers about a position is answered about nothing. `Row` losing its
// colour is what that looks like; go-to-definition landing nowhere is the same
// bug wearing another hat.
type Row = { id: number; label: string };

async function Rows() {
  return cs.lift((() => {
    const __cs_rows = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)<Row[]>([]));
    const __cs_add = cs.const((__cs_row: Row) => {
        cs.statement(cs.receiver(__cs_rows).write([__cs_row]));
    });
    const __cs_label = cs.const((__cs_row: Row) => {
        return cs.const(cs.receiver(__cs_row).label);
    });
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(() => __cs_add({ id: 1, label: "one" }))}>add</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift(cs.receiver(__cs_rows).read())}>{cs.lift((__cs_row: Row) => <span>{cs.lift(__cs_label(__cs_row))}</span>)}</For>)}</div>)}</div>);
})());
}

export default <Rows />;
