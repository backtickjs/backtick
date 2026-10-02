import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here in an async test, whether the script is an
// expression or has statements.
it("awaitInSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInSplice",
    cs.create(
      "1vub2b42i0si4:14:41",
      {
        params: [
          { kind: "splice", value: await fetchGreeting(), bindings: [] },
        ],
      },
      '($splice0) => $splice0() + "!"',
      '{"version":3,"file":"await-in-splice.test.jsx","sourceRoot":"","sources":["splices/await-in-splice.test.tsx"],"names":[],"mappings":"AAa4C,cAAA,UAAC,GAA0B,GAAG"}',
    ),
  );
});
it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs.create(
      "1vub2b42i0si4:21:4",
      {
        params: [
          { kind: "splice", value: await fetchGreeting(), bindings: [] },
        ],
      },
      '($splice0) => {\n    const greeting = $splice0();\n    return greeting + "!";\n}',
      '{"version":3,"file":"await-in-splice.test.jsx","sourceRoot":"","sources":["splices/await-in-splice.test.tsx"],"names":[],"mappings":"AAoBO;IACD,MAAM,QAAQ,GAAG,UAAC,CAAwB;IAC1C,OAAO,QAAQ,GAAG,GAAG,CAAC;AACxB,CAAC"}',
    ),
  );
});
// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response = cs.create(
    "1vub2b42i0si4:32:46",
    { params: [] },
    '() => fetch("/rows")',
    '{"version":3,"file":"await-in-splice.test.jsx","sourceRoot":"","sources":["splices/await-in-splice.test.tsx"],"names":[],"mappings":"AA+BiD,MAAA,KAAK,CAAC,OAAO,CAAC"}',
  );
  return response;
}
