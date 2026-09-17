import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs`(initial: number) => {
  const count = $state(initial);
  return {
    get: () => count.get(),
    add: (n: number) => {
      count.set(count.get() + n);
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
