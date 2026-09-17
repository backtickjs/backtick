import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a cell built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
enum Color {
  Red = 0,
  Blue = 1,
}

const five = 5;

it("splicedLiteralWidens", async (t) => {
  await snapshotCase(
    t,
    "splicedLiteralWidens",
    cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)((cs.splice((five)) satisfies typeof cs.ClientUnknown)));
    cs.statement(cs.receiver(__cs_n).set(6));
    const __cs_c = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)((cs.splice(Color.Red) satisfies typeof cs.ClientUnknown)));
    cs.statement(cs.receiver(__cs_c).set((cs.splice(Color.Blue) satisfies typeof cs.ClientUnknown)));
})()),
  );
});
