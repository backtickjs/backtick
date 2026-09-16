import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";
import { createInterpreter } from "@backtickjs/web-interpreter";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "./snapshotCase.ts";

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
//
// Beside that: a bundle a script evaluates, a tag naming a function a script
// holds, and the namespace an element is drawn in.

// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// The anchor tests below draw this into a target that is already holding
// something and empty it, which a claim to the whole target would take with it.
async function Rows() {
  return cs`{
    const ids = $state<number[]>([1, 2, 3]);
    const clear = () => {
      ids.update(() => []);
    };
    return (
      <>
        <span onclick={clear}>clear</span>
        <For each={ids.read()}>
          {(id: number) => <span>{"row " + id}</span>}
        </For>
      </>
    );
  }`;
}

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs`<For each={[1, 2, 3]}>
    {(n: number) => <span>{"item " + n}</span>}
  </For>`;
}

const items = await bundler.run(<Items />);
const total = await bundler.run(41);

const vmEval = cs`<div>
  {$vm.eval($items)}
  <b>{$vm.eval($total) + 1}</b>
</div>`;

// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

const scriptBoundTag = cs`{
  const count = $state(0);
  const Badge = $vm.eval($badge);

  return (
    <div>
      <Badge count={count.read()} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

const scriptBoundTagLoading = cs`{
  const count = $state(0);
  const drawn = $state<Bundle<
    (props: { count: number }) => BacktickElement
  > | null>(null);
  const Badge = (props: { count: number }) => {
    const held = drawn.read();
    return held === null ? null : $vm.eval(held)(props);
  };

  return (
    <div>
      {drawn.read() === null ? <i>loading</i> : <Badge count={count.read()} />}
      <button onclick={() => drawn.write($loadedBadge)}>load</button>
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;

// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs`{
  const count = $state(0);
  const Badge = (props: { n: number }) => <b>{"n " + props.n}</b>;

  return (
    <div>
      {${cs`<Badge n={count.read()} />`}}
      {
        ${cs`{
          const skipped = 10;
          return ${cs`<Badge n={count.read() + 100} />`};
        }`}
      }
      {${(<section>{cs`<Badge n={count.read() + 1000} />`}</section>)}}
      {
        ${cs`<For each={[1, 2]}>
          {(m: number) => <Badge n={m * count.read()} />}
        </For>`}
      }
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;

// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props: { body: Prop<BacktickElement> }) {
  return cs`{
    const Badge = (p: { n: number }) => <i>{"panel " + p.n}</i>;
    return (
      <section>
        <Badge n={0} />
        {$props.body}
      </section>
    );
  }`;
}

// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs`{
  const count = $state(0);
  const Badge = (p: { n: number; children: BacktickElement }) => (
    <b>
      {"outer " + p.n}
      {p.children}
    </b>
  );

  return (
    <div>
      <Panel
        body={
          ${cs`<Badge n={count.read()}>
            <u>{"kid " + count.read()}</u>
          </Badge>`}
        }
      />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;

// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs`<circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" />`;
}

const svgNamespace = cs`{
  const Dot = (props: { x: number }) => (
    <circle cx={props.x} cy="5" r="2">
      <title>{"dot " + props.x}</title>
    </circle>
  );

  return (
    <div>
      <a href="/shapes">{"shapes"}</a>
      <svg viewBox="0 0 30 10" width="120">
        <Ring />
        <For each={[10, 20]}>{(x: number) => <Dot x={x} />}</For>
        <foreignObject x="0" y="0" width="10" height="10">
          <p>{"html again"}</p>
        </foreignObject>
      </svg>
    </div>
  );
}`;

// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
const svgNamespaceLater = cs`{
  const xs = $state([10]);
  const shown = $state(false);

  return (
    <div>
      <svg viewBox="0 0 30 10">
        <For each={xs.read()}>{(x: number) => <title>{"dot " + x}</title>}</For>
        {shown.read() ? <title>{"shown"}</title> : null}
      </svg>
      <title>{"after"}</title>
      <button onclick={() => xs.write([10, 20])}>add</button>
      <button onclick={() => shown.write(true)}>show</button>
    </div>
  );
}`;

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
// where a drawing goes among a page's own nodes is the interpreter's business —
// so these ask the interpreter directly.
async function drawAt(
  value: BacktickElement,
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

describe("a bundle a script runs with vm.eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(vmEval);

    const div = container.firstElementChild!;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});

describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);

    const badge = screen.getByText("count 0");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });

  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
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
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });

  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
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
    const { container } = await render(svgNamespace);

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
    const { container } = await render(svgNamespaceLater);
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

describe("what each case compiles and bundles to", () => {
  it("Rows", async (t) => {
    await snapshotCase(t, "Rows", <Rows />);
  });

  it("vmEval", async (t) => {
    await snapshotCase(t, "vmEval", vmEval);
  });

  it("scriptBoundTag", async (t) => {
    await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
  });

  it("scriptBoundTagLoading", async (t) => {
    await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
  });

  it("scriptBoundTagCapture", async (t) => {
    await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
  });

  it("scriptBoundTagCarried", async (t) => {
    await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
  });

  it("svgNamespace", async (t) => {
    await snapshotCase(t, "svgNamespace", svgNamespace);
  });

  it("svgNamespaceLater", async (t) => {
    await snapshotCase(t, "svgNamespaceLater", svgNamespaceLater);
  });
});
