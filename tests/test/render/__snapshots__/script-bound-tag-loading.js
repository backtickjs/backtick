import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the signal: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.create(
    "2h8m00z8w6ydl:18:2",
    { params: [] },
    {
      code: 'export default () => (props) => <b>{"count " + props.count}</b>;',
      map: '{"version":3,"file":"script-bound-tag-loading.test.jsx","sourceRoot":"","sources":["script-bound-tag-loading.test.tsx"],"names":[],"mappings":"eAiBK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC"}',
    },
  ),
  { transform },
);
const scriptBoundTagLoading = cs.create(
  "2h8m00z8w6ydl:22:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: loadedBadge, bindings: [] },
    ],
  },
  {
    code: "export default ($0, $1) => {\n    const count = $0()(0);\n    const drawn = $0()(null);\n    const Badge = (props) => {\n        const held = drawn[0]();\n        return held === null ? null : eval(held)(props);\n    };\n    return (<div>\n      {drawn[0]() === null ? <i>loading</i> : <Badge count={count[0]()}/>}\n      <button onclick={() => drawn[1]($1())}>load</button>\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n};",
    map: '{"version":3,"file":"script-bound-tag-loading.test.jsx","sourceRoot":"","sources":["script-bound-tag-loading.test.tsx"],"names":[],"mappings":"eAqBiC;IAC/B,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,IAAa,CAEjB,IAAI,CAAC,CAAC;IAChB,MAAM,KAAK,GAAG,CAAC,KAAwB,EAAE,EAAE;QACzC,MAAM,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC;QACxB,OAAO,IAAI,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC;IAClD,CAAC,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG,CACpE;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAY,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC3D;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("scriptBoundTagLoading", async (t) => {
  await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
});
describe("a tag naming a function the script holds", () => {
  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");
    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });
});
