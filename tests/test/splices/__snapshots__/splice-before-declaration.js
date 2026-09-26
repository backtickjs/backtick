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
      code: "export default $0 => {\n  const before = 1;\n  const spliced = $0();\n  const after = 2;\n  return before + spliced + after;\n};",
      map: '{"version":3,"mappings":"eAeYA,EAAA;EACR,MAAMC,MAAM,GAAG,CAAC;EAChB,MAAMC,OAAO,GAAGF,EAAA,EAAS;EACzB,MAAMG,KAAK,GAAG,CAAC;EACf,OAAOF,MAAM,GAAGC,OAAO,GAAGC,KAAK;AACjC,CAAC","names":["$0","before","spliced","after"],"ignoreList":[],"sources":["splice-before-declaration.test.tsx"]}',
      imports: [],
      exportAt: 0,
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
                  map: '{"version":3,"mappings":"eA2BqB,QAAE","names":[],"ignoreList":[],"sources":["splice-before-declaration.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
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
                  map: '{"version":3,"mappings":"eA2B2C,QAAE","names":[],"ignoreList":[],"sources":["splice-before-declaration.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => $0() + $1();",
        map: '{"version":3,"mappings":"eA2BO,CAAAA,EAAA,EAAAC,EAAA,KAAAD,EAAA,EAAC,GAAqBC,EAAA,EAAC","names":["$0","$1"],"ignoreList":[],"sources":["splice-before-declaration.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
