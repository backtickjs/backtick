import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// An object with storage of its own, made by a client function: a signal holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs`(initial: number) => {
  const count = $createSignal(initial);
  return {
    get: () => count[0](),
    add: (n: number) => {
      count[1](count[0]() + n);
    },
  };
}`;

it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs`{
      const c = $counter(10);
      return (
        <button
          onclick={() => {
            c.add(5);
          }}
        >
          {c.get()}
        </button>
      );
    }`,
  );
});
