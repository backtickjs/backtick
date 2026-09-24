import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For, state } from "@backtickjs/core";
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
  return cs.create(
    [31, 10, 42, 5],
    {
      version: "0.0.0",
      filePath: "render/anchors.test.tsx",
      fileHash: "1l1sblr1an3g5",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [31, 13, 42, 4],
      statements: [
        {
          kind: "const",
          loc: [32, 5, 32, 45],
          name: {
            kind: "id",
            loc: [32, 11, 32, 14],
            text: "ids",
            bindingKey: "ids$1l1sblr1an3g5$0",
          },
          initializer: {
            kind: "()",
            loc: [32, 17, 32, 44],
            expression: {
              kind: "splice",
              loc: [32, 17, 32, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [32, 34, 32, 43],
                elements: [
                  {
                    kind: "number",
                    loc: [32, 35, 32, 36],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [32, 38, 32, 39],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [32, 41, 32, 42],
                    value: 3,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [33, 5, 35, 7],
          name: {
            kind: "id",
            loc: [33, 11, 33, 16],
            text: "clear",
            bindingKey: "clear$1l1sblr1an3g5$1",
          },
          initializer: {
            kind: "=>",
            loc: [33, 19, 35, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [33, 25, 35, 6],
              statements: [
                {
                  kind: "()",
                  loc: [34, 7, 34, 18],
                  expression: {
                    kind: ".",
                    loc: [34, 7, 34, 14],
                    expression: {
                      kind: "id",
                      loc: [34, 7, 34, 10],
                      text: "ids",
                      bindingKey: "ids$1l1sblr1an3g5$0",
                    },
                    name: "set",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [34, 15, 34, 17],
                      elements: [],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [36, 5, 41, 7],
          expression: {
            kind: "jsx",
            loc: [37, 7, 40, 10],
            type: {
              kind: "string",
              loc: [37, 7, 40, 10],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [38, 9, 38, 43],
                type: {
                  kind: "string",
                  loc: [38, 10, 38, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [38, 24, 38, 29],
                      text: "clear",
                      bindingKey: "clear$1l1sblr1an3g5$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [38, 31, 38, 36],
                    text: "clear",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [39, 9, 39, 81],
                type: {
                  kind: "splice",
                  loc: [39, 10, 39, 13],
                  key: "$For",
                },
                attributes: [
                  {
                    name: "each",
                    initializer: {
                      kind: "()",
                      loc: [39, 20, 39, 29],
                      expression: {
                        kind: ".",
                        loc: [39, 20, 39, 27],
                        expression: {
                          kind: "id",
                          loc: [39, 20, 39, 23],
                          text: "ids",
                          bindingKey: "ids$1l1sblr1an3g5$0",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                  },
                ],
                children: [
                  {
                    kind: "=>",
                    loc: [39, 32, 39, 74],
                    parameters: [
                      {
                        kind: "param",
                        loc: [39, 33, 39, 43],
                        name: {
                          kind: "id",
                          loc: [39, 33, 39, 35],
                          text: "id",
                          bindingKey: "id$1l1sblr1an3g5$2",
                        },
                      },
                    ],
                    body: {
                      kind: "jsx",
                      loc: [39, 48, 39, 74],
                      type: {
                        kind: "string",
                        loc: [39, 49, 39, 53],
                        text: "span",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "binop",
                          loc: [39, 55, 39, 66],
                          left: {
                            kind: "string",
                            loc: [39, 55, 39, 61],
                            text: "row ",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [39, 64, 39, 66],
                            text: "id",
                            bindingKey: "id$1l1sblr1an3g5$2",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
// What a target holds, by tag — `#text` for the text nodes a drawing inserted,
// as a document names them.
function tags(parent) {
  return [...parent.childNodes].map((child) => child.nodeName.toLowerCase());
}
// What a drawing put in a target, as the nodes themselves.
function nodesIn(parent) {
  return [...parent.childNodes];
}
// The first drawing's button that empties its list.
const clearButton = () => screen.getAllByText("clear")[0];
// What each test drew and added to the page, taken down after it, last first.
const undo = [];
afterEach(() => {
  for (const step of undo.splice(0).reverse()) {
    step();
  }
});
// A target in the page holding the markup given, as a page's own would.
function target(html) {
  const main = document.createElement("main");
  main.innerHTML = html;
  document.body.append(main);
  undo.push(() => main.remove());
  return main;
}
// Draws in front of the anchor `selector` names. `render` takes no anchor —
// where a drawing goes among a page's own nodes is the runtime's business —
// so these ask the runtime directly.
async function drawAt(value, parent, selector) {
  const code = await bundler.run(value);
  const unmount = createRuntime({ window, global: globalThis }).render(
    () => (0, eval)(code),
    parent,
    parent.querySelector(selector),
  );
  undo.push(unmount);
}
describe("where a render draws", () => {
  it("draws in front of its anchor", async () => {
    const container = target(
      "<header></header><comment></comment><footer></footer>",
    );
    await drawAt(_jsx(Rows, {}), container, "comment");
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
    await drawAt(_jsx(Rows, {}), container, "comment");
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
    await drawAt(_jsx(Rows, {}), container, "comment");
    await userEvent.click(clearButton());
    assert.deepEqual(tags(container), ["span", "comment"]);
  });
  it("holds two drawings apart in one target", async () => {
    // One page, two drawings: each at its own anchor, and a write to one leaves
    // the other where it is.
    const container = target("<comment-1></comment-1><comment-2></comment-2>");
    await drawAt(_jsx(Rows, {}), container, "comment-1");
    await drawAt(_jsx(Rows, {}), container, "comment-2");
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
    const first = container.querySelector("comment-1");
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
