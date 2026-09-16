import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs`{
  let n = 0;
  n = 1;
}`;

const onTap: Client<(id: number) => void> = cs`(id: number) => {
  $beep;
}`;

it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs`{
      const handlers = {
        tap: $onTap,
        hold: $onTap,
      };
      return handlers;
    }`,
  );
});
