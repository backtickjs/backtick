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
  await snapshotCase(t, "awaitInSplice", cs`${await fetchGreeting()} + "!"`);
});

it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs`{
      const greeting = ${await fetchGreeting()};
      return greeting + "!";
    }`,
  );
});

// The same `await`, in a splice that is a child of a component tag, which
// the typechecker reads as JSX in a function of its own: awaited there too.
const Badge = cs`(props: { children: JSX.Element }) => <b>{props.children}</b>`;

it("awaitInTagChildSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInTagChildSplice",
    cs`<$Badge>{${await fetchGreeting()}}</$Badge>`,
  );
});

// A tag in a function the script writes, in a script that awaits: that
// function isn't async, so the tag's isn't awaited there.
it("awaitBesideMappedTag", async (t) => {
  await snapshotCase(
    t,
    "awaitBesideMappedTag",
    cs`(
      <p>
        {${await fetchGreeting()}}
        {[1, 2].map((n: number) => (
          <$Badge>{n}</$Badge>
        ))}
      </p>
    )`,
  );
});

// A splice is evaluated on the host when its script is, whatever client code
// it's written inside, so an `await` in it is the host's `await` there too:
// inside a function the script writes, and inside a script nested in a splice.
it("awaitInClientArrowSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInClientArrowSplice",
    cs`(() => ${await fetchGreeting()} + "!")()`,
  );
});

it("awaitInFunctionScriptSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInFunctionScriptSplice",
    cs`(name: string) => ${await fetchGreeting()} + ", " + name`,
  );
});

it("awaitInCallbackSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInCallbackSplice",
    cs`[1, 2].map((n: number) => ${await fetchGreeting()} + n)`,
  );
});

it("awaitInNestedScriptSplice", async (t) => {
  const nested = cs`${cs`${await fetchGreeting()} + "!"`} + "?"`;
  await snapshotCase(t, "awaitInNestedScriptSplice", nested);
});

// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response: Client<Promise<Response>> = cs`fetch("/rows")`;
  return response;
}
