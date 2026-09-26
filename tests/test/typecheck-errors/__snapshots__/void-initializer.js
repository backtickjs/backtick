import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  "3ch7rgcn8bjeq:5:13",
  { params: [] },
  "() => () => {\n    let n = 0;\n    n = 1;\n}",
  '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-initializer.test.tsx"],"names":[],"mappings":"AAIgB,MAAA,GAAG,EAAE;IACnB,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC"}',
);
const script = cs.create(
  "3ch7rgcn8bjeq:10:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  "($splice0) => {\n    const x = $splice0()();\n    return 1;\n}",
  '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-initializer.test.tsx"],"names":[],"mappings":"AASkB;IAChB,MAAM,CAAC,GAAG,UAAK,EAAE,CAAC;IAClB,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
const action = cs.create(
  "3ch7rgcn8bjeq:15:15",
  { params: [{ kind: "splice", value: ping, bindings: [] }] },
  "($splice0) => {\n    const x = $splice0()();\n}",
  '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-initializer.test.tsx"],"names":[],"mappings":"AAckB;IAChB,MAAM,CAAC,GAAG,UAAK,EAAE,CAAC;AACpB,CAAC"}',
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  "3ch7rgcn8bjeq:21:14",
  { params: [] },
  "() => (text) => {\n    return text;\n}",
  '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-initializer.test.tsx"],"names":[],"mappings":"AAoBiB,MAAA,CAAC,IAAY,EAAE,EAAE;IAChC,OAAO,IAAI,CAAC;AACd,CAAC"}',
);
const wrongArgument = cs.create(
  "3ch7rgcn8bjeq:25:22",
  { params: [{ kind: "splice", value: label, bindings: [] }] },
  "($splice0) => {\n    const x = $splice0()(true);\n    return 1;\n}",
  '{"version":3,"file":"void-initializer.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-initializer.test.tsx"],"names":[],"mappings":"AAwByB;IAEvB,MAAM,CAAC,GAAG,UAAM,CAAC,IAAI,CAAC,CAAC;IACvB,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
