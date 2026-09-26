import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  "3ch7rgcn8bjeq:5:13",
  { params: [] },
  {
    code: "export default () => () => {\n  let n = 0;\n  n = 1;\n};",
    map: '{"version":3,"mappings":"eAIgB,YAAK;EACnB,IAAIA,CAAC,GAAG,CAAC;EACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["void-initializer.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const script = cs.create(
  "3ch7rgcn8bjeq:10:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  {
    code: "export default $0 => {\n  const x = $0()();\n  return 1;\n};",
    map: '{"version":3,"mappings":"eASkBA,EAAA;EAChB,MAAMC,CAAC,GAAGD,EAAA,EAAK,EAAE;EACjB,OAAO,CAAC;AACV,CAAC","names":["$0","x"],"ignoreList":[],"sources":["void-initializer.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const action = cs.create(
  "3ch7rgcn8bjeq:15:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  {
    code: "export default $0 => {\n  const x = $0()();\n};",
    map: '{"version":3,"mappings":"eAckBA,EAAA;EAChB,MAAMC,CAAC,GAAGD,EAAA,EAAK,EAAE;AACnB,CAAC","names":["$0","x"],"ignoreList":[],"sources":["void-initializer.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  "3ch7rgcn8bjeq:21:14",
  { params: [] },
  {
    code: "export default () => text => {\n  return text;\n};",
    map: '{"version":3,"mappings":"eAoBiB,MAACA,IAAY,IAAI;EAChC,OAAOA,IAAI;AACb,CAAC","names":["text"],"ignoreList":[],"sources":["void-initializer.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const wrongArgument = cs.create(
  "3ch7rgcn8bjeq:25:22",
  { params: [{ kind: "splice", value: label, bindings: [] }] },
  {
    code: "export default $0 => {\n  const x = $0()(true);\n  return 1;\n};",
    map: '{"version":3,"mappings":"eAwByBA,EAAA;EAEvB,MAAMC,CAAC,GAAGD,EAAA,EAAM,CAAC,IAAI,CAAC;EACtB,OAAO,CAAC;AACV,CAAC","names":["$0","x"],"ignoreList":[],"sources":["void-initializer.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
