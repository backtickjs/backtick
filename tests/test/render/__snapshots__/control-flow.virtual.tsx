import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  ErrorBoundary,
  Index,
  Match,
  Portal,
  Suspense,
  Switch,
} from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";

// Solid's control flow written in host JSX, around what scripts draw: each is
// a server component, so the host can write it where a page is laid out.

const rows = ["first", "second"];

const indexed = (
  <ul>
    <Index each={cs.lift((() => cs.splice((rows)))())}>
      {cs.lift((() => (__cs_row: () => string, __cs_index: number) => <li>{__cs_index + ": " + __cs_row()}</li>)())}
    </Index>
  </ul>
);

const switched = (
  <Switch fallback={<p>none</p>}>
    <Match when={cs.lift((() => 1 > 2)())}>
      <p>wrong</p>
    </Match>
    <Match when={cs.lift((() => 2 > 1)())}>
      <p>right</p>
    </Match>
  </Switch>
);

const caught = (
  <ErrorBoundary fallback={<p>caught</p>}>
    {cs.lift((() => {
    throw "drawn wrong";
})())}
  </ErrorBoundary>
);

const suspended = (
  <Suspense fallback={<p>loading</p>}>
    <p>loaded</p>
  </Suspense>
);

const portaled = (
  <div>
    <p>here</p>
    <Portal>
      <p>elsewhere</p>
    </Portal>
  </div>
);

describe("control flow in host JSX", () => {
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
    render(await evaluate(() => caught));
    assert.ok(screen.getByText("caught"));
  });

  it("draws a Portal's children outside where it stands", async () => {
    const { container } = render(await evaluate(() => portaled));
    assert.ok(container.textContent?.includes("here"));
    assert.ok(!container.textContent?.includes("elsewhere"));
    assert.ok(screen.getByText("elsewhere"));
  });

  it("draws Suspense's children when nothing is pending", async () => {
    render(await evaluate(() => suspended));
    assert.ok(screen.getByText("loaded"));
  });
});

it("indexed", async (t) => {
  await snapshotCase(t, "indexed", indexed);
});

it("switched", async (t) => {
  await snapshotCase(t, "switched", switched);
});
