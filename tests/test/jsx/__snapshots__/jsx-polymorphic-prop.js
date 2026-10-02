import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    "365uagjo5wofp:9:9",
    { params: [{ kind: "splice", value: n, bindings: [] }] },
    "($splice0) => () => $splice0()",
    '{"version":3,"file":"jsx-polymorphic-prop.test.jsx","sourceRoot":"","sources":["jsx/jsx-polymorphic-prop.test.tsx"],"names":[],"mappings":"AAQY,cAAA,GAAG,EAAE,CAAC,UAAE"}',
  );
}
it("jsxPolymorphicProp", async (t) => {
  await snapshotCase(
    t,
    "jsxPolymorphicProp",
    cs.create(
      "365uagjo5wofp:16:4",
      {
        params: [
          { kind: "splice", value: make(1), bindings: [] },
          { kind: "splice", value: make(2), bindings: [] },
        ],
      },
      "($splice0, $splice1) => <div>\n      <span onclick={$splice0()}/>\n      <span onclick={$splice1()}/>\n    </div>",
      '{"version":3,"file":"jsx-polymorphic-prop.test.jsx","sourceRoot":"","sources":["jsx/jsx-polymorphic-prop.test.tsx"],"names":[],"mappings":"AAeO,wBAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,UAAU,CAAC,EAC1B;MAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,UAAU,CAAC,EAC5B;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
