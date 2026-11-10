import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

// Code run at each use is a function, called where it's used: one function,
// spliced twice and called twice, runs twice.
const log = cs.lift((() => () => {
  window.console.log("logged");
})());

it("a function spliced twice and called twice runs twice", async () => {
  const seen: unknown[] = [];
  const consoleLog = window.console.log;
  window.console.log = (...args: unknown[]) => {
    seen.push(args[0]);
  };
  try {
    await evaluate(cs.lift((() => {
      (cs.splice((log)))();
      (cs.splice((log)))();
    })()));
  } finally {
    window.console.log = consoleLog;
  }
  assert.deepEqual(seen, ["logged", "logged"]);
});
