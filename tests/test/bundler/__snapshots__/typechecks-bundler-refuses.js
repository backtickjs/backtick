import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { bundle } from "../evaluate.ts";
const $module0 = {
  id: "g4onl1tmbcr6:19:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().title;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBiCA,QAAA,IAAAA,QAAA,EAAK,CAACC,KAAK","names":["$splice0","title"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "g4onl1tmbcr6:33:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().title;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgCiCA,QAAA,IAAAA,QAAA,EAAK,CAACC,KAAK","names":["$splice0","title"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "g4onl1tmbcr6:44:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2CiCA,QAAA,IAAAA,QAAA,EAAW,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "g4onl1tmbcr6:47:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8CiCA,QAAA,IAAAA,QAAA,EAAS,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module4 = {
  id: "g4onl1tmbcr6:67:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().name;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkEiCA,QAAA,IAAAA,QAAA,EAAK,CAACC,IAAI","names":["$splice0","name"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module5 = {
  id: "g4onl1tmbcr6:72:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => String($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuEqBA,QAAA,IAAAC,MAAM,CAACD,QAAA,EAAO,CAAC","names":["$splice0","String"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module6 = {
  id: "g4onl1tmbcr6:73:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => String($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwEiCA,QAAA,IAAAC,MAAM,CAACD,QAAA,EAAO,CAAC","names":["$splice0","String"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module7 = {
  id: "g4onl1tmbcr6:79:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0().first.name + $splice1().second.name;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8EkB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACE,KAAK,CAACC,IAAI,GAAGF,QAAA,EAAK,CAACG,MAAM,CAACD,IAAI","names":["$splice0","$splice1","first","name","second"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module8 = {
  id: "g4onl1tmbcr6:86:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqFiCA,QAAA,IAAAA,QAAA,EAAO,EAAE","names":["$splice0"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module9 = {
  id: "g4onl1tmbcr6:99:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkGiCA,QAAA,IAAAA,QAAA,EAAQ,EAAE","names":["$splice0"],"ignoreList":[],"sources":["bundler/typechecks-bundler-refuses.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// What the typechecker accepts and the bundler refuses: each splice below
// type-checks, and fails only when the server bundles it.
// A gap in the types: an instance whose members are all data looks, to
// TypeScript, like a plain object, so it splices member by member. Only the
// bundler sees its class.
class TodoRecord {
  title = "Ship";
  done = false;
}
it("a class instance with only data members", async () => {
  const todo = new TodoRecord();
  await assert.rejects(bundle(cs.create($module0, [todo])), {
    message:
      "Can't splice this `TodoRecord` instance: only plain objects cross into a client script. Build one with a client function instead.",
  });
});
it("a class instance typed as an interface", async () => {
  const todo = new TodoRecord();
  await assert.rejects(bundle(cs.create($module1, [todo])), {
    message:
      "Can't splice this `TodoRecord` instance: only plain objects cross into a client script. Build one with a client function instead.",
  });
});
// A gap in the types: `Spliceable` takes any `number`, and a bundle has no
// literal for one that isn't finite.
it("NaN and Infinity", async () => {
  const notANumber = NaN;
  const infinite = Infinity;
  await assert.rejects(bundle(cs.create($module2, [notANumber])), {
    message: "NaN has no literal",
  });
  await assert.rejects(bundle(cs.create($module3, [infinite])), {
    message: "Infinity has no literal",
  });
});
const message =
  "Can't splice a value that contains itself: a bundle writes each value out in full, so a cycle never ends. Break the cycle before splicing it.";
it("an object that contains itself", async () => {
  const link = { name: "a", next: null };
  link.next = link;
  await assert.rejects(bundle(cs.create($module4, [link])), { message });
});
it("a cycle through a script's splice", async () => {
  const holder = { script: null };
  holder.script = cs.create($module5, [holder]);
  await assert.rejects(bundle(cs.create($module6, [holder])), { message });
});
it("a value used in two places is no cycle", async () => {
  const shared = { name: "shared" };
  const pair = { first: shared, second: shared };
  await bundle(cs.create($module7, [pair, pair]));
});
// By design: `any` opts out of the typechecker, so a host function it hides
// is refused where the bundler meets it.
it("a host function typed as any", async () => {
  const hidden = () => 1;
  await assert.rejects(bundle(cs.create($module8, [hidden])), {
    message: /^Can't splice the host function `hidden`/,
  });
});
// By design: what the app provides is the server's `packageVersions`, which
// only the bundler reads.
it("an import from a package the app doesn't provide", async () => {
  const missing = createImport({
    name: "track",
    from: "analytics",
    version: "^1.0.0",
  });
  await assert.rejects(bundle(cs.create($module9, [missing])), {
    message:
      'Can\'t import `track` from "analytics": the client provides solid-js@1.9.14, app@1.0.0, acme-ui@1.0.0.',
  });
});
