import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3lfkc8512rtki:11:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() * 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUqBA,QAAA,IAAAA,QAAA,EAAK,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/splice-before-declaration.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "3lfkc8512rtki:17:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBkBA,QAAA;IAEd,OAAOA,QAAA,EAAM;AACf,CAAC","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/splice-before-declaration.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
// A splice is read when the `cs` line runs, so reading a `const` declared
// after it is reported as TypeScript reports it for plain code. Outside a
// function of the script, TypeScript says so; in one, the compiler does (see
// `compile-errors/splice-before-declaration`). Each is in a function never
// called, so nothing reads one at runtime.
export function inExpression() {
  // @ts-expect-error: Block-scoped variable 'size' used before its declaration.
  const doubled = cs.create($module0, [size]);
  const size = 4;
  return doubled;
}
export function inBlock() {
  const read = cs.create($module1, [label]);
  const label = "ready";
  return read;
}
