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
    {
      code: "export default ($0) => {\n    const before = 1;\n    const spliced = $0();\n    const after = 2;\n    return before + spliced + after;\n};",
      map: '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splices/splice-before-declaration.test.tsx"],"names":[],"mappings":"eAeY;IACR,MAAM,MAAM,GAAG,CAAC,CAAC;IACjB,MAAM,OAAO,GAAG,IAAS,CAAC;IAC1B,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,OAAO,MAAM,GAAG,OAAO,GAAG,KAAK,CAAC;AAClC,CAAC"}',
    },
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
                {
                  code: "export default () => 10;",
                  map: '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splices/splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2BqB,MAAA,EAAE"}',
                },
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
                {
                  code: "export default () => 20;",
                  map: '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splices/splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2B2C,MAAA,EAAE"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splices/splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2BO,YAAA,IAAC,GAAqB,IAAC"}',
      },
    ),
  );
});
