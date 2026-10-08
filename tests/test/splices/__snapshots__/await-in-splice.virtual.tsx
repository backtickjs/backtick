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

// A splice is evaluated on the host when its script is, whatever client code
// it's written inside, so an `await` in it is the host's `await` there too:
// inside a function the script writes, and inside a script nested in a splice.
// They compile and run, but the typechecker refuses them: a known bug, under
// `@ts-expect-error` until it's fixed, when each directive fails as unused.
it("awaitInClientArrowSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInClientArrowSplice",
    cs.lift(await (async () => (() =>
      // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
      (cs.splice(await fetchGreeting())) + "!")())()),
  );
});

it("awaitInFunctionScriptSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInFunctionScriptSplice",
    cs.lift(await (async () => (__cs_name: string) =>
      // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
      (cs.splice(await fetchGreeting())) + ", " + __cs_name)()),
  );
});

it("awaitInCallbackSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInCallbackSplice",
    cs.lift(await (async () => [1, 2].map(
      (__cs_n: number) =>
        // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
        (cs.splice(await fetchGreeting())) + __cs_n,
    ))()),
  );
});

it("awaitInNestedScriptSplice", async (t) => {
  // @ts-expect-error: Cannot find name 'await'.
  const nested = cs.lift((() => (cs.splice(cs.lift(await (async () => (cs.splice(await fetchGreeting())) + "!")()))) + "?")());
  await snapshotCase(t, "awaitInNestedScriptSplice", nested);
});

// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response: Client<Promise<Response>> = cs.lift((() => cs.globalThis.fetch("/rows"))());
  return response;
}
