import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { evaluate } from "../evaluate.ts";
import { cs } from "@backtickjs/core";
import { createRoot, createSignal, For } from "@backtickjs/solid-js";
import { insert } from "@backtickjs/solid-js/web";
import { screen } from "@solidjs/testing-library";
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
    "r0p87m36tykz:32:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '($splice0, $tag1) => {\n    const ids = $splice0()([1, 2, 3]);\n    const clear = () => {\n        ids[1]([]);\n    };\n    return (<>\n        <span onclick={clear}>clear</span>\n        <$tag1 each={ids[0]()}>{(id) => <span>{"row " + id}</span>}</$tag1>\n      </>);\n}',
    '{"version":3,"file":"anchors.test.jsx","sourceRoot":"","sources":["render/anchors.test.tsx"],"names":[],"mappings":"AA+BY;IACR,MAAM,GAAG,GAAG,UAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IAC/C,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC;IACb,CAAC,CAAC;IACF,OAAO,CACL,EACE;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,EAAE,IAAI,CACjC;QAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,EAAE,IAAI,CAAC,CAAC,EAAE,KAAG,CACxE;MAAA,GAAG,CACJ,CAAC;AACJ,CAAC"}',
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
  main.id = `target-${undo.length}`;
  main.innerHTML = html;
  document.body.append(main);
  undo.push(() => main.remove());
  return main;
}
// Draws in front of the anchor `selector` names. `render` takes no anchor, so
// these insert at it with Solid's `insert`, in a root, in client code.
async function drawAt(value, parent, selector) {
  const id = parent.id;
  const unmount = await evaluate(
    cs.create(
      "r0p87m36tykz:91:33",
      {
        params: [
          { kind: "splice", value: createRoot, bindings: [] },
          { kind: "splice", value: id, bindings: [] },
          { kind: "splice", value: insert, bindings: [] },
          { kind: "splice", value: value, bindings: [] },
          { kind: "splice", value: selector, bindings: [] },
        ],
      },
      "($splice0, $splice1, $splice2, $splice3, $splice4) => $splice0()((dispose) => {\n    const parent = document.getElementById($splice1());\n    $splice2()(parent, $splice3(), parent.querySelector($splice4()));\n    return dispose;\n})",
      '{"version":3,"file":"anchors.test.jsx","sourceRoot":"","sources":["render/anchors.test.tsx"],"names":[],"mappings":"AA0FoC,sDAAA,UAAW,CAAC,CAAC,OAAmB,EAAE,EAAE;IACpE,MAAM,MAAM,GAAG,QAAQ,CAAC,cAAc,CAAC,UAAG,CAAE,CAAC;IAC7C,UAAO,CAAC,MAAM,EAAE,UAAM,EAAE,MAAM,CAAC,aAAa,CAAC,UAAS,CAAC,CAAC,CAAC;IACzD,OAAO,OAAO,CAAC;AACjB,CAAC,CAAC"}',
    ),
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
