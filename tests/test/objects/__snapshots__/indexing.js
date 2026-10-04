import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
const $module0 = {
  id: "mwyhvf4weui7:11:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => [5, 31, 7]["0"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUmCA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "mwyhvf4weui7:12:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => "abc"["0"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWmCA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,KAAK,CAAC,GAAG,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "mwyhvf4weui7:15:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => ({\n    x: 1\n})[0]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcwBA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,CAAC;IAAEC,CAAC,EAAE;CAAG,EAAE,CAAC,CAAC,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module3 = {
  id: "mwyhvf4weui7:19:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => 7[0]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBwBA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAO,CAAyB,CAAC,CAAC,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module4 = {
  id: "mwyhvf4weui7:27:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => [5, 31, 7][9];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0BS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module5 = {
  id: "mwyhvf4weui7:28:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => [5, 31, 7][1.5];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC","names":[],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module6 = {
  id: "mwyhvf4weui7:29:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => [5, 31, 7][-1];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA4BS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module7 = {
  id: "mwyhvf4weui7:30:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    x: 1\n})["y"];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6BS,MAAC,CAAC;IAAEA,CAAC,EAAE;CAAG,EAAgC,GAAG,CAAC","names":["x"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module8 = {
  id: "mwyhvf4weui7:31:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "abc"[9];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8BS,WAAK,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
const $module9 = {
  id: "mwyhvf4weui7:34:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiCqC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["objects/indexing.test.tsx"]}',
  dependencies: [],
};
// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(
      await evaluate(
        cs.create($module0, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create($module1, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      "a",
    );
    assert.equal(
      // @ts-expect-error: an object's type names its keys
      await evaluate(
        cs.create($module2, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create($module3, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create($module4, []),
      cs.create($module5, []),
      cs.create($module6, []),
      cs.create($module7, []),
      cs.create($module8, []),
    ];
    for (const value of reads) {
      assert.equal(
        await evaluate(
          cs.create($module9, [
            { kind: "splice", value: createRoot, bindings: [] },
            { kind: "splice", value: value, bindings: [] },
          ]),
        ),
        undefined,
      );
    }
  });
});
