import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import type { JSXElement } from "@backtickjs/solid-js";
import { render } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// Text a page's markup would end early on, were the bundle written into it.
const text = `& < > " ' </script> <!-- -->`;
const scriptCloseText = cs`<p>{$text}</p>`;

const drawn: Element[] = [];
afterEach(() => drawn.splice(0).forEach((container) => container.remove()));

// A page as its server writes it: a container, and the client entry drawing
// into it, run as its module script would be.
async function draw(element: Client<JSXElement>): Promise<Element> {
  const id = `app-${drawn.length}`;
  const container = document.createElement("div");
  container.id = id;
  document.body.append(container);
  drawn.push(container);
  await evaluate(
    cs`$render(() => $element, document.getElementById($id) as HTMLElement)`,
  );
  return container;
}

describe("a page's client entry", () => {
  it("draws the text as written, where it names", async () => {
    const container = await draw(scriptCloseText);
    assert.equal(container.querySelector("p")?.textContent, text);
  });

  it("draws each bundle into its own container", async () => {
    const first = await draw(cs`<p>first</p>`);
    const second = await draw(cs`<p>second</p>`);
    assert.equal(first.textContent, "first");
    assert.equal(second.textContent, "second");
  });
});

describe("what each case compiles and bundles to", () => {
  it("scriptCloseText", async (t) => {
    await snapshotCase(t, "scriptCloseText", scriptCloseText);
  });
});
