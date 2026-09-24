import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For, state } from "@backtickjs/core";
import type { BacktickElement } from "@backtickjs/core";
import { createRuntime } from "@backtickjs/web-interpreter";
import { screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// Where a render draws, and what it may move.
//
// An anchor is one of the target's children: drawn in front of, and kept in
// front of. What the host holds on either side of it is the host's, so a target
// is never a render's to empty — the anchor is what says where the drawing
// ends.
//
// The web is what wants this — a bundle leaves a comment where it stood and
// draws in front of it, so a page's own markup keeps its order — but nothing
// here is the web's: an anchor is one of the host's own nodes, so this is the
// same claim on every target.

// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// The anchor tests below draw this into a target that is already holding
// something and empty it, which a claim to the whole target would take with it.
async function Rows() {
  return cs.lift((() => {
    const __cs_ids = (cs.splice((state)) satisfies typeof cs.ClientUnknown)<number[]>([1, 2, 3]);
    const __cs_clear = () => {
        __cs_ids.set([]);
    };
    return <>{cs.lift(<span onclick={cs.lift(__cs_clear)}>clear</span>)}{cs.lift(<For each={cs.lift(__cs_ids.get())}>{cs.lift((__cs_id: number) => <span>{cs.lift("row " + __cs_id)}</span>)}</For>)}</>;
})());
}

it("Rows", async (t) => {
  await snapshotCase(t, "Rows", <Rows />);
});

// What a target holds, by tag — `#text` for the text nodes a drawing inserted,
// as a document names them.
function tags(parent: Node): string[] {
  return [...parent.childNodes].map((child) => child.nodeName.toLowerCase());
}

// What a drawing put in a target, as the nodes themselves.
function nodesIn(parent: Node): Node[] {
  return [...parent.childNodes];
}

// The first drawing's button that empties its list.
const clearButton = () => screen.getAllByText("clear")[0]!;

// What each test drew and added to the page, taken down after it, last first.
const undo: (() => void)[] = [];

afterEach(() => {
  for (const step of undo.splice(0).reverse()) {
    step();
  }
});

// A target in the page holding the markup given, as a page's own would.
function target(html: string): Element {
  const main = document.createElement("main");
  main.innerHTML = html;
  document.body.append(main);
  undo.push(() => main.remove());
  return main;
}

// Draws in front of the anchor `selector` names. `render` takes no anchor —
// where a drawing goes among a page's own nodes is the runtime's business —
// so these ask the runtime directly.
async function drawAt(
  value: BacktickElement,
  parent: Element,
  selector: string,
): Promise<void> {
  const code = await bundler.run(value);
  const unmount = createRuntime({ window, global: globalThis }).render(
    () => (0, eval)(code),
    parent,
    parent.querySelector(selector)!,
  );
  undo.push(unmount);
}

describe("where a render draws", () => {
  it("draws in front of its anchor", async () => {
    const container = target(
      "<header></header><comment></comment><footer></footer>",
    );
    await drawAt(<Rows />, container, "comment");

    assert.deepEqual(tags(container), [
      "header",
      "span",
      "span",
      "span",
      "span",
      "comment",
      "footer",
    ]);
  });

  it("leaves alone what the host holds on either side", async () => {
    // A root that is a list, emptied. A render that claimed its target would
    // take every child the target has, the host's own included; what is drawn
    // is what goes.
    const container = target(
      "<header></header><comment></comment><footer></footer>",
    );
    await drawAt(<Rows />, container, "comment");
    const [before] = nodesIn(container);
    const after = nodesIn(container).at(-1);

    await userEvent.click(clearButton());

    assert.deepEqual(tags(container), ["header", "span", "comment", "footer"]);
    assert.equal(nodesIn(container)[0], before);
    assert.equal(nodesIn(container).at(-1), after);
  });

  it("never claims a target it was given nothing else of", async () => {
    // An anchor is always a node, so the path that empties a whole target is
    // one this cannot take — an empty target holding only the anchor included.
    const container = target("<comment></comment>");
    await drawAt(<Rows />, container, "comment");

    await userEvent.click(clearButton());

    assert.deepEqual(tags(container), ["span", "comment"]);
  });

  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const container = target("<comment-1></comment-1><comment-2></comment-2>");
    await drawAt(<Rows />, container, "comment-1");
    await drawAt(<Rows />, container, "comment-2");

    assert.deepEqual(tags(container), [
      "span",
      "span",
      "span",
      "span",
      "comment-1",
      "span",
      "span",
      "span",
      "span",
      "comment-2",
    ]);

    // Everything from the first anchor onwards, as the nodes it is.
    const first = container.querySelector("comment-1")!;
    const tail = nodesIn(container).slice(nodesIn(container).indexOf(first));
    await userEvent.click(clearButton());

    // The first drawing shrank and the second is the nodes it was, in order.
    assert.deepEqual(tags(container), [
      "span",
      "comment-1",
      "span",
      "span",
      "span",
      "span",
      "comment-2",
    ]);
    assert.deepEqual(
      nodesIn(container).slice(nodesIn(container).indexOf(first)),
      tail,
    );
  });
});
