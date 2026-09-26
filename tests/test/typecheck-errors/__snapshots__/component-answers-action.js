import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create(
    "2413tlntseciz:8:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    "($splice0) => {\n    const n = $splice0()(2);\n    n[1](3);\n}",
    '{"version":3,"file":"component-answers-action.test.jsx","sourceRoot":"","sources":["typecheck-errors/component-answers-action.test.tsx"],"names":[],"mappings":"AAOY;IACR,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACV,CAAC"}',
  );
}
// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default _jsx(Panel, {});
