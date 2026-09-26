import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    "6whsjakbge6h:9:32",
    { params: [] },
    {
      code: 'export default () => (name) => "hello " + name;',
      map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAQmC,MAAA,CAAC,IAAY,EAAE,EAAE,CAAC,QAAQ,GAAG,IAAI"}',
      imports: [],
      exportAt: 0,
    },
  ),
  {
    transform,
  },
);
const badge = await bundler.run(
  cs.create(
    "6whsjakbge6h:14:2",
    { params: [] },
    {
      code: 'export default () => (props) => <b>{"count " + props.count}</b>;',
      map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAaK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  ),
  { transform },
);
it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs.create(
      "6whsjakbge6h:22:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: badge, bindings: [] },
        ],
      },
      {
        code: 'export default ($0, $1) => <div>\n      <span>{eval($0())("ada")}</span>\n      {eval($1())({ count: 3 })}\n    </div>;',
        map: '{"version":3,"file":"eval-function.test.jsx","sourceRoot":"","sources":["eval-function.test.tsx"],"names":[],"mappings":"eAqBO,YAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,IAAM,CAAC,CAAC,KAAK,CAAC,CAAC,EAAE,IAAI,CACjC;MAAA,CAAC,IAAI,CAAC,IAAM,CAAC,CAAC,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC,CAC7B;IAAA,EAAE,GAAG,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
