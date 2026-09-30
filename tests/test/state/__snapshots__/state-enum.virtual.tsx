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

const colorName: Client<(c: Color) => string> = cs.lift((__cs_c: Color) => {
    return __cs_c === cs.splice(Color.Blue) ? "blue" : "red";
});

async function Swatch() {
  return cs.lift((() => {
    const __cs_held = cs.splice((createSignal))(cs.splice(Color.Red));
    return <span onclick={cs.lift(() => __cs_held[1](cs.splice(Color.Blue)))}>{cs.lift(cs.splice((colorName))(__cs_held[0]()))}</span>;
})());
}

it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", <Swatch />);
});
