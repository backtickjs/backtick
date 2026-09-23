import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type {
  BacktickElement,
  Bundle,
  ClientUnknown,
  Spliceable,
} from "@backtickjs/core";
import { evaluateBundle, render } from "@backtickjs/web-testing";

// The two ways a bundle could run what wrote it, each held to not happening.
//
// A bundle is walked node by node by the renderer rather than parsed as markup,
// so what a hostile one can reach is what these two answer with — which is why
// each case asserts the thing did not happen, not that something was cleaned up.
//
// The drawings are ones the typechecker refuses, written anyway under
// `@ts-expect-error`: they are the bundle a server that skipped it would send.

// A container a refused drawing was drawn into, read after the refusal: it
// holds what the page put there before, and nothing the drawing asked for.
async function refused(
  value: Spliceable<BacktickElement>,
  message: RegExp,
): Promise<void> {
  const container = document.body.appendChild(document.createElement("div"));
  container.innerHTML = "<main></main>";
  await assert.rejects(render(value, { container }), message);
  assert.equal(container.innerHTML, "<main></main>");
}

// A drawing and the one element it put in the page.
async function drawn(value: Spliceable<BacktickElement>): Promise<Element> {
  const { container } = await render(value);
  return container.firstElementChild!;
}

// An element whose tag no source can spell: JSX reads a capital as a
// component, so this is the bundle written by hand.
const element = (tag: string): Bundle<ClientUnknown> =>
  ({
    functions: {},
    root: ["el", tag, {}],
  }) as unknown as Bundle<ClientUnknown>;

describe("a tag that would execute", () => {
  it("is refused in HTML", async () => {
    await refused(
      <div>
        {
          // @ts-expect-error: `script` is not an element this client draws
          <script>{"alert(1)"}</script>
        }
      </div>,
      /may not draw a `script`/,
    );
  });

  it("is refused in SVG", async () => {
    await refused(
      <svg>
        {
          // @ts-expect-error: `script` is not an element this client draws
          <script>{"alert(1)"}</script>
        }
      </svg>,
      /may not draw/,
    );
  });

  // HTML folds a tag name, so every spelling of it is the element.
  it("is refused in HTML whatever its case", () => {
    for (const tag of ["SCRIPT", "Script"]) {
      assert.throws(() => evaluateBundle(element(tag)), /may not draw/, tag);
    }
  });

  // SVG does not fold, so `svg:SCRIPT` is an unknown element rather than the
  // one that runs. Verified in Chrome rather than read off the spec.
  it("does not stop a tag that only looks like one", async () => {
    const svgScript = evaluateBundle(
      element("svg:SCRIPT"),
    ) as unknown as Element;
    assert.equal(svgScript.localName, "SCRIPT");
    const { container } = await render(
      <div>
        {
          // @ts-expect-error: `script-viewer` is not an element this client draws
          <script-viewer />
        }
        {
          // @ts-expect-error: `marquee` is not an element this client draws
          <marquee />
        }
      </div>,
    );
    assert.ok(container.querySelector("script-viewer"));
    assert.ok(container.querySelector("marquee"));
  });
});

describe("a handler that is not a function", () => {
  // `setAttribute("onerror", "…")` is source text the browser compiles, so a
  // string reaching an `on` name is a working inline handler.
  it("never reaches the attribute", async () => {
    const handlers: BacktickElement[] = [
      // @ts-expect-error: a handler takes a function
      <img onerror="alert(1)" />,
      // @ts-expect-error: a handler takes a function
      <img onclick="alert(1)" />,
      // @ts-expect-error: `onError` is not a prop an `img` takes
      <img onError="alert(1)" />,
      // @ts-expect-error: `ONCLICK` is not a prop an `img` takes
      <img ONCLICK="alert(1)" />,
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });

  it("is refused whatever kind of value it is", async () => {
    const handlers: BacktickElement[] = [
      // @ts-expect-error: a handler takes a function
      <div onclick="alert(1)" />,
      // @ts-expect-error: a handler takes a function
      <div onclick={true} />,
      // @ts-expect-error: a handler takes a function
      <div onclick={1} />,
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });

  it("leaves a function alone", async () => {
    const div = await drawn(cs.lift(cs.const(<div onclick={cs.lift(() => {
})}/>)));
    assert.equal(div.attributes.length, 0);
  });

  // The other direction: a function under a name no event answers to would have
  // been registered nowhere, which reads afterwards as a handler that never
  // fired.
  it("is refused the other way round too", async () => {
    await refused(
      // @ts-expect-error: `title` takes a value, not a function
      cs.lift(cs.const(<div title={cs.lift(() => {
})}/>)),
      /takes a value, not a function/,
    );
  });

  // Nothing this removes was ever set, so a prop that went away stays a prop
  // that went away rather than becoming an error a drawing has to survive.
  // Absent is what a read past the end of an array is.
  it("lets an absent handler stay absent", async () => {
    const absent: Spliceable<BacktickElement>[] = [
      // @ts-expect-error: a handler takes a function, not `null`
      cs.lift(cs.const(<div onclick={cs.lift(null)}/>)),
      cs.lift(cs.const(<div onclick={cs.lift([() => {
    }][1])}/>)),
    ];
    for (const value of absent) {
      const div = await drawn(value);
      assert.equal(div.attributes.length, 0);
    }
  });

  // The rule is the prefix, not a list of events, so it refuses names no browser
  // would have run — `one`, `onset`, an `onboarding` a custom element made up.
  // Deliberate: which `on` names execute is the browser's list and it grows,
  // and a rule that has to be kept level with it is a rule that falls behind.
  // Nothing in HTML takes an attribute that starts this way and is not a
  // handler, so what this costs is a name nobody has.
  it("refuses a name that merely starts the same", async () => {
    // @ts-expect-error: `one` is not a prop a `div` takes
    await refused(<div one="1" />, /takes a function/);
  });
});
