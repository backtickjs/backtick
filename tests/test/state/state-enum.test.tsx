import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A signal holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the signal holds `Color` rather than
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
    const held = $createSignal(${Color.Red});
    return (
      <span onclick={() => held[1](${Color.Blue})}>
        {$colorName(held[0]())}
      </span>
    );
  }`;
}

it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", <Swatch />);
});
