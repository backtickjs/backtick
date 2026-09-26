import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  "lzbinin395o6:5:15",
  { params: [] },
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-member.test.tsx"],"names":[],"mappings":"AAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
);
export default cs.create(
  "lzbinin395o6:9:15",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  "($splice0) => {\n    const list = $splice0();\n    return 1;\n}",
  '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-member.test.tsx"],"names":[],"mappings":"AAQkB;IAEhB,MAAM,IAAI,GAAG,UAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
