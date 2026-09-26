import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
// A component whose whole drawing is a conditional on a signal of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a signal that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
async function Held({ again }) {
  return cs.create(
    "2m0npbjw99cz:31:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: again, bindings: [] },
      ],
    },
    "($splice0, $splice1) => {\n    const shown = $splice0()(false);\n    const started = window.setTimeout(() => {\n        if ($splice1()()) {\n            shown[1](true);\n        }\n    }, 0);\n    return <>{shown[0]() ? <em>shown</em> : <i>waiting</i>}</>;\n}",
    '{"version":3,"file":"conditional-drawing.test.jsx","sourceRoot":"","sources":["render/conditional-drawing.test.tsx"],"names":[],"mappings":"AA8BY;IACR,MAAM,KAAK,GAAG,UAAa,CAAC,KAAK,CAAC,CAAC;IAEnC,MAAM,OAAO,GAAG,MAAM,CAAC,UAAU,CAAC,GAAG,EAAE;QACrC,IAAI,UAAM,EAAE,EAAE,CAAC;YACb,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;QACjB,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,OAAO,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,KAAK,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC;AAC7D,CAAC"}',
  );
}
const conditionalDrawing = cs.create(
  "2m0npbjw99cz:44:27",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: Held },
    ],
  },
  '($splice0, $tag1) => {\n    const builds = $splice0()(0);\n    return (<div>\n      <span>{"builds " + builds[0]()}</span>\n      <section>\n        <$tag1 again={() => {\n            builds[1](builds[0]() + 1);\n            return builds[0]() < 5;\n        }}/>\n      </section>\n    </div>);\n}',
  '{"version":3,"file":"conditional-drawing.test.jsx","sourceRoot":"","sources":["render/conditional-drawing.test.tsx"],"names":[],"mappings":"AA2C8B;IAC5B,MAAM,MAAM,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAEhC,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,SAAS,GAAG,MAAM,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,IAAI,CACrC;MAAA,CAAC,OAAO,CACN;QAAA,CAAC,KAAI,CACH,KAAK,CAAC,CAAC,GAAG,EAAE;YACV,MAAM,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;YAC3B,OAAO,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACzB,CAAC,CAAC,EAEN;MAAA,EAAE,OAAO,CACX;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(conditionalDrawing);
    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));
    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
