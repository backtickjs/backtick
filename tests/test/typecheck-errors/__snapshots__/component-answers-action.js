import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create(
    "1y32lnuqpkjgj:7:9",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    {
      code: "export default ($0) => {\n    const n = $0()(2);\n    n.set(3);\n};",
      map: '{"version":3,"file":"component-answers-action.test.jsx","sourceRoot":"","sources":["typecheck-errors/component-answers-action.test.tsx"],"names":[],"mappings":"eAMY;IACR,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACX,CAAC"}',
    },
  );
}
// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default _jsx(Panel, {});
