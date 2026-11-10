import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { ErrorBoundary, Index, Match, Suspense, Switch } from "solid-js" with {
  backtick: "client",
};
import { Portal } from "solid-js/web" with { backtick: "client" };
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";

// Solid's control flow in a script, as Solid types and draws it.

const rows = ["first", "second"];

const indexed = cs`(
  <ul>
    <$Index each={$rows}>
      {(row: () => string, index: number) => <li>{index + ": " + row()}</li>}
    </$Index>
  </ul>
)`;

const switched = cs`(
  <$Switch fallback={<p>none</p>}>
    <$Match when={1 > 2}>
      <p>wrong</p>
    </$Match>
    <$Match when={2 > 1}>
      <p>right</p>
    </$Match>
  </$Switch>
)`;

// A boundary, a portal and what they hold are components, drawn where they're
// placed, as in plain Solid: made at load, they'd have no owner to catch,
// suspend or clean up in.
const Thrower = cs`() => {
  throw "drawn wrong";
}`;
const caught = cs`() => (
  <$ErrorBoundary fallback={<p>caught</p>}>
    <$Thrower />
  </$ErrorBoundary>
)`;

const suspended = cs`() => (
  <$Suspense fallback={<p>loading</p>}>
    <p>loaded</p>
  </$Suspense>
)`;

const portaled = cs`() => (
  <div>
    <p>here</p>
    <$Portal>
      <p>elsewhere</p>
    </$Portal>
  </div>
)`;

describe("control flow in a script", () => {
  it("draws each position with Index", async () => {
    render(await evaluate(() => indexed));
    assert.deepEqual(
      screen.getAllByRole("listitem").map((item) => item.textContent),
      ["0: first", "1: second"],
    );
  });

  it("draws the first Match that holds", async () => {
    render(await evaluate(() => switched));
    assert.ok(screen.getByText("right"));
    assert.equal(screen.queryByText("wrong"), null);
  });

  it("draws the fallback of an ErrorBoundary around a script that throws", async () => {
    render(await evaluate(caught));
    assert.ok(screen.getByText("caught"));
  });

  it("draws a Portal's children outside where it stands", async () => {
    const { container } = render(await evaluate(portaled));
    assert.ok(container.textContent?.includes("here"));
    assert.ok(!container.textContent?.includes("elsewhere"));
    assert.ok(screen.getByText("elsewhere"));
  });

  it("draws Suspense's children when nothing is pending", async () => {
    render(await evaluate(suspended));
    assert.ok(screen.getByText("loaded"));
  });
});

it("indexed", async (t) => {
  await snapshotCase(t, "indexed", indexed);
});

it("switched", async (t) => {
  await snapshotCase(t, "switched", switched);
});
