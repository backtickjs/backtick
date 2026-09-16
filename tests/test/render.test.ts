import assert from "node:assert/strict";
import { join } from "node:path";
import { afterEach, describe, it } from "node:test";
import type { Spliceable } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { createInterpreter } from "@backtickjs/web-interpreter";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";

// Where a render draws, and what it may move.
//
// An anchor is one of the target's children: drawn in front of, and kept in
// front of. What the host holds on either side of it is the host's, so a target
// is never a render's to empty — the anchor is what says where the drawing ends.
//
// The web is what wants this — a bundle leaves a comment where it stood and draws
// in front of it, so a page's own markup keeps its order — but nothing here is
// the web's: an anchor is one of the host's own nodes, so this is the same claim
// on every target.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("render");

// What a target holds, by tag — `#text` for the text nodes a drawing inserted,
// as a document names them.
function tags(parent: Node): string[] {
  return [...parent.childNodes].map((child) => child.nodeName.toLowerCase());
}

// What a drawing put in a target, as the nodes themselves.
function held(parent: Node): Node[] {
  return [...parent.childNodes];
}

// A list at the root, so a write moves children of the target itself.
const rootList = () => importFixture(validDir, "root-list.tsx");

// The first drawing's button that empties its list.
const clear = () => screen.getAllByText("clear")[0]!;

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
// where a drawing goes among a page's own nodes is the interpreter's business —
// so these ask the interpreter directly.
async function drawAt(
  value: Spliceable,
  parent: Element,
  selector: string,
): Promise<void> {
  const unmount = createInterpreter({ window }).render(
    await bundler.run(value),
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
    await drawAt(await rootList(), container, "comment");

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
    await drawAt(await rootList(), container, "comment");
    const [before] = held(container);
    const after = held(container).at(-1);

    await userEvent.click(clear());

    assert.deepEqual(tags(container), ["header", "span", "comment", "footer"]);
    assert.equal(held(container)[0], before);
    assert.equal(held(container).at(-1), after);
  });

  it("never claims a target it was given nothing else of", async () => {
    // An anchor is always a node, so the path that empties a whole target is
    // one this cannot take — an empty target holding only the anchor included.
    const container = target("<comment></comment>");
    await drawAt(await rootList(), container, "comment");

    await userEvent.click(clear());

    assert.deepEqual(tags(container), ["span", "comment"]);
  });

  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const container = target("<comment-1></comment-1><comment-2></comment-2>");
    await drawAt(await rootList(), container, "comment-1");
    await drawAt(await rootList(), container, "comment-2");

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
    const tail = held(container).slice(held(container).indexOf(first));
    await userEvent.click(clear());

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
      held(container).slice(held(container).indexOf(first)),
      tail,
    );
  });
});

describe("a bundle a script runs with vm.eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(
      await importFixture(validDir, "vm-eval.tsx"),
    );

    const div = container.firstElementChild!;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});

describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(await importFixture(validDir, "script-bound-tag.tsx"));

    const badge = screen.getByText("count 0");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });

  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(await importFixture(validDir, "script-bound-tag-loading.tsx"));
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");

    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);

    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });

  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(
      await importFixture(validDir, "script-bound-tag-capture.tsx"),
    );
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });

  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(await importFixture(validDir, "script-bound-tag-carried.tsx"));
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});

describe("an element's namespace", () => {
  // What an element ended up in, read off the document rather than off what the
  // renderer was asked for: a tag in SVG's namespace is written `svg:<tag>`, as
  // the interpreter names one, and a tag in HTML's is written bare.
  const SVG = "http://www.w3.org/2000/svg";

  function namespaced(parent: Node): string[] {
    return [...parent.childNodes].flatMap((child) => {
      if (child.nodeType !== child.ELEMENT_NODE) {
        return namespaced(child);
      }
      const element = child as Element;
      const tag =
        element.namespaceURI === SVG
          ? `svg:${element.tagName}`
          : element.tagName.toLowerCase();
      return [tag, ...namespaced(child)];
    });
  }

  it("is where the element is drawn", async () => {
    const { container } = await render(
      await importFixture(validDir, "svg-namespace.tsx"),
    );

    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(container).sort(), [
      "a",
      "div",
      "p",
      "svg:circle",
      "svg:circle",
      "svg:circle",
      "svg:foreignObject",
      "svg:svg",
      "svg:title",
      "svg:title",
    ]);
  });

  // Nothing walks down from the top when a list or a condition draws again, so
  // what it draws has to have kept the namespace from the first pass.
  it("is kept by what draws again later", async () => {
    const { container } = await render(
      await importFixture(validDir, "svg-namespace-later.tsx"),
    );
    assert.deepEqual(namespaced(container).sort(), [
      "button",
      "button",
      "div",
      "svg:svg",
      "svg:title",
      "title",
    ]);

    // What the two writes added, which is the claim: a title drawn later is
    // still SVG's, and the one beside it is still HTML's.
    const before = namespaced(container).sort();
    await userEvent.click(screen.getByRole("button", { name: "add" }));
    await userEvent.click(screen.getByRole("button", { name: "show" }));
    assert.deepEqual(added(before, namespaced(container).sort()), [
      "svg:title",
      "svg:title",
    ]);
  });

  // What the second list holds that the first did not, counting duplicates.
  function added(before: string[], after: string[]): string[] {
    const held = [...before];
    return after.filter((tag) => {
      const at = held.indexOf(tag);
      if (at === -1) {
        return true;
      }
      held.splice(at, 1);
      return false;
    });
  }
});
