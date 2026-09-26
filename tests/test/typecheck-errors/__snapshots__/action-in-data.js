import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  "8ajqw43hsla0:5:15",
  { params: [] },
  {
    code: "export default () => {\n  const x = 1;\n};",
    map: '{"version":3,"mappings":"eAIkB;EAChB,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["action-in-data.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
export const listed = cs.create(
  "8ajqw43hsla0:9:22",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  {
    code: "export default $0 => {\n  const list = $0();\n  return 1;\n};",
    map: '{"version":3,"mappings":"eAQyBA,EAAA;EAEvB,MAAMC,IAAI,GAAGD,EAAA,EAAC;EACd,OAAO,CAAC;AACV,CAAC","names":["$0","list"],"ignoreList":[],"sources":["action-in-data.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
export const keyed = cs.create(
  "8ajqw43hsla0:15:21",
  { params: [{ kind: "splice", value: { press: action }, bindings: [] }] },
  {
    code: "export default $0 => {\n  const map = $0();\n  return 1;\n};",
    map: '{"version":3,"mappings":"eAcwBA,EAAA;EAEtB,MAAMC,GAAG,GAAGD,EAAA,EAAC;EACb,OAAO,CAAC;AACV,CAAC","names":["$0","map"],"ignoreList":[],"sources":["action-in-data.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
