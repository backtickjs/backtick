import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key computed while the script runs. A literal that holds one is
// `Object.fromEntries` over its pairs, as one a spread runs through is: its
// key has no text to ship as data. Keys are evaluated in order, and a later
// one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.create(
      "27b2r7injyzq0:13:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const base = {\n        a: 1,\n        b: 2\n    };\n    const name = "b";\n    return {\n        ...base,\n        [name]: 9,\n        ["c" + "d"]: 3,\n        a: 4\n    };\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAYO;IACD,MAAMA,IAAI,GAAG;QAAEC,CAAC,EAAE,CAAC;QAAEC,CAAC,EAAE;KAAG;IAC3B,MAAMC,IAAI,GAAG,GAAG;IAChB,OAAO;QACL,GAAGH,IAAI;QACP,CAACG,IAAI,GAAG,CAAC;QACT,CAAC,GAAG,GAAG,GAAG,GAAG,CAAC;QACdF,CAAC,EAAE;KACJ;AACH,CAAC","names":["base","a","b","name"],"ignoreList":[],"sources":["objects/computed-key.test.tsx"]}',
      [],
    ),
  );
});
