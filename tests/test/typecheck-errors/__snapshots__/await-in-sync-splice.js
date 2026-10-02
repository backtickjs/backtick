import { cs } from "@backtickjs/core";
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope, so `await`
// in one is the host's `await`: refused where the function around the
// template isn't async, as anywhere else in host code.
export function greeting() {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  return cs.create(
    "374gnziclfgiq:12:9",
    {
      params: [{ kind: "splice", value: await fetchGreeting(), bindings: [] }],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAWYA,QAAA,IAAAA,QAAA,EAAC,GAA0B,GAAG","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/await-in-sync-splice.test.tsx"]}',
    [],
  );
}
