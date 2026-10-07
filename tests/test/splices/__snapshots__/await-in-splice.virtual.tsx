import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here in an async test, whether the script is an
// expression or has statements.
it("awaitInSplice", async (t) => {
  await snapshotCase(t, "awaitInSplice", cs.lift(await (async () => (cs.splice(await fetchGreeting())) + "!")()));
});

it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs.lift(await (async () => {
      const __cs_greeting = (cs.splice(await fetchGreeting()));
      return __cs_greeting + "!";
    })()),
  );
});

// The same `await`, in a splice that is a child of a component tag, which
// the typechecker reads as JSX in a function of its own: awaited there too.
const Badge = cs.lift((() => (__cs_props: { children: JSX.Element }) => <b>{__cs_props.children}</b>)());

it("awaitInTagChildSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInTagChildSplice",
    cs.lift(await (async () => (void (Badge), (await (async ($Badge) => <$Badge>{(cs.splice(await fetchGreeting()))}</$Badge>)(cs.splice((Badge))))))()),
  );
});

// A tag in a function the script writes, in a script that awaits: that
// function isn't async, so the tag's isn't awaited there.
it("awaitBesideMappedTag", async (t) => {
  await snapshotCase(
    t,
    "awaitBesideMappedTag",
    cs.lift(await (async () => (
      <p>
        {(cs.splice(await fetchGreeting()))}
        {[1, 2].map((__cs_n: number) => (
          (void (Badge), (($Badge) => <$Badge>{__cs_n}</$Badge>)(cs.splice((Badge))))
        ))}
      </p>
    ))()),
  );
});

// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response: Client<Promise<Response>> = cs.lift((() => cs.globalThis.fetch("/rows"))());
  return response;
}
