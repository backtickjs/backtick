import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
import { evaluate } from "../evaluate.ts";
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
const WaitingList = cs.create(
  "3mqkkm2axxnw5:20:20",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: answerItems, bindings: [] },
      { kind: "tag", value: For },
    ],
  },
  "($splice0, $splice1, $tag2) => (props) => {\n    const items = $splice0()([]);\n    const started = window.setTimeout(() => {\n        if (props.more()) {\n            items[1]($splice1());\n        }\n    }, 0);\n    return <$tag2 each={items[0]()}>{(item) => <em>{item}</em>}</$tag2>;\n}",
  '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["render/for-builds-once.test.tsx"],"names":[],"mappings":"AAmBuB,+BAAA,CAAC,KAA8B,EAAE,EAAE;IACxD,MAAM,KAAK,GAAG,UAAa,CAAW,EAAE,CAAC,CAAC;IAE1C,MAAM,OAAO,GAAG,MAAM,CAAC,UAAU,CAAC,GAAG,EAAE;QACrC,IAAI,KAAK,CAAC,IAAI,EAAE,EAAE,CAAC;YACjB,KAAK,CAAC,CAAC,CAAC,CAAC,UAAY,CAAC,CAAC;QACzB,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,OAAO,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,IAAY,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAG,CAAC,CAAC;AAC1E,CAAC"}',
);
const forBuildsOnce = cs.create(
  "3mqkkm2axxnw5:32:22",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: WaitingList },
    ],
  },
  '($splice0, $tag1) => {\n    const asked = $splice0()(0);\n    return (<div>\n      <span>{"asked " + asked[0]()}</span>\n      <$tag1 more={() => {\n            asked[1](asked[0]() + 1);\n            return asked[0]() < 5;\n        }}/>\n    </div>);\n}',
  '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["render/for-builds-once.test.tsx"],"names":[],"mappings":"AA+ByB;IACvB,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAE/B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,IAAI,CACnC;MAAA,CAAC,KAAW,CACV,IAAI,CAAC,CAAC,GAAG,EAAE;YACT,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;YACzB,OAAO,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACxB,CAAC,CAAC,EAEN;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = render(await evaluate(() => forBuildsOnce));
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
