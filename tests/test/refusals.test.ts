import type { Bundle, ClientUnknown } from "@backtickjs/core";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluate, render } from "@backtickjs/test-vm";
import { createSourceLoader } from "./importFixture.ts";

// The two ways a bundle could run what wrote it, each held to not happening.
//
// A bundle is walked node by node by the renderer rather than parsed as markup,
// so what a hostile one can reach is what these two answer with — which is why
// each case asserts the thing did not happen, not that something was cleaned up.
//
// The sources are ones the typechecker refuses; compiled anyway, they are the
// bundle a server that skipped it would send.
const importSource = createSourceLoader("refusals");

// A page a refused source was drawn into, read after the refusal: the body
// holds what was there before, and nothing the source asked for.
async function refused(source: string, message: RegExp): Promise<Element> {
  const page = await render(await importSource("export default <main />;"));
  await assert.rejects(page.render(await importSource(source)), message);
  assert.equal(page.container.innerHTML, "<main></main>");
  return page.container;
}

// A drawing and the one element it put in the page.
async function drawn(source: string): Promise<Element> {
  const { container } = await render(await importSource(source));
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
      `export default <div><script>{"alert(1)"}</script></div>;`,
      /may not draw a `script`/,
    );
  });

  it("is refused in SVG", async () => {
    await refused(
      `export default <svg><script>{"alert(1)"}</script></svg>;`,
      /may not draw/,
    );
  });

  // HTML folds a tag name, so every spelling of it is the element.
  it("is refused in HTML whatever its case", () => {
    for (const tag of ["SCRIPT", "Script"]) {
      assert.throws(() => evaluate(element(tag)), /may not draw/, tag);
    }
  });

  // SVG does not fold, so `svg:SCRIPT` is an unknown element rather than the
  // one that runs. Verified in Chrome rather than read off the spec.
  it("does not stop a tag that only looks like one", async () => {
    const drawn = evaluate(element("svg:SCRIPT")) as unknown as Element;
    assert.equal(drawn.localName, "SCRIPT");
    const { container } = await render(
      await importSource(
        "export default <div><script-viewer /><marquee /></div>;",
      ),
    );
    assert.ok(container.querySelector("script-viewer"));
    assert.ok(container.querySelector("marquee"));
  });
});

describe("a handler that is not a function", () => {
  // `setAttribute("onerror", "…")` is source text the browser compiles, so a
  // string reaching an `on` name is a working inline handler.
  it("never reaches the attribute", async () => {
    for (const prop of ["onerror", "onclick", "onError", "ONCLICK"]) {
      await refused(
        `export default <img ${prop}="alert(1)" />;`,
        /takes a function/,
      );
    }
  });

  it("is refused whatever kind of value it is", async () => {
    for (const value of [`"alert(1)"`, "true", "1"]) {
      await refused(
        `export default <div onclick={${value}} />;`,
        /takes a function/,
      );
    }
  });

  it("leaves a function alone", async () => {
    const div = await drawn(
      `import { cs } from "@backtickjs/core";
      export default cs\`<div onclick={() => {}} />\`;`,
    );
    assert.equal(div.attributes.length, 0);
  });

  // The other direction: a function under a name no event answers to would have
  // been registered nowhere, which reads afterwards as a handler that never
  // fired.
  it("is refused the other way round too", async () => {
    await refused(
      `import { cs } from "@backtickjs/core";
      export default cs\`<div title={() => {}} />\`;`,
      /takes a value, not a function/,
    );
  });

  // Nothing this removes was ever set, so a prop that went away stays a prop
  // that went away rather than becoming an error a drawing has to survive.
  it("lets an absent handler stay absent", async () => {
    for (const value of ["null", "undefined"]) {
      const div = await drawn(
        `import { cs } from "@backtickjs/core";
        export default cs\`<div onclick={${value}} />\`;`,
      );
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
    await refused(`export default <div one="1" />;`, /takes a function/);
  });
});
