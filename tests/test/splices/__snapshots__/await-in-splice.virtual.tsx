import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here in an async test, whether the script is an
// expression or has statements.
it("awaitInSplice", async (t) => {
  await snapshotCase(t, "awaitInSplice", cs.lift(await (async () => cs.splice(await fetchGreeting()) + "!")()));
});

it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs.lift(await (async () => {
    const __cs_greeting = cs.splice(await fetchGreeting());
    return __cs_greeting + "!";
})()),
  );
});

// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response: Client<Promise<Response>> = cs.lift((() => cs.globalThis.fetch("/rows"))());
  return response;
}
