import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  "lzbinin395o6:5:15",
  { params: [] },
  {
    code: "export default () => {\n  const x = 1;\n};",
    map: '{"version":3,"mappings":"eAIkB;EAChB,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["action-member.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
export default cs.create(
  "lzbinin395o6:9:15",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  {
    code: "export default $0 => {\n  const list = $0();\n  return 1;\n};",
    map: '{"version":3,"mappings":"eAQkBA,EAAA;EAEhB,MAAMC,IAAI,GAAGD,EAAA,EAAC;EACd,OAAO,CAAC;AACV,CAAC","names":["$0","list"],"ignoreList":[],"sources":["action-member.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
