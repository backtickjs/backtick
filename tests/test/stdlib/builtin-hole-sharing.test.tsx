import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const make = (f: Client<(n: number) => State<number>>) =>
  cs`{
    return $f(1).get();
  }`;

const wrapped = cs`(n: number) => $state(n + 10)`;

it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs`{
      return ${make(state)} + ${make(wrapped)};
    }`,
  );
});
