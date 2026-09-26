import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  "3ch7rgcn8bjeq:5:13",
  { params: [] },
  {
    code: "export default () => () => {\n    let n = 0;\n    n = 1;\n};",
    map: '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["void-initializer.test.tsx"],"names":[],"mappings":"eAIgB,MAAA,GAAG,EAAE;IACnB,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
const script = cs.create(
  "3ch7rgcn8bjeq:10:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  {
    code: "export default ($0) => {\n    const x = $0()();\n    return 1;\n};",
    map: '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["void-initializer.test.tsx"],"names":[],"mappings":"eASkB;IAChB,MAAM,CAAC,GAAG,IAAK,EAAE,CAAC;IAClB,OAAO,CAAC,CAAC;AACX,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
const action = cs.create(
  "3ch7rgcn8bjeq:15:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  {
    code: "export default ($0) => {\n    const x = $0()();\n};",
    map: '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["void-initializer.test.tsx"],"names":[],"mappings":"eAckB;IAChB,MAAM,CAAC,GAAG,IAAK,EAAE,CAAC;AACpB,CAAC"}',
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
    code: "export default () => (text) => {\n    return text;\n};",
    map: '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["void-initializer.test.tsx"],"names":[],"mappings":"eAoBiB,MAAA,CAAC,IAAY,EAAE,EAAE;IAChC,OAAO,IAAI,CAAC;AACd,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
const wrongArgument = cs.create(
  "3ch7rgcn8bjeq:25:22",
  { params: [{ kind: "splice", value: label, bindings: [] }] },
  {
    code: "export default ($0) => {\n    const x = $0()(true);\n    return 1;\n};",
    map: '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["void-initializer.test.tsx"],"names":[],"mappings":"eAwByB;IAEvB,MAAM,CAAC,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IACvB,OAAO,CAAC,CAAC;AACX,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
