import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

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
    const [__cs_rows, __cs_setRows] = cs.splice((createSignal))<Row[]>([]);
    const __cs_add = (__cs_row: Row) => {
      __cs_setRows([__cs_row]);
    };
    const __cs_label = (__cs_row: Row) => {
      return __cs_row.label;
    };
    return (
      <div>
        <span onclick={() => __cs_add({ id: 1, label: "one" })}>add</span>
        <div>
          {(void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: __cs_rows(), children: (__cs_row: Row) => <span>{__cs_label(__cs_row)}</span> }))}
        </div>
      </div>
    );
  })());
}

it("Rows", async (t) => {
  await snapshotCase(t, "Rows", <Rows />);
});
