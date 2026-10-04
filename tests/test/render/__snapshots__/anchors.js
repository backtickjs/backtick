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
const $module0 = {
  id: "3vm53m05uwuq:32:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>clear`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $tag1) => {\n    const [ids, setIds] = $splice0()([1, 2, 3]);\n    const clear = () => {\n        setIds([]);\n    };\n    return [(() => {\n            var _el$ = _tmpl$();\n            _el$.$$click = clear;\n            return _el$;\n        })(), (0, web_4.createComponent)($tag1, {\n            get each() {\n                return ids();\n            },\n            children: id => (() => {\n                var _el$2 = _tmpl$2();\n                (0, web_3.insert)(_el$2, "row " + id);\n                return _el$2;\n            })()\n        })];\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBA+BY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAM,CAACC,GAAG,EAAEC,MAAM,CAAC,GAAGH,QAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACxD,MAAMI,KAAK,GAAGA,GAAA;QACZD,MAAM,CAAC,EAAE,CAAC;IACZ,CAAC;IACD;YAAA,IAAAE,IAAA,GAAAC,MAAA;YAAAD,IAAA,CAAAE,OAAA,GAEmBH,KAAK;YAAA,OAAAC,IAAA;QAAA,MAAAG,yBAAA,EACnBP,KAAI;YAAA,IAACQ,IAAIA;gBAAA,OAAEP,GAAG,EAAE;YAAA;YAAAQ,QAAA,EAAIC,EAAU;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAC,gBAAA,EAAAF,KAAA,EAAY,MAAM,GAAGD,EAAE;gBAAA,OAAAC,KAAA;YAAA;SAAQ;AAGpE,CAAC","names":["$splice0","$tag1","ids","setIds","clear","_el$","_tmpl$","$$click","_$createComponent","each","children","id","_el$2","_tmpl$2","_$insert"],"ignoreList":[],"sources":["render/anchors.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }, { kind: "tag" }],
};
const $module1 = {
  id: "3vm53m05uwuq:91:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => $splice0()(dispose => {\n    const parent = document.getElementById($splice1());\n    $splice2()(parent, $splice3(), parent.querySelector($splice4()));\n    return dispose;\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0FoC,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAAAJ,QAAA,EAAW,CAAEK,OAAmB;IAChE,MAAMC,MAAM,GAAGC,QAAQ,CAACC,cAAc,CAACP,QAAA,EAAG,CAAE;IAC5CC,QAAA,EAAO,CAACI,MAAM,EAAEH,QAAA,EAAM,EAAEG,MAAM,CAACG,aAAa,CAACL,QAAA,EAAS,CAAC,CAAC;IACxD,OAAOC,OAAO;AAChB,CAAC,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","dispose","parent","document","getElementById","querySelector"],"ignoreList":[],"sources":["render/anchors.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
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
  return cs.create($module0, [createSignal, For]);
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
    cs.create($module1, [createRoot, id, insert, value, selector]),
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
