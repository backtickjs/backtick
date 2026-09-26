import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
async function WaitingList({ more }) {
  return cs.create(
    "1megzj3sd9ppx:22:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: more, bindings: [] },
        { kind: "splice", value: answerItems, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: "export default ($0, $1, $2, $3, $4) => {\n    const items = $0()([]);\n    const started = $1().setTimeout(() => {\n        if ($2()()) {\n            items[1]($3());\n        }\n    }, 0);\n    return <$4 each={items[0]()}>{(item) => <em>{item}</em>}</$4>;\n};",
      map: '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["render/for-builds-once.test.tsx"],"names":[],"mappings":"eAqBY;IACR,MAAM,KAAK,GAAG,IAAa,CAAW,EAAE,CAAC,CAAC;IAE1C,MAAM,OAAO,GAAG,IAAO,CAAC,UAAU,CAAC,GAAG,EAAE;QACtC,IAAI,IAAK,EAAE,EAAE,CAAC;YACZ,KAAK,CAAC,CAAC,CAAC,CAAC,IAAY,CAAC,CAAC;QACzB,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,OAAO,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,IAAY,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,EAAG,CAAC,CAAC;AAC1E,CAAC"}',
    },
  );
}
const forBuildsOnce = cs.create(
  "1megzj3sd9ppx:35:22",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: WaitingList },
    ],
  },
  {
    code: 'export default ($0, $1) => {\n    const asked = $0()(0);\n    return (<div>\n      <span>{"asked " + asked[0]()}</span>\n      <$1 more={() => {\n            asked[1](asked[0]() + 1);\n            return asked[0]() < 5;\n        }}/>\n    </div>);\n};',
    map: '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["render/for-builds-once.test.tsx"],"names":[],"mappings":"eAkCyB;IACvB,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAE/B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,IAAI,CACnC;MAAA,CAAC,EAAW,CACV,IAAI,CAAC,CAAC,GAAG,EAAE;YACT,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;YACzB,OAAO,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACxB,CAAC,CAAC,EAEN;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(forBuildsOnce);
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
