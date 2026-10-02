import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function sandwich(fragment) {
  return cs.create(
    "1xi8jyc89buh5:16:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const before = 1;\n    const spliced = $splice0();\n    const after = 2;\n    return before + spliced + after;\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAeYA,QAAA;IACR,MAAMC,MAAM,GAAG,CAAC;IAChB,MAAMC,OAAO,GAAGF,QAAA,EAAS;IACzB,MAAMG,KAAK,GAAG,CAAC;IACf,OAAOF,MAAM,GAAGC,OAAO,GAAGC,KAAK;AACjC,CAAC","names":["$splice0","before","spliced","after"],"ignoreList":[],"sources":["splices/splice-before-declaration.test.tsx"]}',
    [],
  );
}
it("spliceBeforeDeclaration", async (t) => {
  await snapshotCase(
    t,
    "spliceBeforeDeclaration",
    cs.create(
      "1xi8jyc89buh5:28:4",
      {
        params: [
          {
            kind: "splice",
            value: sandwich(
              cs.create(
                "1xi8jyc89buh5:28:18",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 10;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBA2BqB,QAAE","names":[],"ignoreList":[],"sources":["splices/splice-before-declaration.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: sandwich(
              cs.create(
                "1xi8jyc89buh5:28:40",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 20;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBA2B2C,QAAE","names":[],"ignoreList":[],"sources":["splices/splice-before-declaration.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBA2BO,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAC,GAAqBC,QAAA,EAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-before-declaration.test.tsx"]}',
      [],
    ),
  );
});
