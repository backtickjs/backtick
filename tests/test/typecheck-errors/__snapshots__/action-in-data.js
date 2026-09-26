import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  "8ajqw43hsla0:5:15",
  { params: [] },
  {
    code: "export default () => {\n    const x = 1;\n};",
    map: '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"eAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
export const listed = cs.create(
  "8ajqw43hsla0:9:22",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  {
    code: "export default ($0) => {\n    const list = $0();\n    return 1;\n};",
    map: '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"eAQyB;IAEvB,MAAM,IAAI,GAAG,IAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
export const keyed = cs.create(
  "8ajqw43hsla0:15:21",
  { params: [{ kind: "splice", value: { press: action }, bindings: [] }] },
  {
    code: "export default ($0) => {\n    const map = $0();\n    return 1;\n};",
    map: '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"eAcwB;IAEtB,MAAM,GAAG,GAAG,IAAC,CAAoB;IACjC,OAAO,CAAC,CAAC;AACX,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
