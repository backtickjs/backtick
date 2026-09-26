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
      {
        code: "export default $0 => $0();",
        map: '{"version":3,"mappings":"eAS2CA,EAAA,IAAAA,EAAA,EAAM","names":["$0"],"ignoreList":[],"sources":["splice-string.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
