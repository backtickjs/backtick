import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  ErrorBoundary,
  Index,
  Match,
  Suspense,
  Switch,
} from "@backtickjs/solid-js";
import { Portal } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";

// Solid's control flow in a script, as Solid types and draws it.

const rows = ["first", "second"];

const indexed = cs.lift(((__cs_Index = cs.splice(Index)) => <ul>{<__cs_Index each={cs.splice((rows))}>{(__cs_row: () => string, __cs_index: number) => <li>{__cs_index + ": " + __cs_row()}</li>}</__cs_Index>}</ul>)());

const switched = cs.lift(((__cs_Switch = cs.splice(Switch), __cs_Match = cs.splice(Match)) => <__cs_Switch fallback={<p>none</p>}>{<__cs_Match when={1 > 2}>{<p>wrong</p>}</__cs_Match>}{<__cs_Match when={2 > 1}>{<p>right</p>}</__cs_Match>}</__cs_Switch>)());

const caught = cs.lift(((__cs_ErrorBoundary = cs.splice(ErrorBoundary)) => <__cs_ErrorBoundary fallback={<p>caught</p>}>{cs.splice(cs.lift((() => {
    throw "drawn wrong";
})()))}</__cs_ErrorBoundary>)());

const suspended = cs.lift(((__cs_Suspense = cs.splice(Suspense)) => <__cs_Suspense fallback={<p>loading</p>}>{<p>loaded</p>}</__cs_Suspense>)());

const portaled = cs.lift(((__cs_Portal = cs.splice(Portal)) => <div>{<p>here</p>}{<__cs_Portal>{<p>elsewhere</p>}</__cs_Portal>}</div>)());

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
