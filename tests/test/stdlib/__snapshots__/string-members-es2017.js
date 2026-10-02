import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The string members after ES2015 that read a string without changing
// anything: padding, trimming one end, reading by position, and replacing
// every occurrence.
it("stringMembersEs2017", async (t) => {
  await snapshotCase(
    t,
    "stringMembersEs2017",
    cs.create(
      "376ffut9l2xr3:12:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const word = "ab";\n    return {\n        padded: word.padStart(4) + "|" + word.padEnd(5, "-="),\n        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",\n        at: [word.at(0), word.at(-1), word.at(5)],\n        replaced: "a.b.c".replaceAll(".", "/"),\n        replacedBy: "a.b".replaceAll(".", (found, offset) => "" + offset)\n    };\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,MAAMA,IAAI,GAAG,IAAI;IACjB,OAAO;QACLC,MAAM,EAAED,IAAI,CAACE,QAAQ,CAAC,CAAC,CAAC,GAAG,GAAG,GAAGF,IAAI,CAACG,MAAM,CAAC,CAAC,EAAE,IAAI,CAAC;QACrDC,OAAO,EAAE,OAAO,CAACC,SAAS,EAAE,GAAG,GAAG,GAAG,OAAO,CAACC,OAAO,EAAE,GAAG,GAAG;QAC5DC,EAAE,EAAE,CAACP,IAAI,CAACO,EAAE,CAAC,CAAC,CAAC,EAAEP,IAAI,CAACO,EAAE,CAAC,CAAC,CAAC,CAAC,EAAEP,IAAI,CAACO,EAAE,CAAC,CAAC,CAAC,CAAC;QACzCC,QAAQ,EAAE,OAAO,CAACC,UAAU,CAAC,GAAG,EAAE,GAAG,CAAC;QACtCC,UAAU,EAAE,KAAK,CAACD,UAAU,CAAC,GAAG,EAAE,CAACE,KAAK,EAAEC,MAAM,KAAK,EAAE,GAAGA,MAAM;KACjE;AACH,CAAC","names":["word","padded","padStart","padEnd","trimmed","trimStart","trimEnd","at","replaced","replaceAll","replacedBy","found","offset"],"ignoreList":[],"sources":["stdlib/string-members-es2017.test.tsx"]}',
      [],
    ),
  );
});
