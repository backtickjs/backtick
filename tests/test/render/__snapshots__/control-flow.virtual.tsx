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

const indexed = cs.lift((() => <ul>
  {(void <cs.tag>{(Index)}</cs.tag>, cs.splice((Index))({ each: cs.splice((rows)), children: (__cs_row: () => string, __cs_index: number) => <li>{__cs_index + ": " + __cs_row()}</li> }))}
</ul>)());

const switched = cs.lift((() => (void <cs.tag>{(Switch)}</cs.tag>, cs.splice((Switch))({ fallback: <p>none</p>, children: [(void <cs.tag>{(Match)}</cs.tag>, cs.splice((Match))({ when: 1 > 2, children: <p>wrong</p> })), (void <cs.tag>{(Match)}</cs.tag>, cs.splice((Match))({ when: 2 > 1, children: <p>right</p> }))] })))());

const caught = cs.lift((() => (void <cs.tag>{(ErrorBoundary)}</cs.tag>, cs.splice((ErrorBoundary))({ fallback: <p>caught</p>, children: cs.splice(cs.lift((() => {
    throw "drawn wrong";
  })())) })))());

const suspended = cs.lift((() => (void <cs.tag>{(Suspense)}</cs.tag>, cs.splice((Suspense))({ fallback: <p>loading</p>, children: <p>loaded</p> })))());

const portaled = cs.lift((() => <div>
  <p>here</p>
  {(void <cs.tag>{(Portal)}</cs.tag>, cs.splice((Portal))({ children: <p>elsewhere</p> }))}
</div>)());

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
