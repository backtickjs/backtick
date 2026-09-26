import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Signal } from "solid-js";
import { snapshotCase } from "../snapshotCase.ts";

const make = (f: Client<(n: number) => Signal<number>>) =>
  cs`{
    return $f(1)[0]();
  }`;

const wrapped = cs`(n: number) => $createSignal(n + 10)`;

it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs`{
      return ${make(createSignal)} + ${make(wrapped)};
    }`,
  );
});
