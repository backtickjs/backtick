import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  "8ajqw43hsla0:5:15",
  { params: [] },
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-in-data.test.tsx"],"names":[],"mappings":"AAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
);
export const listed = cs.create(
  "8ajqw43hsla0:9:22",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  "($splice0) => {\n    const list = $splice0();\n    return 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-in-data.test.tsx"],"names":[],"mappings":"AAQyB;IAEvB,MAAM,IAAI,GAAG,UAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
export const keyed = cs.create(
  "8ajqw43hsla0:15:21",
  { params: [{ kind: "splice", value: { press: action }, bindings: [] }] },
  "($splice0) => {\n    const map = $splice0();\n    return 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["typecheck-errors/action-in-data.test.tsx"],"names":[],"mappings":"AAcwB;IAEtB,MAAM,GAAG,GAAG,UAAC,CAAoB;IACjC,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
