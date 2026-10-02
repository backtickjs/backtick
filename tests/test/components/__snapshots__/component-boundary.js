import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<TextLabel />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `TextLabel`.
async function TextLabel(props) {
  const text = props.text;
  return cs.create(
    "3ouwrs0p0z6cs:14:9",
    { params: [{ kind: "splice", value: text, bindings: [] }] },
    "($splice0) => <span>{$splice0()}</span>",
    '{"version":3,"file":"component-boundary.test.jsx","sourceRoot":"","sources":["components/component-boundary.test.tsx"],"names":[],"mappings":"AAaY,cAAA,CAAC,IAAI,CAAC,CAAC,UAAK,CAAC,EAAE,IAAI,CAAC"}',
  );
}
it("componentBoundary", async (t) => {
  await snapshotCase(
    t,
    "componentBoundary",
    cs.create(
      "3ouwrs0p0z6cs:21:4",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(TextLabel, { text: "one" }),
            bindings: [],
          },
          {
            kind: "splice",
            value: _jsx(TextLabel, { text: "two" }),
            bindings: [],
          },
        ],
      },
      "($splice0, $splice1) => <div>\n      {$splice0()}\n      {$splice1()}\n    </div>",
      '{"version":3,"file":"component-boundary.test.jsx","sourceRoot":"","sources":["components/component-boundary.test.tsx"],"names":[],"mappings":"AAoBO,wBAAA,CAAC,GAAG,CACL;MAAA,CAAC,UAA6B,CAC9B;MAAA,CAAC,UAA6B,CAChC;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
