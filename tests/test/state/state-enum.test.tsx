import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the cell holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
enum Color {
  Red = 0,
  Blue = 1,
}

const colorName: Client<(c: Color) => string> = cs`(c: Color) => {
  return c === ${Color.Blue} ? "blue" : "red";
}`;

async function Swatch() {
  return cs`{
    const held = $state(${Color.Red});
    return (
      <span onclick={() => held.set(${Color.Blue})}>
        {$colorName(held.get())}
      </span>
    );
  }`;
}

it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", <Swatch />);
});
