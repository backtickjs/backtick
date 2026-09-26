import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A container the host built holding scripts, spliced whole.
//
// Each member crosses as what its script produced, so a script reads
// `{ x: number, label: string }` where the host wrote `{ x: Client<number>,
// label: Client<string> }`. Reading `x` off it has to typecheck as a number,
// which is what pins the direction `cs.splice` maps in: forward, from what the
// host wrote. Read the other way — from the client's type back to what the host
// may write — this shape is the one TypeScript cannot infer, and a splice has
// nowhere to name it, since the compiler writes the call.
const originX = cs.create(
  "3hhvicr225pmx:14:16",
  { params: [] },
  {
    code: "export default () => 1;",
    map: '{"version":3,"file":"spliced-container.test.jsx","sourceRoot":"","sources":["spliced-container.test.tsx"],"names":[],"mappings":"eAamB,MAAA,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
const label = cs.create(
  "3hhvicr225pmx:16:14",
  { params: [] },
  {
    code: 'export default () => "origin";',
    map: '{"version":3,"file":"spliced-container.test.jsx","sourceRoot":"","sources":["spliced-container.test.tsx"],"names":[],"mappings":"eAeiB,MAAA,QAAQ"}',
    imports: [],
    exportAt: 0,
  },
);
const point = { x: originX, label };
it("splicedContainer", async (t) => {
  await snapshotCase(
    t,
    "splicedContainer",
    cs.create(
      "3hhvicr225pmx:21:44",
      { params: [{ kind: "splice", value: point, bindings: [] }] },
      {
        code: "export default ($0) => $0().x + 1;",
        map: '{"version":3,"file":"spliced-container.test.jsx","sourceRoot":"","sources":["spliced-container.test.tsx"],"names":[],"mappings":"eAoB+C,QAAA,IAAM,CAAC,CAAC,GAAG,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
