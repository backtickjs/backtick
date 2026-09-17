import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
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
  return cs`{
    const rows = $state<Row[]>([]);
    const add = (row: Row) => {
      rows.set([row]);
    };
    const label = (row: Row) => {
      return row.label;
    };
    return (
      <div>
        <span onclick={() => add({ id: 1, label: "one" })}>add</span>
        <div>
          <For each={rows.get()}>{(row: Row) => <span>{label(row)}</span>}</For>
        </div>
      </div>
    );
  }`;
}

it("Rows", async (t) => {
  await snapshotCase(t, "Rows", <Rows />);
});
