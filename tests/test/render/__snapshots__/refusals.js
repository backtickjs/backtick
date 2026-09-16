import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluateUntrustedBundle, render } from "@backtickjs/web-testing";
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
async function refused(value, message) {
  const container = document.body.appendChild(document.createElement("div"));
  container.innerHTML = "<main></main>";
  await assert.rejects(render(value, { container }), message);
  assert.equal(container.innerHTML, "<main></main>");
}
// A drawing and the one element it put in the page.
async function drawn(value) {
  const { container } = await render(value);
  return container.firstElementChild;
}
// An element whose tag no source can spell: JSX reads a capital as a
// component, so this is the bundle written by hand.
const element = (tag) => ({
  functions: {},
  root: ["el", tag, {}],
});
describe("a tag that would execute", () => {
  it("is refused in HTML", async () => {
    await refused(
      _jsx("div", { children: _jsx("script", { children: "alert(1)" }) }),
      /may not draw a `script`/,
    );
  });
  it("is refused in SVG", async () => {
    await refused(
      _jsx("svg", { children: _jsx("script", { children: "alert(1)" }) }),
      /may not draw/,
    );
  });
  // HTML folds a tag name, so every spelling of it is the element.
  it("is refused in HTML whatever its case", () => {
    for (const tag of ["SCRIPT", "Script"]) {
      assert.throws(
        () => evaluateUntrustedBundle(element(tag)),
        /may not draw/,
        tag,
      );
    }
  });
  // SVG does not fold, so `svg:SCRIPT` is an unknown element rather than the
  // one that runs. Verified in Chrome rather than read off the spec.
  it("does not stop a tag that only looks like one", async () => {
    const svgScript = evaluateUntrustedBundle(element("svg:SCRIPT"));
    assert.equal(svgScript.localName, "SCRIPT");
    const { container } = await render(
      _jsxs("div", {
        children: [_jsx("script-viewer", {}), _jsx("marquee", {})],
      }),
    );
    assert.ok(container.querySelector("script-viewer"));
    assert.ok(container.querySelector("marquee"));
  });
});
describe("a handler that is not a function", () => {
  // `setAttribute("onerror", "…")` is source text the browser compiles, so a
  // string reaching an `on` name is a working inline handler.
  it("never reaches the attribute", async () => {
    const handlers = [
      _jsx("img", { onerror: "alert(1)" }),
      _jsx("img", { onclick: "alert(1)" }),
      _jsx("img", { onError: "alert(1)" }),
      _jsx("img", { ONCLICK: "alert(1)" }),
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });
  it("is refused whatever kind of value it is", async () => {
    const handlers = [
      _jsx("div", { onclick: "alert(1)" }),
      _jsx("div", { onclick: true }),
      _jsx("div", { onclick: 1 }),
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });
  it("leaves a function alone", async () => {
    const div = await drawn(
      cs.create(
        [141, 29, 141, 59],
        {
          version: "0.0.0",
          filePath: "render/refusals.test.tsx",
          fileHash: "2b8eeaba0ce3d",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "jsx",
          loc: [141, 32, 141, 58],
          type: {
            kind: "string",
            loc: [141, 33, 141, 36],
            text: "div",
          },
          attributes: [
            {
              name: "onclick",
              initializer: {
                kind: "=>",
                loc: [141, 46, 141, 54],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [141, 52, 141, 54],
                  statements: [],
                },
              },
            },
          ],
          children: [],
        }),
      ),
    );
    assert.equal(div.attributes.length, 0);
  });
  // The other direction: a function under a name no event answers to would have
  // been registered nowhere, which reads afterwards as a handler that never
  // fired.
  it("is refused the other way round too", async () => {
    await refused(
      cs.create(
        [151, 7, 151, 35],
        {
          version: "0.0.0",
          filePath: "render/refusals.test.tsx",
          fileHash: "2b8eeaba0ce3d",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "jsx",
          loc: [151, 10, 151, 34],
          type: {
            kind: "string",
            loc: [151, 11, 151, 14],
            text: "div",
          },
          attributes: [
            {
              name: "title",
              initializer: {
                kind: "=>",
                loc: [151, 22, 151, 30],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [151, 28, 151, 30],
                  statements: [],
                },
              },
            },
          ],
          children: [],
        }),
      ),
      /takes a value, not a function/,
    );
  });
  // Nothing this removes was ever set, so a prop that went away stays a prop
  // that went away rather than becoming an error a drawing has to survive.
  // Absent is what a read past the end of an array is.
  it("lets an absent handler stay absent", async () => {
    const absent = [
      cs.create(
        [162, 7, 162, 33],
        {
          version: "0.0.0",
          filePath: "render/refusals.test.tsx",
          fileHash: "2b8eeaba0ce3d",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "jsx",
          loc: [162, 10, 162, 32],
          type: {
            kind: "string",
            loc: [162, 11, 162, 14],
            text: "div",
          },
          attributes: [
            {
              name: "onclick",
              initializer: {
                kind: "null",
                loc: [162, 24, 162, 28],
              },
            },
          ],
          children: [],
        }),
      ),
      cs.create(
        [163, 7, 163, 42],
        {
          version: "0.0.0",
          filePath: "render/refusals.test.tsx",
          fileHash: "2b8eeaba0ce3d",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "jsx",
          loc: [163, 10, 163, 41],
          type: {
            kind: "string",
            loc: [163, 11, 163, 14],
            text: "div",
          },
          attributes: [
            {
              name: "onclick",
              initializer: {
                kind: "[]",
                loc: [163, 24, 163, 37],
                expression: {
                  kind: "arr",
                  loc: [163, 24, 163, 34],
                  elements: [
                    {
                      kind: "=>",
                      loc: [163, 25, 163, 33],
                      parameters: [],
                      body: {
                        kind: "{}",
                        loc: [163, 31, 163, 33],
                        statements: [],
                      },
                    },
                  ],
                },
                argumentExpression: {
                  kind: "number",
                  loc: [163, 35, 163, 36],
                  value: 1,
                },
              },
            },
          ],
          children: [],
        }),
      ),
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
    await refused(_jsx("div", { one: "1" }), /takes a function/);
  });
});
