import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An action may sit in data like any script: it runs where the container is
// built, and its slot holds what it evaluated to, which is nothing.
const action = cs`{
  const x = 1;
}`;

it("actionInData", async (t) => {
  await snapshotCase(
    t,
    "actionInData",
    cs`{
      const list = ${[action]};
      const map = ${{ press: action }};
      return list.length + Object.keys(map).length;
    }`,
  );
});
