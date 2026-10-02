import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
// Text a page's markup would end early on, were the bundle written into it.
const text = `& < > " ' </script> <!-- -->`;
const scriptCloseText = _jsx("p", { children: text });
const drawn = [];
afterEach(() => drawn.splice(0).forEach((container) => container.remove()));
// A page as its server writes it: a container, and the client entry drawing
// into it, run as its module script would be.
async function draw(element) {
  const id = `app-${drawn.length}`;
  const container = document.createElement("div");
  container.id = id;
  document.body.append(container);
  drawn.push(container);
  await evaluate(
    cs.create(
      "13kggozl76hsb:25:4",
      {
        params: [
          { kind: "splice", value: render, bindings: [] },
          { kind: "splice", value: element, bindings: [] },
          { kind: "splice", value: id, bindings: [] },
        ],
      },
      "($splice0, $splice1, $splice2) => $splice0()(() => $splice1(), document.getElementById($splice2()))",
      '{"version":3,"file":"render.test.jsx","sourceRoot":"","sources":["page/render.test.tsx"],"names":[],"mappings":"AAwBO,kCAAA,UAAO,CAAC,GAAG,EAAE,CAAC,UAAQ,EAAE,QAAQ,CAAC,cAAc,CAAC,UAAG,CAAgB,CAAC"}',
    ),
  );
  return container;
}
describe("a page's client entry", () => {
  it("draws the text as written, where it names", async () => {
    const container = await draw(scriptCloseText);
    assert.equal(container.querySelector("p")?.textContent, text);
  });
  it("draws each bundle into its own container", async () => {
    const first = await draw(_jsx("p", { children: "first" }));
    const second = await draw(_jsx("p", { children: "second" }));
    assert.equal(first.textContent, "first");
    assert.equal(second.textContent, "second");
  });
});
describe("what each case compiles and bundles to", () => {
  it("scriptCloseText", async (t) => {
    await snapshotCase(t, "scriptCloseText", scriptCloseText);
  });
});
