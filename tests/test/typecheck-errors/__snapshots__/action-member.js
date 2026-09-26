import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  "lzbinin395o6:5:15",
  { params: [] },
  {
    code: "export default () => {\n    const x = 1;\n};",
    map: '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-member.test.tsx"],"names":[],"mappings":"eAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
  },
);
export default cs.create(
  "lzbinin395o6:9:15",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  {
    code: "export default ($0) => {\n    const list = $0();\n    return 1;\n};",
    map: '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-member.test.tsx"],"names":[],"mappings":"eAQkB;IAEhB,MAAM,IAAI,GAAG,IAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
