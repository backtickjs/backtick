import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
it("spliceString", async (t) => {
  await snapshotCase(
    t,
    "spliceString",
    cs.create(
      "6r4m74y7k80e:10:40",
      { params: [{ kind: "splice", value: value, bindings: [] }] },
      "($0) => $0()",
      '{"version":3,"file":"splice-string.test.jsx","sourceRoot":"","sources":["splices/splice-string.test.tsx"],"names":[],"mappings":"AAS2C,QAAA,IAAM"}',
    ),
  );
});
