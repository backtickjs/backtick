import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// kind of value a script can hold, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs`{
      const count = $createSignal(0);
      return [
        typeof undefined,
        typeof null,
        typeof true,
        typeof 1,
        typeof "a",
        typeof [1],
        typeof { a: 1 },
        typeof ((n: number) => n),
        typeof Math.floor,
        typeof count,
      ];
    }`,
  );
});

// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(
    t,
    "typeofNarrows",
    cs`{
      const measure = (v: string | number) =>
        typeof v === "string" ? v.length : v * 2;
      return [measure("abc"), measure(4)];
    }`,
  );
});
