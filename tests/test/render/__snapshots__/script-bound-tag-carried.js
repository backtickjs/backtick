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
    {
      code: 'export default ($0) => {\n    const Badge = (p) => <i>{"panel " + p.n}</i>;\n    return (<section>\n        <Badge n={0}/>\n        {$0().body}\n      </section>);\n};',
      map: '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"eAYY;IACR,MAAM,KAAK,GAAG,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC5D,OAAO,CACL,CAAC,OAAO,CACN;QAAA,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACZ;QAAA,CAAC,IAAM,CAAC,IAAI,CACd;MAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
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
          {
            code: 'export default ($0, $1) => <$0 n={$1[0]()}>\n            <u>{"kid " + $1[0]()}</u>\n          </$0>;',
            map: '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"eAwCe,YAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,EAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CACxB;YAAA,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,EAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAC7B;UAAA,EAAE,EAAK,CAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
        bindings: ["count$39ox4ofrbdtgr$2", "Badge$39ox4ofrbdtgr$3"],
      },
      { kind: "tag", value: Panel },
    ],
  },
  {
    code: 'export default ($0, $1, $2) => {\n    const count = $0()(0);\n    const Badge = (p) => (<b>\n      {"outer " + p.n}\n      {p.children}\n    </b>);\n    return (<div>\n      <$2 body={$1(count, Badge)}/>\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n};',
    map: '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"eA2BiC;IAC/B,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,CAAC,CAA2C,EAAE,EAAE,CAAC,CAC7D,CAAC,CAAC,CACA;MAAA,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CACf;MAAA,CAAC,CAAC,CAAC,QAAQ,CACb;IAAA,EAAE,CAAC,CAAC,CACL,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,EAAK,CACJ,IAAI,CAAC,CACH,gBAGF,CAAC,EAEH;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    imports: [],
    exportAt: 0,
  },
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
