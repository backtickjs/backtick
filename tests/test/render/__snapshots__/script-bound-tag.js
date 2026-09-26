import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the signal without the badge being drawn again.
const badge = await bundler.run(
  cs.create(
    "3qxd63l5wnivt:15:2",
    { params: [] },
    {
      code: 'export default () => (props) => <b>{"count " + props.count}</b>;',
      map: '{"version":3,"file":"script-bound-tag.test.jsx","sourceRoot":"","sources":["script-bound-tag.test.tsx"],"names":[],"mappings":"eAcK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  ),
  { transform },
);
const scriptBoundTag = cs.create(
  "3qxd63l5wnivt:19:23",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: badge, bindings: [] },
    ],
  },
  {
    code: "export default ($0, $1) => {\n    const count = $0()(0);\n    const Badge = eval($1());\n    return (<div>\n      <Badge count={count[0]()}/>\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n};",
    map: '{"version":3,"file":"script-bound-tag.test.jsx","sourceRoot":"","sources":["script-bound-tag.test.tsx"],"names":[],"mappings":"eAkB0B;IACxB,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,IAAI,CAAC,IAAM,CAAC,CAAC;IAE3B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EACzB;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("scriptBoundTag", async (t) => {
  await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
});
describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);
    const badge = screen.getByText("count 0");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });
});
