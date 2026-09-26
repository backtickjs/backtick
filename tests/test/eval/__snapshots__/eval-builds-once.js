import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new signals, and whatever it did on the way in done over.
//
// Two of them answer that way: a bundle drawn where it stands, which is this
// file, and a list, which `render/for-builds-once.test.tsx` covers. The list is
// the one that says where the fault was — a drawn bundle is not special, so
// neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new signals, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    "2yide9yjkc2iv:44:9",
    { params: [] },
    {
      code: 'export default () => <em>{"answered"}</em>;',
      map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eA2CY,MAAA,CAAC,EAAE,CAAC,CAAC,UAAU,CAAC,EAAE,EAAE,CAAC"}',
    },
  );
}
const answer = await bundler.run(_jsx(Answer, {}), { transform });
async function Waiting({ ask }) {
  return cs.create(
    "2yide9yjkc2iv:54:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: ask, bindings: [] },
      ],
    },
    {
      code: "export default ($0, $1, $2) => {\n    const drawn = $0()(null);\n    const started = $1().setTimeout(() => drawn[1]($2()()), 0);\n    return (<>\n        {drawn[0]() === null\n            ? null\n            : eval(drawn[0]())}\n      </>);\n};",
      map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eAqDY;IACR,MAAM,KAAK,GAAG,IAAa,CAAiC,IAAI,CAAC,CAAC;IAClE,MAAM,OAAO,GAAG,IAAO,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC9D,OAAO,CACL,EACE;QAAA,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI;YAClB,CAAC,CAAC,IAAI;YACN,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,EAA6B,CAAC,CACjD;MAAA,GAAG,CACJ,CAAC;AACJ,CAAC"}',
    },
  );
}
const evalBuildsOnce = cs.create(
  "2yide9yjkc2iv:67:23",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: answer, bindings: [] },
      { kind: "tag", value: Waiting },
    ],
  },
  {
    code: 'export default ($0, $1, $2) => {\n    const asked = $0()(0);\n    return (<div>\n      <span>{"asked " + asked[0]()}</span>\n      <$2 ask={() => {\n            asked[1](asked[0]() + 1);\n            return asked[0]() > 4 ? null : $1();\n        }}/>\n    </div>);\n};',
    map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eAkE0B;IACxB,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAE/B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,IAAI,CACnC;MAAA,CAAC,EAAO,CACN,GAAG,CAAC,CAAC,GAAG,EAAE;YACR,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;YACzB,OAAO,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAO,CAAC;QACzC,CAAC,CAAC,EAEN;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("evalBuildsOnce", async (t) => {
  await snapshotCase(t, "evalBuildsOnce", evalBuildsOnce);
});
describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(evalBuildsOnce);
    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);
    await settled();
    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
