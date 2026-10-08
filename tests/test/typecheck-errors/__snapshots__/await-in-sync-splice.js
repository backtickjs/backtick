import { cs } from "@backtickjs/core";
const $module0 = {
  id: "19gcxn9haud8w:12:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWYA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/await-in-sync-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "19gcxn9haud8w:20:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBuBA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/await-in-sync-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "19gcxn9haud8w:26:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyBmBA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/await-in-sync-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "19gcxn9haud8w:32:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+BgBA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/await-in-sync-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope, so `await`
// in one is the host's `await`: refused where the function around the
// template isn't async, as anywhere else in host code.
export function greeting() {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  return cs.create($module0, [await fetchGreeting()]);
}
// Nor in a class field's initializer, a static block, or a parameter's
// default, where JavaScript refuses `await` even at a module's top level or
// in an async function.
export class Greeter {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  static greeting = cs.create($module1, [await fetchGreeting()]);
}
export class Logged {
  static {
    // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
    console.log(cs.create($module2, [await fetchGreeting()]));
  }
}
export async function greet(
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  greeting = cs.create($module3, [await fetchGreeting()]),
) {
  return greeting;
}
