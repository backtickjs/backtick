import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const elementLabels = ["alpha", "beta", "gamma"];
// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes a script of its own — the list's length is
// fixed in the bundle. `largeData` is the other shape, where a script maps on
// the client and the bundle carries one template plus the data.
it("mappedElements", async (t) => {
  await snapshotCase(
    t,
    "mappedElements",
    cs.create(
      "rkwygfa87yuf:15:4",
      {
        params: [
          {
            kind: "splice",
            value: elementLabels.map((item) =>
              cs.create(
                "rkwygfa87yuf:15:43",
                { params: [{ kind: "splice", value: item, bindings: [] }] },
                "($splice0) => <span>{$splice0()}</span>",
                '{"version":3,"file":"mapped-elements.test.jsx","sourceRoot":"","sources":["jsx/mapped-elements.test.tsx"],"names":[],"mappings":"AAc8C,cAAA,CAAC,IAAI,CAAC,CAAC,UAAK,CAAC,EAAE,IAAI,CAAC"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      "($splice0) => <div>{$splice0()}</div>",
      '{"version":3,"file":"mapped-elements.test.jsx","sourceRoot":"","sources":["jsx/mapped-elements.test.tsx"],"names":[],"mappings":"AAcO,cAAA,CAAC,GAAG,CAAC,CAAC,UAAwD,CAAC,EAAE,GAAG,CAAC"}',
    ),
  );
});
