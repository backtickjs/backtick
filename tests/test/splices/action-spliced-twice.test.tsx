import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

// An action spliced twice as a statement runs twice: each `$log;` is the
// action's code, run where it stands.
const log = cs`{
  window.console.log("logged");
}`;

it("an action spliced twice runs twice", async () => {
  const seen: unknown[] = [];
  const consoleLog = window.console.log;
  window.console.log = (...args: unknown[]) => {
    seen.push(args[0]);
  };
  try {
    await evaluate(cs`{
      $log;
      $log;
    }`);
  } finally {
    window.console.log = consoleLog;
  }
  assert.deepEqual(seen, ["logged", "logged"]);
});
