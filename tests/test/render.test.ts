import type { ClientUnknown } from "@backtickjs/core";
import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { openPage } from "@backtickjs/test-vm";
import type { Element, Node } from "@backtickjs/test-vm";

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

// One page for the file: each test draws into a target of its own inside it,
// so what a drawing may touch is bounded by that target rather than by the page.
const site = openPage();
const { document } = site;

function render(
  bundle: Bundle<ClientUnknown>,
  parent: Element,
  options: { anchor?: Node } = {},
): () => void {
  return site.render(bundle, parent, options.anchor);
}

function node(tag: string): Element {
  return document.createElement(tag);
}

// A target holding the nodes named, in that order, as a parsed document would.
function parentOf(...held: Element[]): Element {
  const parent = node("main");
  for (const child of held) {
    parent.appendChild(child);
  }
  return parent;
}

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
async function rootList(): Promise<Bundle<ClientUnknown>> {
  return bundler.run(await importFixture(validDir, "root-list.tsx"));
}

// A click, as a page makes one: the drawing registered a listener, so what a
// test does is fire the event rather than reach for what was registered.
function click(on: Node): void {
  (on as unknown as Element).dispatchEvent(
    new site.page.MouseEvent("click", { bubbles: true }),
  );
}

describe("where a render draws", () => {
  it("draws in front of its anchor", async () => {
    const before = node("header");
    const ends = node("comment");
    const after = node("footer");
    const parent = parentOf(before, ends, after);

    render(await rootList(), parent, { anchor: ends });

    assert.deepEqual(
      tags(parent),
      ["header", "span", "span", "span", "span", "comment", "footer"],
    );
  });

  it("leaves alone what the host holds on either side", async () => {
    // A root that is a list, emptied. A render that claimed its target would
    // take every child the target has, the host's own included; what is drawn
    // is what goes.
    const before = node("header");
    const ends = node("comment");
    const after = node("footer");
    const parent = parentOf(before, ends, after);
    render(await rootList(), parent, { anchor: ends });

    const clear = held(parent)[1];
    assert.ok(clear !== undefined);
    click(clear);

    assert.deepEqual(
      tags(parent),
      ["header", "span", "comment", "footer"],
    );
    assert.equal(held(parent)[0], before);
    assert.equal(held(parent).at(-1), after);
  });

  it("never claims a target it was given nothing else of", async () => {
    // An anchor is always a node, so the path that empties a whole target is
    // one this cannot take — an empty target holding only the anchor included.
    const ends = node("comment");
    const parent = parentOf(ends);
    render(await rootList(), parent, { anchor: ends });

    const clear = held(parent)[0];
    assert.ok(clear !== undefined);
    click(clear);

    assert.deepEqual(
      tags(parent),
      ["span", "comment"],
    );
  });

  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const first = node("comment-1");
    const second = node("comment-2");
    const parent = parentOf(first, second);

    render(await rootList(), parent, { anchor: first });
    render(await rootList(), parent, { anchor: second });

    assert.deepEqual(
      tags(parent),
      [
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
      ],
    );

    // Everything from the first anchor onwards, as the nodes it is.
    const tail = held(parent).slice(held(parent).indexOf(first));
    const clear = held(parent)[0];
    assert.ok(clear !== undefined);
    click(clear);

    // The first drawing shrank and the second is the nodes it was, in order.
    assert.deepEqual(
      tags(parent),
      ["span", "comment-1", "span", "span", "span", "span", "comment-2"],
    );
    assert.deepEqual(
      held(parent).slice(held(parent).indexOf(first)),
      tail,
    );
  });
});

describe("a bundle a script runs with vm.eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "vm-eval.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);

    const div = held(parent)[0] as unknown as Element;
    assert.ok(div !== undefined);
    assert.deepEqual(
      [...div.childNodes].map((child) => child.firstChild?.nodeValue),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});

describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-bound-tag.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);

    const [badge, button] = [...held(parent)[0]!.childNodes];
    assert.ok(badge !== undefined && button !== undefined);
    assert.equal(badge.firstChild?.nodeValue, "count 0");

    click(button);

    const [after] = [...held(parent)[0]!.childNodes];
    assert.equal(after, badge, "the same <b>, updated rather than drawn again");
    assert.equal(badge.firstChild?.nodeValue, "count 1");
  });
  it("draws one that arrives later, and keeps its prop live", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-bound-tag-loading.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);
    const div = held(parent)[0]!;
    assert.equal((div.childNodes[0] as unknown as Element)?.tagName.toLowerCase(), "i");

    click(div.childNodes[1]!); // load
    const badge = div.childNodes[0]! as unknown as Element;
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(badge.firstChild?.nodeValue, "count 0");

    click(div.childNodes[2]!); // more
    assert.equal(div.childNodes[0], badge, "the same <b>, updated in place");
    assert.equal(badge.firstChild?.nodeValue, "count 1");
  });

  it("calls one an enclosing script holds, however the call is nested", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-bound-tag-capture.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);
    const badges = findAll(parent, "b");
    const texts = () => findAll(parent, "b").map((b) => b.firstChild?.nodeValue);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);

    click(findAll(parent, "button")[0]!);

    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(findAll(parent, "b"), badges, "the same <b>s");
  });

  it("calls the one it was written under, drawn where another is in scope", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-bound-tag-carried.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);
    const [panel] = findAll(parent, "i");
    const [badge] = findAll(parent, "b");
    assert.equal(panel?.firstChild?.nodeValue, "panel 0");
    assert.equal(badge?.firstChild?.nodeValue, "outer 0");

    click(findAll(parent, "button")[0]!);

    assert.equal(findAll(parent, "b")[0], badge, "the same <b>");
    assert.equal(badge?.firstChild?.nodeValue, "outer 1");
    assert.equal(findAll(parent, "u")[0]?.firstChild?.nodeValue, "kid 1");
    assert.equal(findAll(parent, "i")[0], panel, "the panel's own, untouched");
  });
});

describe("an element's namespace", () => {
  // What an element ended up in, read off the document rather than off what the
  // renderer was asked for: a tag in SVG's namespace is written `svg:<tag>`, as
  // the interpreter names one, and a tag in HTML's is written bare.
  const SVG = "http://www.w3.org/2000/svg";

  function namespaced(parent: Node): string[] {
    return [...parent.childNodes].flatMap((child) => {
      const element = child as unknown as Element;
      if (element.tagName === undefined) {
        return namespaced(child);
      }
      const tag =
        element.namespaceURI === SVG
          ? `svg:${element.tagName}`
          : element.tagName.toLowerCase();
      return [tag, ...namespaced(child)];
    });
  }

  it("is where the element is drawn", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "svg-namespace.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);

    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(parent).sort(), [
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
    const bundle = await bundler.run(
      await importFixture(validDir, "svg-namespace-later.tsx"),
    );
    const parent = node("main");
    render(bundle, parent);
    assert.deepEqual(namespaced(parent).sort(), [
      "button",
      "button",
      "div",
      "svg:svg",
      "svg:title",
      "title",
    ]);

    // What the two writes added, which is the claim: a title drawn later is
    // still SVG's, and the one beside it is still HTML's.
    const before = namespaced(parent).sort();
    const [add, show] = findAll(parent, "button");
    click(add!);
    click(show!);
    assert.deepEqual(added(before, namespaced(parent).sort()), [
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

// Every element under `from` with this tag, in document order.
function findAll(from: Node, tag: string): Element[] {
  const element = from as unknown as Element;
  return [
    ...(element.tagName?.toLowerCase() === tag ? [element] : []),
    ...[...from.childNodes].flatMap((child) => findAll(child, tag)),
  ];
}
