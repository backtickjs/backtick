import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    "39ox4ofrbdtgr:13:9",
    { params: [{ kind: "splice", value: props, bindings: [] }] },
    '($splice0) => {\n    const Badge = (p) => <i>{"panel " + p.n}</i>;\n    return (<section>\n        <Badge n={0}/>\n        {$splice0().body}\n      </section>);\n}',
    '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AAYY;IACR,MAAM,KAAK,GAAG,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC5D,OAAO,CACL,CAAC,OAAO,CACN;QAAA,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACZ;QAAA,CAAC,UAAM,CAAC,IAAI,CACd;MAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC"}',
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  "39ox4ofrbdtgr:28:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: cs.create(
          "39ox4ofrbdtgr:41:12",
          {
            params: [
              { kind: "capture", key: "Badge$39ox4ofrbdtgr$3" },
              { kind: "capture", key: "count$39ox4ofrbdtgr$2" },
            ],
          },
          '($capture0, $capture1) => <$capture0 n={$capture1[0]()}>\n            <u>{"kid " + $capture1[0]()}</u>\n          </$capture0>',
          '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AAwCe,0BAAA,CAAC,SAAK,CAAC,CAAC,CAAC,CAAC,SAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CACxB;YAAA,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,SAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAC7B;UAAA,EAAE,SAAK,CAAC"}',
        ),
        bindings: ["count$39ox4ofrbdtgr$2", "Badge$39ox4ofrbdtgr$3"],
      },
      { kind: "tag", value: Panel },
    ],
  },
  '($splice0, $splice1, $tag2) => {\n    const count = $splice0()(0);\n    const Badge = (p) => (<b>\n      {"outer " + p.n}\n      {p.children}\n    </b>);\n    return (<div>\n      <$tag2 body={$splice1(count, Badge)}/>\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n}',
  '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AA2BiC;IAC/B,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,CAAC,CAA2C,EAAE,EAAE,CAAC,CAC7D,CAAC,CAAC,CACA;MAAA,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CACf;MAAA,CAAC,CAAC,CAAC,QAAQ,CACb;IAAA,EAAE,CAAC,CAAC,CACL,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAK,CACJ,IAAI,CAAC,CACH,sBAGF,CAAC,EAEH;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});
describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
