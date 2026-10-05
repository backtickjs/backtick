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
    cs.lift((() => {
      const __cs_count = (cs.splice((createSignal)))(0);
      return [
        typeof undefined,
        typeof null,
        typeof true,
        typeof 1,
        typeof "a",
        typeof [1],
        typeof { a: 1 },
        typeof ((__cs_n: number) => __cs_n),
        typeof cs.globalThis.Math.floor,
        typeof __cs_count,
      ];
    })()),
  );
});

// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(
    t,
    "typeofNarrows",
    cs.lift((() => {
      const __cs_measure = (__cs_v: string | number) =>
        typeof __cs_v === "string" ? __cs_v.length : __cs_v * 2;
      return [__cs_measure("abc"), __cs_measure(4)];
    })()),
  );
});
